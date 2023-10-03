import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

import { ALL_PERMISSIONS } from '../../config/permissions';

const createRoleBodySchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  permissions: z.array(z.enum(ALL_PERMISSIONS), {
    required_error: 'Permissions are required',
  }),
  applicationId: z
    .string({
      required_error: 'Application ID is required',
    })
    .uuid(),
});

export type TCreateRoleBody = z.TypeOf<typeof createRoleBodySchema>;

export const createRoleJSONSchema = {
  body: zodToJsonSchema(createRoleBodySchema, 'createRoleBodySchema'),
};
