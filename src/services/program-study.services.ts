import { FindOptions } from "sequelize";

import ProgramStudy, {
  ProgramStudyAttributes,
} from "@/models/program-study.model";

export const createProgramStudy = (data: ProgramStudyAttributes) => {
  return ProgramStudy.create(data);
};

export const editProgramStudyById = (
  data: ProgramStudyAttributes,
  id: string
) => {
  return ProgramStudy.update(data, {
    where: {
      id,
    },
  });
};

export const deleteProgramStudyById = (id: string) => {
  return ProgramStudy.destroy({
    where: {
      id,
    },
  });
};

export const getAllProgramStudies = (options: FindOptions) => {
  return ProgramStudy.findAll({
    ...options,
  });
};

export const getProgramStudyById = (id: string, options?: FindOptions) => {
  return ProgramStudy.findOne({
    where: {
      id,
    },
    ...options,
  });
};
