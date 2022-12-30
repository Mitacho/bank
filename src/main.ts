import "reflect-metadata";

import { ApolloServer, BaseContext } from "@apollo/server";
import fastifyApollo, {
  fastifyApolloDrainPlugin,
} from "@as-integrations/fastify";
import Fastify from "fastify";
import { buildSchema } from "type-graphql";
import { resolvers } from "./infra/http/resolvers";

const PORT = 4000;
const HOST = "0.0.0.0";

async function main() {
  const fastify = Fastify({
    logger: true,
    trustProxy: true,
    bodyLimit: 5 * 1024 * 1024, // 5 MB
  });
  const apollo = new ApolloServer<BaseContext>({
    schema: await buildSchema({
      resolvers,
      validate: false,
    }),
    csrfPrevention: true,
    cache: "bounded",
    plugins: [fastifyApolloDrainPlugin(fastify)],
  });

  await apollo.start();
  await fastify.register(fastifyApollo(apollo));
  await fastify.listen({
    port: PORT,
    host: HOST,
  });

  console.log(`🚀 Server ready at http://${HOST}:${PORT}/graphql`);
}

main();
