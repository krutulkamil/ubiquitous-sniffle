import type { FastifyInstance } from 'fastify';

import {
  createUserHandler,
  loginHandler,
  assignRoleToUserHandler,
} from './users.controllers';
import {
  createUsersJSONSchema,
  loginJSONSchema,
  assignRoleToUserJSONSchema,
} from './users.schemas';
import { PERMISSIONS } from '../../config/permissions';
import type { TAssignRoleToUserBody } from './users.schemas';

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

  app.post<{ Body: TAssignRoleToUserBody }>(
    '/roles',
    {
      schema: assignRoleToUserJSONSchema,
      preHandler: [app.guard.scope(PERMISSIONS['users:roles:write'])],
    },
    assignRoleToUserHandler
  );
}
