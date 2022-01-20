/* eslint-disable */
import { YglUser } from 'src/@types/types';
import { Context } from 'src/context';

const YglUsersNotInFamilyFileDb = async (
  parent: YglUser,
  args: {},
  context: Context,
) => {
  const { ffDb, yglDb } = context;

  type ffUserId = {
    id: number
  }

  const ffUserIds = new Set<number>();

  const ffUsers: ffUserId[] = await ffDb('user')
    .select({
      id: 'user_id',
    })
    .then((res: ffUserId[]) => res.forEach((user: ffUserId) => ffUserIds.add(user.id)));

  const res = await yglDb({ u: 'dbo.Users' })
    .join({ ac: 'apfm.advisor_coach' }, 'ac.username', '=', 'u.username')
    .join({ c: 'apfm.coach' }, 'ac.coach_id', '=', 'c.coach_id')
    .join({ m: 'dbo.users' }, 'm.username', '=', 'c.username')
    .whereNull('u.termdate')
    .andWhere('u.status', 1)
    // .whereNotNull('apfm.advisor_coach.end_date')
    // should be able to use a whereNotIn(ffusers) but havn't been able to get it to work
    .select({
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

  const results = res.filter((yglUser: YglUser) => !ffUserIds.has(yglUser.userId));

  return results;
};

export default YglUsersNotInFamilyFileDb;
