import { YglUser } from 'src/@types/types';
import { Context } from 'src/context';

const yglAllUsers = async (
  parent: YglUser,
  args: {},
  context: Context,
) => {
  const { yglDb } = context;

  const res = await yglDb({ u: 'Users' }).select({
    username: 'u.[username] ',
    userId: 'u.[users_id]',
    userRoleId: 'u.[user_role_id]',
    status: 'u.[status] ',
    role: 'u.[role]',
    mgr: 'u.[mgr]',
    email: 'u.[email]',
    hiredate: 'u.[hiredate]',
    termdate: 'u.[termdate]',
    userCreatedOn: 'u.[user_created_on]',
    startDate: 'u.[start_date]',
    transferDate: 'u.[transfer_date]',
  });

  return res;
};

export default yglAllUsers;
