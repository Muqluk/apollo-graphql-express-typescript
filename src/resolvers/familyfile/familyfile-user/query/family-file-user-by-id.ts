import {
  QueryFamilyFileUserByIdArgs,
  FamilyFileUser,
} from 'src/@types/types';
import { Context } from 'src/context';

import selectFfUserCols from '../../query-parts/select/select-ff-user-all-columns';

const familyfileUserById = async (
  parent: FamilyFileUser,
  args: QueryFamilyFileUserByIdArgs,
  context: Context,
): Promise<FamilyFileUser> => {
  const { ffDb } = context;
  const { userId } = args;

  const res: FamilyFileUser = await ffDb({ u: 'user' })
    .where('u.user_id', '=', userId)
    .first(selectFfUserCols);

  return res;
};

export default familyfileUserById;
