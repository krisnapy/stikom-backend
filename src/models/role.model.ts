import { DataTypes, Model } from "sequelize";

import { connection } from "@/config";

class Role extends Model {
  public id!: string;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Role.init(
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
    modelName: "Role",
    freezeTableName: true,
    tableName: "roles",
  }
);

export default Role;
export type RoleModel = typeof Role;
export type RoleAttributes = Partial<Model<Role>["dataValues"]>;
