import { FindOptions } from "sequelize";

import Admin, { AdminAttributes } from "@/models/admin.model";

export const createAdmin = (data: AdminAttributes) => {
  return Admin.create(data);
};

export const editAdminById = (data: AdminAttributes, id: string) => {
  return Admin.update(data, {
    where: {
      id,
    },
  });
};

export const deleteAdminById = (id: string) => {
  return Admin.destroy({
    where: {
      id,
    },
  });
};

export const getAllAdmins = (options: FindOptions) => {
  return Admin.findAll({
    ...options,
  });
};

export const getAdminById = (id: string, options?: FindOptions) => {
  return Admin.findOne({
    where: {
      id,
    },
    ...options,
  });
};
