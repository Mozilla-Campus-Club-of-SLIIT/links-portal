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

  async updateLink(): Promise<void> {}

  async deleteLink(name: string): Promise<void> {
    console.log(name)
    await this.client.query('DELETE FROM "Link" WHERE "name" = $1', [name])
  }
}

export default LinkHandler
