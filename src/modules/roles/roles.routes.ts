import type { FastifyInstance } from 'fastify';

import { createRoleHandler } from './routes.controllers';
import { createRoleJSONSchema } from './routes.schemas';

export async function rolesRoutes(app: FastifyInstance) {
  app.post(
    '/',
    {
      schema: createRoleJSONSchema,
    },
    createRoleHandler
  );
}
