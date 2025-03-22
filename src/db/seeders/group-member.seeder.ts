import { uuidv7 } from 'uuidv7';

import { InferInsertType } from '@/types/drizzle.types';

import { db } from '..';
import { groupMembers, groups } from '../schemas';

import { firstGroupUUID, secondGroupUUID } from './group.seeder';
import { firstUserUUID, secondUserUUID } from './users.seeder';

const groupMemberSeeds = (): Array<InferInsertType<'groupMembers'>> => [
  {
    uuid: uuidv7(),
    groupId: firstGroupUUID,
    userId: firstUserUUID,
    role: 'creator',
  },
  {
    uuid: uuidv7(),
    groupId: secondGroupUUID,
    userId: secondUserUUID,
    role: 'creator',
  },
];

export const groupMemberSeeder = async () => {
  try {
    const values = groupMemberSeeds();

    await db.insert(groupMembers).values(values);

    console.log('Group member seeder has been executed!');
  } catch (error) {
    console.error(error);
  }
};
