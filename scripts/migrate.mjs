import { readFile } from "node:fs/promises";
import pg from "pg";

const schema = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");
const client = new pg.Client({ connectionString: process.env.DATABASE_URL });

await client.connect();
try {
  await client.query(schema);
  console.log("Database schema is up to date.");
} finally {
  await client.end();
}
