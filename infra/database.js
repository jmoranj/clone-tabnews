import { Client } from "pg";

async function query(queryObject){
  const client = new Client({
    host: process.env.POSTGRES_HOST ?? "localhost",
    port: process.env.POSTGRES_PORT ?? 5432,
    user: process.env.POSTGRES_USER ?? "postgres",
    database: process.env.POSTGRES_DB ?? "postgres",
    password: process.env.POSTGRES_PASSWORD ?? "local_pass"
  })
  await client.connect()
  const result = await client.query(queryObject)
  await client.end()
  return result
}

export default {
  query: query
}

