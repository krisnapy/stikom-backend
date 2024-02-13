import { DataTypes, Model } from "sequelize";

import { connection } from "@/config";

class ProgramStudy extends Model {
  public id!: string;
  public name!: string;
  public code!: string;
  public degree!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProgramStudy.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isLowercase: true,
      },
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isLowercase: true,
      },
    },
    degree: {
      type: DataTypes.ENUM,
      values: ["D3", "S1", "S2", "S3"],
      allowNull: false,
      validate: {
        notEmpty: true,
        isUppercase: true,
      },
    },
  },
  {
    sequelize: connection,
    modelName: "ProgramStudy",
    freezeTableName: true,
    tableName: "program_studies",
  }
);

export default ProgramStudy;
export type ProgramStudyModel = typeof ProgramStudy;
export type ProgramStudyAttributes = Partial<Model<ProgramStudy>["dataValues"]>;
