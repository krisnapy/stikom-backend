import bcrypt from 'bcryptjs';

import { InferInsertType } from '@/types/drizzle.types';

import { db } from '..';
import { users } from '../schemas';

const userSeeds = async (): Promise<Array<InferInsertType<'users'>>> => [
  {
    email: 'user@test.test',
    fullName: 'User Test',
    address: 'Graha Asri Persada',
    gender: 'male',
    country: 'Indonesia',
    password: await bcrypt.hash('22222222', 10),
    phoneNumber: '0812345678900',
  },
  {
    email: 'user2@test.test',
    fullName: 'User Test 2',
    address: 'Graha Asri Persada',
    gender: 'male',
    country: 'Indonesia',
    password: await bcrypt.hash('22222222', 10),
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
