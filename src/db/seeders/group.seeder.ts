import { InferInsertType } from '@/types/drizzle.types';

import { db } from '..';
import { groups } from '../schemas';
import { findUserByEmail } from '../services';

const groupSeeds = (
  firstUserId: string,
  secondUserId: string,
): Array<InferInsertType<'groups'>> => [
  {
    name: 'Group 1',
    description: 'Group 1 description',
    createdBy: firstUserId,
  },
  {
    name: 'Group 2',
    description: 'Group 2 description',
    createdBy: secondUserId,
  },
];

export const groupSeeder = async () => {
  try {
    const firstUser = await findUserByEmail('user@test.test');
    const secondUser = await findUserByEmail('user2@test.test');

    const values = groupSeeds(firstUser.id, secondUser.id);

    await db.insert(groups).values(values);

    console.log('Group seeder has been executed!');
  } catch (error) {
    console.error(error);
  }
};
