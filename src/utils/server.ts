import fastify from 'fastify';

import { logger } from './logger';
import { applicationsRoutes } from '../modules/applications/applications.routes';
import { usersRoutes } from '../modules/users/users.routes';
import { rolesRoutes } from '../modules/roles/roles.routes';

export async function buildServer() {
  const app = fastify({
    logger,
  });

  // ROUTES
  app.register(applicationsRoutes, { prefix: '/api/applications' });
  app.register(usersRoutes, { prefix: '/api/users' });
  app.register(rolesRoutes, { prefix: '/api/roles' });

  return app;
}
