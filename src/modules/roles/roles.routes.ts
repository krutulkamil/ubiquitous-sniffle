import type { FastifyInstance } from 'fastify';

import { createRoleHandler } from './routes.controllers';
import type { TCreateRoleBody } from './routes.schemas';
import { createRoleJSONSchema } from './routes.schemas';
import { PERMISSIONS } from '../../config/permissions';

export async function rolesRoutes(app: FastifyInstance) {
  app.post<{ Body: TCreateRoleBody }>(
    '/',
    {
      schema: createRoleJSONSchema,
      preHandler: [app.guard.scope(PERMISSIONS['roles:write'])],
    },
    createRoleHandler
  );
}
