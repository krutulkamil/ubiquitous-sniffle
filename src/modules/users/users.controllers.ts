import type { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

import {
  assignRoleToUser,
  createUser,
  getUserByEmail,
  getUsersByApplication,
} from './users.services';
import { getRoleByName } from '../roles/roles.services';
import { logger } from '../../utils/logger';
import { SYSTEM_ROLES } from '../../config/permissions';
import type { TCreateUsersBody } from './users.schemas';
import type { TLoginBody } from './users.schemas';

export async function createUserHandler(
  request: FastifyRequest<{ Body: TCreateUsersBody }>,
  reply: FastifyReply
) {
  const { initialUser, ...data } = request.body;

  const roleName = initialUser
    ? SYSTEM_ROLES.SUPER_ADMIN
    : SYSTEM_ROLES.APPLICATION_USER;

  if (roleName === SYSTEM_ROLES.SUPER_ADMIN) {
    const appUsers = await getUsersByApplication(data.applicationId);

    if (appUsers.length) {
      return reply.code(400).send({
        message: 'Application already has admin user',
        extensions: {
          code: 'APPLICATION_ALREADY_SUPER_USER',
          applicationId: data.applicationId,
        },
      });
    }
  }

  const role = await getRoleByName({
    name: roleName,
    applicationId: data.applicationId,
  });

  if (!role) {
    return reply.code(404).send({
      message: 'Role does not exist',
      extensions: {
        code: 'ROLE_DOES_NOT_EXIST',
        roleName,
      },
    });
  }

  try {
    const user = await createUser(data);

    await assignRoleToUser({
      userId: user.id,
      roleId: role.id,
      applicationId: data.applicationId,
    });

    return user;
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`[Controller] CreateUserHandler Error: ${error.message}`);
      throw new Error(error.message);
    }

    logger.error(`[Controller] CreateUserHandler Error: ${error}`);
    reply.status(500).send({ error: 'Could not create an user' });
  }
}

export async function loginHandler(
  request: FastifyRequest<{ Body: TLoginBody }>,
  reply: FastifyReply
) {
  const { applicationId, email } = request.body;

  const user = await getUserByEmail({ email, applicationId });
  if (!user) {
    return reply.code(400).send({
      message: 'Invalid email or password',
    });
  }

  // TODO: CHANGE THIS SECRET
  const token = jwt.sign(
    {
      id: user.id,
      email,
      applicationId,
      scopes: user.password,
    },
    'secret'
  );

  return { token };
}
