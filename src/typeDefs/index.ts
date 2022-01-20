import 'graphql-import-node';
import { mergeTypeDefs } from '@graphql-tools/merge';

import * as common from './common.graphql';

import * as familyFileUsers from './ff-users.graphql';
import * as yglUsers from './ygl-users.graphql';

const typeDefs = mergeTypeDefs([
  common,
  familyFileUsers,
  yglUsers,
]);

export default typeDefs;
