import { Argon2id } from 'oslo/password';
import { uuidv7 } from 'uuidv7';

import { InferInsertType } from '@/types/drizzle.types';

import { db } from '..';
import { users } from '../schemas';

export const firstUserUUID = uuidv7();
export const secondUserUUID = uuidv7();
export const argon2 = new Argon2id();

const userSeeds = async (): Promise<Array<InferInsertType<'users'>>> => [
  {
    uuid: firstUserUUID,
    email: 'user@test.test',
    fullName: 'User Test',
    address: 'Graha Asri Persada',
    gender: 'male',
    country: 'Indonesia',
    password: await argon2.hash('22222222'),
    phoneNumber: '0812345678900',
  },
  {
    uuid: secondUserUUID,
    email: 'user2@test.test',
    fullName: 'User Test 2',
    address: 'Graha Asri Persada',
    gender: 'male',
    country: 'Indonesia',
    password: await argon2.hash('22222222'),
    phoneNumber: '08123456789000',
  },
];

export const userSeeder = async () => {
  try {
    const values = await userSeeds();

    await db.insert(users).values(values);

    console.log('User seeder has been executed!');
  } catch (error) {
    console.error(error);
  }
};
