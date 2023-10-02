import type { FastifyInstance } from 'fastify';

import { createUserHandler, loginHandler } from './users.controllers';
import { createUsersJSONSchema, loginJSONSchema } from './users.schemas';

export async function usersRoutes(app: FastifyInstance) {
  app.post(
    '/',
    {
      schema: createUsersJSONSchema,
    },
    createUserHandler
  );

  app.post(
    '/login',
    {
      schema: loginJSONSchema,
    },
    loginHandler
  );
}
