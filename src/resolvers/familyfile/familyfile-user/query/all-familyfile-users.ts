import { FamilyFileUser } from 'src/@types/types';
import { Context } from 'src/context';

import selectFfUserCols from '../../query-parts/select/select-ff-user-all-columns';

const allFamilyfileUsers = async (
  parent: FamilyFileUser,
  args: {},
  context: Context,
) => {
  const { ffDb } = context;

  const res = await ffDb({ u: 'user' })
    .select(selectFfUserCols);

  return res;
};

export default allFamilyfileUsers;
