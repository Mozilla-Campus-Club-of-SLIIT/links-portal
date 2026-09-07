import { NextResponse } from "next/server"

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  if (!slug) {
    return NextResponse.json({ error: "Slug not found" }, { status: 404 })
  }

  return NextResponse.json({
    message: "Dynamic link route scaffolded successfully",
    slug,
  })
}
