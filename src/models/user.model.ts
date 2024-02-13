import { DataTypes, Model } from "sequelize";

import { connection } from "@/config";

import Role from "./role.model";
import Religion from "./religion.model";

class User extends Model {
  public id!: string;
  public username!: string;
  public email!: string;
  public phoneNumber!: string | null;
  public birthDate!: Date;
  public birthPlace!: string;
  public gender!: string;
  public address!: string;
  public avatar!: string;
  public fullName!: string;
  public religionId!: number;
  public nik!: string;
  public nisn!: string;
  public password!: string;
  public roleId!: number;
  public province!: string;
  public city!: string;
  public regency!: string;
  public village!: string;
  public country!: string;
  public dosenId!: string | null;
  public registerDate!: Date;
  public graduationDate!: Date;
  public fatherName!: string;
  public motherName!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
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
        isLowercase: true,
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
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    birthPlace: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    gender: {
      type: DataTypes.ENUM,
      values: ["male", "female"],
      defaultValue: "male",
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    religionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Religion,
        key: "id",
      },
    },
    registerDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    graduationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fatherName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    motherName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nik: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    nisn: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    regency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    village: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    county: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: "id",
      },
    },
    dosenId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize: connection,
    modelName: "User",
    freezeTableName: true,
    tableName: "users",
  }
);

User.belongsTo(Role, {
  foreignKey: "roleId",
  targetKey: "id",
  as: "role",
});

User.belongsTo(Religion, {
  foreignKey: "religionId",
  targetKey: "id",
  as: "religion",
});

User.belongsTo(User, {
  foreignKey: "dosenId",
  targetKey: "id",
  as: "dosen",
});

export default User;
export type UserModel = typeof User;
export type UserAttributes = Partial<Model<User>["dataValues"]>;
