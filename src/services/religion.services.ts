import { FindOptions } from "sequelize";

import Religion, { ReligionAttributes } from "@/models/religion.model";

export const createReligion = (data: ReligionAttributes) => {
  return Religion.create(data);
};

export const editReligionById = (data: ReligionAttributes, id: string) => {
  return Religion.update(data, {
    where: {
      id,
    },
  });
};

export const deleteReligionById = (id: string) => {
  return Religion.destroy({
    where: {
      id,
    },
  });
};

export const getAllReligions = (options: FindOptions) => {
  return Religion.findAll({
    ...options,
  });
};

export const getReligionById = (id: string, options?: FindOptions) => {
  return Religion.findOne({
    where: {
      id,
    },
    ...options,
  });
};
