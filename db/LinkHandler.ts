import { type PoolClient } from "pg"

import type Link from "./Link"
import { Session } from "next-auth"

class LinkHandler {
  private client: PoolClient
  private session?: Session

  constructor(client: PoolClient, session?: Session) {
    this.client = client
    this.session = session
  }

  async createLink(name: string, redirect: string, description?: string): Promise<void> {
    if (!this.session) throw new Error("Session not found")
    await this.client.query(
      'INSERT INTO "Link" ("name", "redirect", "description", "createdBy") VALUES ($1, $2, $3, $4)',
      [name, redirect, description, this.session.user?.username],
    )
  }

  async getLinks(): Promise<Link[]> {
    let res = await this.client.query('SELECT * FROM  "Link"')
    return res.rows as Link[]
  }

  async getRedirect(name: string): Promise<string | null> {
    const res = await this.client.query('SELECT redirect FROM "Link" WHERE name = $1', [name])
    if (res.rowCount == 0) return null
    const _redirect = res.rows[0].redirect
    if (!_redirect) return null
    // check for protocol to avoid infinite redirects
    if (!/^\w+:\/\/.+/.test(_redirect)) return null
    return _redirect
  }

  async updateLink(name: string, redirect: string, description?: string): Promise<void> {
    await this.client.query(
      'UPDATE "Link" SET name = $1, redirect = $2, description = $3 WHERE name = $1',
      [name, redirect, description],
    )
  }

  async deleteLink(name: string): Promise<void> {
    console.log(name)
    await this.client.query('DELETE FROM "Link" WHERE "name" = $1', [name])
  }
}

export default LinkHandler
