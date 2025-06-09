import { eq, desc } from 'drizzle-orm';

import { db } from '..';
import { DeviceInfo, deviceInfos } from '../schemas';

export const createDeviceInfo = async (data: DeviceInfo) => {
  const userDeviceInfos = await db.query.deviceInfos.findMany({
    where: eq(deviceInfos.userId, data.userId),
    orderBy: [desc(deviceInfos.createdAt)],
  });

  if (userDeviceInfos.length >= 2) {
    const oldestDeviceInfo = userDeviceInfos[userDeviceInfos.length - 1];
    await deleteDeviceInfo(oldestDeviceInfo.id);
  }

  const [deviceInfo] = await db.insert(deviceInfos).values(data).returning();

  return deviceInfo;
};

export const getDeviceInfo = async (userId: string) => {
  const deviceInfo = await db.query.deviceInfos.findFirst({
    where: eq(deviceInfos.userId, userId),
  });
  return deviceInfo;
};

export const deleteDeviceInfo = async (id: number) => {
  await db.delete(deviceInfos).where(eq(deviceInfos.id, id));
};
