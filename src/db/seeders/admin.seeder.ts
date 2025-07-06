import bcrypt from 'bcryptjs';

import { InferInsertType } from '@/types/drizzle.types';

import { db } from '..';
import { admins } from '../schemas';

const adminSeeds = async (): Promise<Array<InferInsertType<'admins'>>> => [
  {
    username: 'superAdmin',
    email: 'superAdmin@test.test',
    password: await bcrypt.hash('22222222', 10),
    adminType: 'super_admin',
    phoneNumber: '0812345678900',
  },
  {
    username: 'admin',
    email: 'admin@test.test',
    password: await bcrypt.hash('22222222', 10),
    adminType: 'admin',
    phoneNumber: '0812345678901',
  },
];

export const adminSeeder = async () => {
  try {
    const values = await adminSeeds();

    await db.insert(admins).values(values);

    console.log('Admin seeder has been executed!');
  } catch (error) {
    console.error(error);
  }
};
