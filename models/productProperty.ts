import { DataTypes } from 'sequelize'

import connection from '../config/config'

import { ProductCategory } from './productCategory'

export const ProductProperty = connection.define(
  'product_properties',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isLowercase: true,
        notEmpty: true,
      },
    },
    display_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
    },
    data_type: {
      type: DataTypes.ENUM('string', 'boolean', 'integer', 'float', 'date'),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProductCategory,
        key: 'id',
      },
    },
  },
  { freezeTableName: true }
)

ProductProperty.belongsTo(ProductCategory, {
  foreignKey: 'category',
})
