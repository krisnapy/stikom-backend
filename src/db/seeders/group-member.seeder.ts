import { InferInsertType } from '@/types/drizzle.types';

import { db } from '..';
import { groupMembers } from '../schemas';
import { findGroupsByUserId, findUserByEmail } from '../services';

const groupMemberSeeds = async (): Promise<
  Array<InferInsertType<'groupMembers'>>
> => {
  const firstUser = await findUserByEmail('user@test.test');
  const secondUser = await findUserByEmail('user2@test.test');

  const firstGroup = await findGroupsByUserId(firstUser.id).then(
    (groups) => groups?.groups[0],
  );
  const secondGroup = await findGroupsByUserId(secondUser.id).then(
    (groups) => groups?.groups[0],
  );

  return [
    {
      groupId: firstGroup?.id,
      userId: firstUser.id,
      role: 'creator',
    },
    {
      groupId: secondGroup?.id,
      userId: secondUser.id,
      role: 'creator',
    },
  ];
};

export const groupMemberSeeder = async () => {
  try {
    const values = await groupMemberSeeds();

    await db.insert(groupMembers).values(values);

    console.log('Group member seeder has been executed!');
  } catch (error) {
    console.error(error);
  }
};
