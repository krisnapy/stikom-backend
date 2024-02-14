import { DataTypes, Model } from "sequelize";

import { connection } from "@/config";
import ProgramStudy from "./program-study.model";

class Course extends Model {
  public id!: number;
  public code!: string;
  public name!: string;
  public semester!: number;
  public sks!: number;
  public programStudyId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    sks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    programStudyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize: connection,
    modelName: "Course",
    freezeTableName: true,
    tableName: "courses",
  }
);

Course.belongsTo(ProgramStudy, {
  foreignKey: "programStudyId",
  as: "programStudy",
});

export default Course;
export type CourseModel = typeof Course;
export type CourseAttributes = Partial<Model<Course>["dataValues"]>;
