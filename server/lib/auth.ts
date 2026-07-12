import crypto from 'crypto'
import { db } from './db'
import { users, sessions } from './db/schema'
import { eq } from 'drizzle-orm'

export async function hashPassword(password: string): Promise<string> {
  return crypto
    .pbkdf2Sync(password, 'salt', 1000, 64, 'sha512')
    .toString('hex')
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const hashedPassword = await hashPassword(password)
  return hashedPassword === hash
}

export async function createUser(
  email: string,
  password: string,
  name: string
) {
  const id = crypto.randomUUID()
  const hashedPassword = await hashPassword(password)

  const result = await db
    .insert(users)
    .values({
      id,
      email,
      password: hashedPassword,
      name,
    })
    .returning()

  return result[0]
}

export async function getUserByEmail(email: string) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email))

  return result[0]
}

export async function getUserById(id: string) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, id))

  return result[0]
}

export async function createSession(userId: string) {
  const id = crypto.randomUUID()
  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  const result = await db
    .insert(sessions)
    .values({
      id,
      userId,
      token,
      expiresAt,
    })
    .returning()

  return result[0]
}

export async function getSessionByToken(token: string) {
  const result = await db
    .select()
    .from(sessions)
    .where(eq(sessions.token, token))

  return result[0]
}

export async function deleteSession(id: string) {
  await db.delete(sessions).where(eq(sessions.id, id))
}
