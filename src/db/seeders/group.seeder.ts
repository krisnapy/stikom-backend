import { uuidv7 } from 'uuidv7';

import { InferInsertType } from '@/types/drizzle.types';

import { db } from '..';
import { groups } from '../schemas';

import { firstUserUUID, secondUserUUID } from './users.seeder';

export const firstGroupUUID = uuidv7();
export const secondGroupUUID = uuidv7();

const groupSeeds = (): Array<InferInsertType<'groups'>> => [
  {
    uuid: firstGroupUUID,
    name: 'Group 1',
    description: 'Group 1 description',
    createdBy: firstUserUUID,
  },
  {
    uuid: secondGroupUUID,
    name: 'Group 2',
    description: 'Group 2 description',
    createdBy: secondUserUUID,
  },
];

export const groupSeeder = async () => {
  try {
    const values = groupSeeds();

    await db.insert(groups).values(values);

    console.log('Group seeder has been executed!');
  } catch (error) {
    console.error(error);
  }
};
