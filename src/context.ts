import { Request } from 'express';
// import PrismaClient from './datasources/prisma-client';
import KnexClient from './datasources/knex-client';

export interface Context {
  // prisma: PrismaClient;
  yglDb: ReturnType<typeof KnexClient>;
  ffDb: ReturnType<typeof KnexClient>;
  loggedInUserId: number;
}

interface contextProps {
  req: Request
}

const context = async (props: contextProps) => {
  const { req } = props;
  const loggedInUserId = req.headers['x-user-logged-id'];
  const ffDbClient = KnexClient('FAMILY_FILE');
  const yglDbClient = KnexClient('YGL_LIVE');
  return {
    // prisma,
    ffDb: ffDbClient,
    yglDb: yglDbClient,
    loggedInUserId,
  };
};

export default context;
