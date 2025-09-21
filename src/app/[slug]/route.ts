import { redirect } from "next/navigation"

// hardcoded list of redirects
// todo: maybe use a database to dynamically find the routes
const redirects = {
  instagram: "https://instagram.com/sliitmozilla",
  facebook: "https://facebook.com/sliitmozilla",
  linkedin: "https://linkedin.com/company/sliitmozilla",
  github: "https://github.com/Mozilla-Campus-Club-of-SLIIT",
  youtube: "https://youtube.com/@sliitmozilla",
  medium: "https://medium.com/@infosliitmcc",
  twitter: "https://x.com/mozillasliit",
  tiktok:"https://www.tiktok.com/@sliitmozilla",
  discord:"https://discord.gg/EqEUDnmkDZ",
  threads:"https://www.threads.com/@sliitmozilla",
  web: "https://www.sliitmozilla.org",
  join: "https://forms.gle/1eNYuiNqd7CwbGEw6"
} as Record<string, string>

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  if (!Object.hasOwn(redirects, slug)) return new Response("Redirect not found", { status: 404 })
  const _redirect = redirects[slug]
  return redirect(_redirect)
}