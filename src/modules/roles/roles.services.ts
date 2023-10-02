import { db } from '../../db';
import { roles } from '../../db/schema';

type TNewRole = typeof roles.$inferInsert;

export async function createRole(data: TNewRole) {
  const result = await db.insert(roles).values(data).returning();

  return result[0];
}
