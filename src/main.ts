import { buildServer } from './utils/server';

async function main() {
  const app = await buildServer();

  await app.listen({
    port: 3000,
  });
}

main();
