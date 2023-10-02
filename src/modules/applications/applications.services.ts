import { db } from '../../db';
import { applications } from '../../db/schema';

type TNewApplication = typeof applications.$inferInsert;

export async function createApplication(data: TNewApplication) {
  const result = await db.insert(applications).values(data).returning();

  return result[0];
}

export async function getApplications() {
  return db
    .select({
      id: applications.id,
      name: applications.name,
      createdAt: applications.createdAt,
    })
    .from(applications);
}
