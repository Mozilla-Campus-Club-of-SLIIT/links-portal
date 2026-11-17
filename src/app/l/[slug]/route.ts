import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Always look the slug up at request time; never cache a redirect decision.
export const dynamic = "force-dynamic"

const SLUG_PATTERN = /^[A-Za-z0-9_-]+$/

type LinkRow = {
  original_url: string
  is_active: boolean
  expires_at: string | null
}

function notice(status: number, title: string, message: string) {
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title} | Links Portal</title>
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: system-ui, sans-serif; background: #f5f5f5; color: #111; }
  main { text-align: center; padding: 2rem; }
  h1 { font-size: 2rem; margin: 0 0 .5rem; }
  p { color: #555; margin: 0 0 1.5rem; }
  a { color: #0060df; }
</style>
</head>
<body>
<main>
  <h1>${title}</h1>
  <p>${message}</p>
  <a href="/">Go to homepage</a>
</main>
</body>
</html>`
  return new NextResponse(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  })
}

const notFound = () => notice(404, "Link not found", "This short link doesn't exist.")

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  if (!slug || !SLUG_PATTERN.test(slug)) return notFound()

  // Public lookup: no user session needed, so a plain anon client is enough.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  )

  const { data: link, error } = await supabase
    .from("links")
    .select("original_url, is_active, expires_at")
    .eq("short_code", slug)
    .maybeSingle<LinkRow>()

  if (error) {
    console.error("Shortlink lookup failed", { slug, error: error.message })
    return notice(
      500,
      "Something went wrong",
      "We couldn't look up this link. Please try again later.",
    )
  }

  if (!link) return notFound()

  if (link.is_active === false) {
    return notice(410, "Link inactive", "This short link has been deactivated.")
  }

  if (link.expires_at && new Date(link.expires_at).getTime() <= Date.now()) {
    return notice(410, "Link expired", "This short link has expired.")
  }

  let destination: URL
  try {
    destination = new URL(link.original_url)
  } catch {
    destination = new URL("invalid:")
  }
  if (destination.protocol !== "http:" && destination.protocol !== "https:") {
    console.error("Shortlink has invalid destination", { slug })
    return notice(500, "Invalid link", "This short link points to an invalid destination.")
  }

  // 302 (not 301) so browsers don't cache the hop — destinations and status can change.
  const response = NextResponse.redirect(destination, 302)
  response.headers.set("Cache-Control", "no-store")
  return response
}
