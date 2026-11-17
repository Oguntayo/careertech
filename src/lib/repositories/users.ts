import { query } from "@/lib/db";

type User = { id: string; email: string };

export async function findUserByEmail(email: string) {
  const [user] = await query<User & { passwordHash: string }>(
    `select id, email, password_hash as "passwordHash" from users where email = $1`,
    [email],
  );
  return user ?? null;
}

export async function createUser(email: string, passwordHash: string): Promise<User> {
  const [user] = await query<User>(
    `insert into users (email, password_hash) values ($1, $2) returning id, email`,
    [email, passwordHash],
  );
  return user;
}
