import pg, { type PoolClient } from "pg"
import "dotenv/config"

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

export default async (): Promise<PoolClient> => {
  return await pool.connect()
}
