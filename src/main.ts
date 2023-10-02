import { buildServer } from './utils/server';
import { env } from './config/env';

type TAppType = Awaited<ReturnType<typeof buildServer>>;

async function gracefulShutdown({ app }: { app: TAppType }) {
  await app.close();
}

async function main() {
  const app = await buildServer();

  await app.listen({
    port: env.PORT,
    host: env.HOST,
  });

  const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT'] as const;
  for (const signal of signals) {
    process.on(signal, () => {
      gracefulShutdown({ app });
    });
  }
}

main();
