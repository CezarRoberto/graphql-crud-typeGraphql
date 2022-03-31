import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloWorldResolver } from "./resolver/helloWord";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { DataSource } from "typeorm";
import { MovieResolver } from "./resolver/MovieResolver";

(async () => {
  const app = express();
  DataSource
  const apolloServer = new ApolloServer({
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    schema: await buildSchema({
      resolvers: [MovieResolver, HelloWorldResolver]
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });
  app.listen(4000, () => {
    console.log("express server started");
  });
})();
