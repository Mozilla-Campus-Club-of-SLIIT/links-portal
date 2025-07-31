import { redirect } from "next/navigation"
import { getLinkRedirect } from "../actions"

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const _redirect = await getLinkRedirect((await params).slug)
  if (!_redirect) return new Response("Redirect not found", { status: 404 })
  return redirect(_redirect)
}
