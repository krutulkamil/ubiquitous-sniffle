import type { FastifyReply, FastifyRequest } from 'fastify';

import { createRole } from './roles.services';
import type { TCreateRoleBody } from './routes.schemas';

export async function createRoleHandler(
  request: FastifyRequest<{ Body: TCreateRoleBody }>,
  _: FastifyReply
) {
  const { name, applicationId, permissions } = request.body;

  return await createRole({
    name,
    permissions,
    applicationId,
  });
}
