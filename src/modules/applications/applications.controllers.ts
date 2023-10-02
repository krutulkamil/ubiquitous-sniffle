import type { FastifyReply, FastifyRequest } from 'fastify';

import type { TCreateApplicationBodySchema } from './applications.schemas';
import { createApplication } from './applications.services';

export async function createApplicationHandler(
  req: FastifyRequest<{ Body: TCreateApplicationBodySchema }>,
  _: FastifyReply
) {
  const { name } = req.body;

  const application = await createApplication({ name });
  return { application };
}
