import { DataTypes } from 'sequelize'
import connection from '../config/config'
import { ProductBrand } from './productBrand'
import { ProductCategory } from './productCategory'

export const ProductModel = connection.define(
  'product_models',
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
    description: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isLowercase: true,
        notEmpty: true,
      },
    },
    price: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isLowercase: true,
        notEmpty: true,
      },
    },
    brand: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProductBrand,
        key: 'id',
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
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { freezeTableName: true }
)

ProductModel.belongsTo(ProductBrand, {
  foreignKey: 'brand',
})

ProductModel.belongsTo(ProductCategory, {
  foreignKey: 'category',
})
