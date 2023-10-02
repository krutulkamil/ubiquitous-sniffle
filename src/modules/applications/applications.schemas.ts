import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

const createApplicationBodySchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
});

export type TCreateApplicationBodySchema = z.TypeOf<
  typeof createApplicationBodySchema
>;

export const createApplicationJSONSchema = {
  body: zodToJsonSchema(
    createApplicationBodySchema,
    'createApplicationBodySchema'
  ),
};
