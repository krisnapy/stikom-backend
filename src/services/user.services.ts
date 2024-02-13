import { FindOptions } from "sequelize";

import Religion from "@/models/religion.model";
import Role from "@/models/role.model";
import User, { UserAttributes } from "@/models/user.model";

export const getUserByUsername = (username: string, options?: FindOptions) => {
  const user = User.findOne({
    where: {
      username,
    },
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
      },
      {
        model: Religion,
        as: "religion",
        attributes: ["id", "name"],
      },
      {
        model: User,
        as: "dosen",
        attributes: ["id", "fullName", "email", "avatar", "phoneNumber"],
      },
    ],
    ...options,
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const createUser = (data: UserAttributes) => {
  return User.create(data);
};

export const editUserById = (data: UserAttributes, id: string) => {
  return User.update(data, {
    where: {
      id,
    },
  });
};

export const deleteUserById = (id: string) => {
  return User.destroy({
    where: {
      id,
    },
  });
};

export const getAllUsers = (options: FindOptions) => {
  return User.findAll({
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
      },
      {
        model: Religion,
        as: "religion",
        attributes: ["id", "name"],
      },
      {
        model: User,
        as: "dosen",
        attributes: ["id", "fullName", "email", "avatar", "phoneNumber"],
      },
    ],
    ...options,
  });
};

export const getUsersByRole = (roleId: number, options?: FindOptions) => {
  return User.findAll({
    where: {
      roleId,
    },
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
      },
      {
        model: Religion,
        as: "religion",
        attributes: ["id", "name"],
      },
      {
        model: User,
        as: "dosen",
        attributes: ["id", "fullName", "email", "avatar", "phoneNumber"],
      },
    ],
    ...options,
  });
};

export const getUserById = (id: string, options?: FindOptions) => {
  return User.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
      },
      {
        model: Religion,
        as: "religion",
        attributes: ["id", "name"],
      },
      {
        model: User,
        as: "dosen",
        attributes: ["id", "fullName", "email", "avatar", "phoneNumber"],
      },
    ],
    ...options,
  });
};
