import { DataTypes, Model } from "sequelize";

import { connection } from "@/config";

class Religion extends Model {
  public id!: string;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Religion.init(
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
  },
  {
    sequelize: connection,
    modelName: "Religion",
    freezeTableName: true,
    tableName: "religions",
  }
);

export default Religion;
export type ReligionModel = typeof Religion;
export type ReligionAttributes = Partial<Model<Religion>["dataValues"]>;
