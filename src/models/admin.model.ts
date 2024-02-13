import { DataTypes, Model } from "sequelize";

import { connection } from "@/config";

import Religion from "./religion.model";

class Admin extends Model {
  public id!: string;
  public username!: string;
  public email!: string;
  public phoneNumber!: string | null;
  public password!: string;
  public adminType!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Admin.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    adminType: {
      type: DataTypes.ENUM,
      values: ["admin", "superadmin"],
      defaultValue: "admin",
      allowNull: false,
      validate: {
        notEmpty: true,
        isLowercase: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize: connection,
    modelName: "Admin",
    freezeTableName: true,
    tableName: "admins",
  }
);

export default Admin;
export type AdminModel = typeof Admin;
export type AdminAttributes = Partial<Model<Admin>["dataValues"]>;
