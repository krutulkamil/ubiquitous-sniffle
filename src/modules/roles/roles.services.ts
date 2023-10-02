import { and, eq } from 'drizzle-orm';

import { db } from '../../db';
import { roles } from '../../db/schema';

type TNewRole = typeof roles.$inferInsert;

export async function createRole(data: TNewRole) {
  const result = await db.insert(roles).values(data).returning();

  return result[0];
}

interface IGetRoleByName {
  name: string;
  applicationId: string;
}

export async function getRoleByName({ name, applicationId }: IGetRoleByName) {
  const result = await db
    .select()
    .from(roles)
    .where(and(eq(roles.name, name), eq(roles.applicationId, applicationId)))
    .limit(1);

  return result[0];
}
