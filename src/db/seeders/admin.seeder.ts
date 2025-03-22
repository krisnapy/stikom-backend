import { Argon2id } from 'oslo/password';
import { uuidv7 } from 'uuidv7';

import { InferInsertType } from '@/types/drizzle.types';

import { db } from '..';
import { admins } from '../schemas';


const argon2 = new Argon2id();

const adminSeeds = async (): Promise<Array<InferInsertType<'admins'>>> => [
  {
    uuid: uuidv7(),
    username: 'superAdmin',
    email: 'superAdmin@test.test',
    password: await argon2.hash('22222222'),
    adminType: 'super_admin',
    phoneNumber: '0812345678900',
  },
  {
    uuid: uuidv7(),
    username: 'admin',
    email: 'admin@test.test',
    password: await argon2.hash('22222222'),
    adminType: 'admin',
    phoneNumber: '0812345678901',
  },
];

export const adminSeeder = async () => {
  try {
    const values = await adminSeeds();

    await db.insert(admins).values(values);

    console.log('User seeder has been executed!');
  } catch (error) {
    console.error(error);
  }
};
