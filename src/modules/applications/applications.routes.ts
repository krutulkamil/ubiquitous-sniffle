import type { FastifyInstance } from 'fastify';

import { createApplicationHandler } from './applications.controllers';
import { createApplicationJSONSchema } from './applications.schemas';
import { getApplications } from './applications.services';

export async function applicationRoutes(app: FastifyInstance) {
  app.post(
    '/',
    {
      schema: createApplicationJSONSchema,
    },
    createApplicationHandler
  );

  app.get('/', getApplications);
}
