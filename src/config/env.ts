import zennv from 'zennv';
import { z } from 'zod';

export const env = zennv({
  dotenv: true,
  schema: z.object({
    PORT: z.number().default(3000),
    HOST: z.string().default('0.0.0.0'),
    DATABASE_CONNECTION: z.string(),
    ACCESS_TOKEN_PRIVATE_KEY: z.string(),
    ACCESS_TOKEN_PUBLIC_KEY: z.string(),
    REFRESH_TOKEN_PRIVATE_KEY: z.string(),
    REFRESH_TOKEN_PUBLIC_KEY: z.string(),
  }),
});
