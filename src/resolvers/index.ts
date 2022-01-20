import { mergeResolvers } from '@graphql-tools/merge';

import FamilyFileUser from './familyfile/familyfile-user';

import YglUser from './ygl/ygl-user';

const resolversArray = [
  FamilyFileUser,
  YglUser
];

export default mergeResolvers(resolversArray);
