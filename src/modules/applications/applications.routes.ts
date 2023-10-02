import type { FastifyInstance } from 'fastify';

import {
  createApplicationHandler,
  getApplicationsHandler,
} from './applications.controllers';
import { createApplicationJSONSchema } from './applications.schemas';

export async function applicationRoutes(app: FastifyInstance) {
  app.post(
    '/',
    {
      schema: createApplicationJSONSchema,
    },
    createApplicationHandler
  );

  app.get('/', getApplicationsHandler);
}
