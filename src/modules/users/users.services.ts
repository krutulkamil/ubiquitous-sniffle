import argon2 from 'argon2';
import { eq } from 'drizzle-orm';

import { db } from '../../db';
import { users, usersToRoles } from '../../db/schema';

type TNewUser = typeof users.$inferInsert;
type TNewUserToRole = typeof usersToRoles.$inferInsert;

export async function createUser(data: TNewUser) {
  const hashedPassword = await argon2.hash(data.password);

  const result = await db
    .insert(users)
    .values({
      ...data,
      password: hashedPassword,
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      applicationId: users.applicationId,
    });

  return result[0];
}

export async function getUsersByApplication(applicationId: string) {
  return db.select().from(users).where(eq(users.applicationId, applicationId));
}

export async function assignRoleToUser(data: TNewUserToRole) {
  const result = await db.insert(usersToRoles).values(data).returning();

  return result[0];
}
