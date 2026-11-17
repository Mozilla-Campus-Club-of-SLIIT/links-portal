import { createBrowserClient } from "@supabase/ssr"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase env vars: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local",
  )
}

/**
 * Browser Supabase client for client components.
 * Uses @supabase/ssr so it reads the session cookies set by /api/auth/callback.
 */
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
