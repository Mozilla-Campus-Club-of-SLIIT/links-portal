import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { createServerClient } from "@supabase/ssr"

type AccountsUser = {
  email: string
  roles: string[]
}

const ACCOUNTS_API_URL = process.env.ACCOUNTS_API_URL ?? "https://accounts.sliitmozilla.org"

async function exchangeCodeForUser(code: string): Promise<AccountsUser | null> {
  try {
    const tokenRes = await fetch(`${ACCOUNTS_API_URL}/api/token?code=${encodeURIComponent(code)}`, {
      method: "POST",
      cache: "no-store",
    })
    if (!tokenRes.ok) return null

    const token: string | undefined = (await tokenRes.json())?.data?.token
    if (!token) return null

    
    const userRes = await fetch(`${ACCOUNTS_API_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
    if (!userRes.ok) return null

    const user = (await userRes.json())?.data
    if (!user?.email) return null

    return { email: user.email, roles: user.roles ?? [] }
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const fail = (reason: string) => NextResponse.redirect(`${origin}/?auth_error=${reason}`)

  const code = searchParams.get("code")
  if (!code) return fail("missing_code")

  const user = await exchangeCodeForUser(code)
  if (!user?.email) return fail("exchange_failed")

  if (!user.roles.includes("admin")) return fail("forbidden")

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  )

  const { data: link, error: linkError } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email: user.email,
  })
  if (linkError || !link?.properties?.hashed_token) {
    return fail("session_failed")
  }

  const response = NextResponse.redirect(`${origin}/admin/dashboard`)

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) =>
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          ),
      },
    },
  )

  const { error: verifyError } = await supabase.auth.verifyOtp({
    type: "email",
    token_hash: link.properties.hashed_token,
  })
  if (verifyError) return fail("verify_failed")

  return response
}
