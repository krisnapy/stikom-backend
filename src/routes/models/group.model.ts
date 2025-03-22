import { t } from "elysia";

export const groupMemberCollectionModel = t.Array(
  t.Object({
    user: t.Object({
      uuid: t.String(),
      fullName: t.String(),
      email: t.String(),
      phoneNumber: t.String(),
      avatar: t.Union([t.String(), t.Null()]),
      address: t.String(),
      country: t.String(),
      gender: t.String(),
      description: t.Union([t.String(), t.Null()]),
      status: t.Union([t.String(), t.Null()]),
    }),
  })
);

export const groupModel = t.Object({
  uuid: t.String(),
  name: t.String(),
  description: t.String(),
  createdBy: t.String(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  groupMembers: groupMemberCollectionModel,
});

export const groupCollectionModel = t.Array(groupModel);
