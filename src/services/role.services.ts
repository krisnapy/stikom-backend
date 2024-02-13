import { FindOptions } from "sequelize";

import { Role, RoleAttributes } from "@/models";

export const createRole = (data: RoleAttributes) => {
  return Role.create(data);
};

export const editRoleById = (data: RoleAttributes, id: string) => {
  return Role.update(data, {
    where: {
      id,
    },
  });
};

export const deleteRoleById = (id: string) => {
  return Role.destroy({
    where: {
      id,
    },
  });
};

export const getAllRoles = (options: FindOptions) => {
  return Role.findAll({
    ...options,
  });
};

export const getRoleById = (id: string, options?: FindOptions) => {
  return Role.findOne({
    where: {
      id,
    },
    ...options,
  });
};
