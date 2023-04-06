import { DataTypes } from 'sequelize'
import connection from '../config/config'
import { ProductModel } from './productModel'
import { ProductProperty } from './productProperty'

export const PropertyAttribute = connection.define(
  'property_attributes',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    property: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProductProperty,
        key: 'id',
      },
    },
    model: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProductModel,
        key: 'id',
      },
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { freezeTableName: true }
)

PropertyAttribute.belongsTo(ProductProperty, {
  foreignKey: 'property',
})

PropertyAttribute.belongsTo(ProductModel, {
  foreignKey: 'model',
})
