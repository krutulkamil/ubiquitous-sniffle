import fastify from 'fastify';
import guard from 'fastify-guard';
import jwt from 'jsonwebtoken';

import { applicationsRoutes } from '../modules/applications/applications.routes';
import { usersRoutes } from '../modules/users/users.routes';
import { rolesRoutes } from '../modules/roles/roles.routes';
import { env } from '../config/env';
import { logger } from './logger';

type TRequestUser = {
  id: string;
  scopes: Array<string>;
};

declare module 'fastify' {
  interface FastifyRequest {
    user: TRequestUser;
  }
}

export async function buildServer() {
  const app = fastify({
    logger,
  });

  app.decorateRequest('user', null);

  app.addHook('onRequest', async (request, _) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) return;

    try {
      const token = authHeader.replace('Bearer ', '');

      request.user = jwt.verify(
        token,
        env.ACCESS_TOKEN_PUBLIC_KEY
      ) as TRequestUser;
    } catch (error) {}
  });

  // REGISTER PLUGINS
  app.register(guard, {
    requestProperty: 'user',
    scopeProperty: 'scopes',
    errorHandler: (error, request, reply) => {
      return reply
        .status(400)
        .send({ message: 'You are not allowed to do that.' });
    },
  });

  // ROUTES
  app.register(applicationsRoutes, { prefix: '/api/applications' });
  app.register(usersRoutes, { prefix: '/api/users' });
  app.register(rolesRoutes, { prefix: '/api/roles' });

  return app;
}
