"use server"

import { Session } from "next-auth"
import connectDB from "../../db/connectDB"
import Link from "../../db/Link"
import LinkHandler from "../../db/LinkHandler"
import { redirect } from "next/navigation"

export const createLink = async (data: Session, formData: FormData) => {
  const name = formData.get("name")?.toString()
  const _redirect = formData.get("redirect")?.toString()
  const description = formData.get("description")?.toString()

  const dbConn = await connectDB()
  const handler = new LinkHandler(dbConn, data)

  if (!name || !_redirect) throw new Error("name and redirect cannot be empty")

  await handler.createLink(name, _redirect, description)
  dbConn.release()
  redirect("/")
}

export const getLinks = async (): Promise<Link[]> => {
  const dbConn = await connectDB()
  const handler = new LinkHandler(dbConn)
  const links = await handler.getLinks()
  dbConn.release()
  return links
}

export const updateLink = async (formData: FormData) => {}

export const deleteLink = async (name: string) => {
  const dbConn = await connectDB()
  const handler = new LinkHandler(dbConn)
  await handler.deleteLink(name)
  dbConn.release()
}
