import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const createUsersBodySchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Not a valid email address'),
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(2, 'Name too short - should be 2 chars minimum')
    .max(24, 'Name too long - should be 24 chars maximum'),
  applicationId: z.string().uuid(),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password too short - should be 6 chars minimum')
    .max(24, 'Password too long - should be 24 chars maximum'),
  initialUser: z.boolean().optional(),
});

export type TCreateUsersBody = z.TypeOf<typeof createUsersBodySchema>;

export const createUsersJSONSchema = {
  body: zodToJsonSchema(createUsersBodySchema, 'createUsersBodySchema'),
};

const loginBodySchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Not a valid email address'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password too short - should be 6 chars minimum')
    .max(24, 'Password too long - should be 24 chars maximum'),
  applicationId: z.string({
    required_error: 'Application ID is required',
  }),
});

export type TLoginBody = z.TypeOf<typeof loginBodySchema>;

export const loginJSONSchema = {
  body: zodToJsonSchema(loginBodySchema, 'loginBodySchema'),
};

export const assignRoleToUserBodySchema = z.object({
  userId: z.string().uuid(),
  roleId: z.string().uuid(),
  // applicationId: z.string().uuid(),
});

export type TAssignRoleToUserBody = z.TypeOf<typeof assignRoleToUserBodySchema>;

export const assignRoleToUserJSONSchema = {
  body: zodToJsonSchema(
    assignRoleToUserBodySchema,
    'assignRoleToUserBodySchema'
  ),
};
