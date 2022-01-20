import { RequestHandler, ErrorRequestHandler } from 'express';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled
} from 'apollo-server-core';
import { MemcachedCache } from 'apollo-server-cache-memcached';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { stitchSchemas } from '@graphql-tools/stitch';

import app from './app';
import context from './context';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

const startApolloServer = async () => {
  process.setMaxListeners(0);
  const port = process.env.PORT;

  const server = new ApolloServer({
    schema: stitchSchemas({
      subschemas: [
        {
          schema: makeExecutableSchema({
            typeDefs,
            resolvers,
          })
        },
      ],
    }),
    context,
    persistedQueries: {
      cache: new MemcachedCache(
        [
          'memcached-1.local',
          'memcached-2.local',
          'memcached-3.local'
        ],
        { retries: 10, retry: 10000 }
      ),
    },
    introspection: true,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        // options: https://www.apollographql.com/docs/apollo-server/api/plugin/landing-pages/#graphql-playground-landing-page
      }),
      ApolloServerPluginLandingPageDisabled()
    ]
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: '/graphql',
  });

  const notFoundHandler: RequestHandler = (req, res, next) => {
    const err = new Error(`${req.originalUrl} not found`);
    res.status(404);
    next(err);
  };

  app.use(notFoundHandler);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const errorHandler: ErrorRequestHandler = (err, req, res, next) => res.status(400).send(err);
  app.use(errorHandler);

  const appServer = app.listen(port, () => {
    Promise.resolve().then(() => console.info(`🚀 Server ready at ${port}`));
  });

  appServer.keepAliveTimeout = 65000;
  appServer.headersTimeout = appServer.keepAliveTimeout + 5000;
};

startApolloServer();
