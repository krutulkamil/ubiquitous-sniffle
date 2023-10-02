import type { FastifyInstance } from 'fastify';

import { createUserHandler } from './users.controllers';
import { createUsersJSONSchema } from './users.schemas';

export async function usersRoutes(app: FastifyInstance) {
  app.post(
    '/',
    {
      schema: createUsersJSONSchema,
    },
    createUserHandler
  );
}
