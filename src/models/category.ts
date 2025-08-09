import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class Category extends Model {
  public id!: number;
  public name!: string;
  public description?: string;
  public status!: string;
  public createdAt!: number;
  public updatedAt!: number;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
    },
    createdAt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: () => Math.floor(Date.now() / 1000),
    },
    updatedAt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: () => Math.floor(Date.now() / 1000),
    },
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true,
    hooks: {
      beforeCreate: (category) => {
        const now = Math.floor(Date.now() / 1000);
        category.createdAt = now;
        category.updatedAt = now;
      },
      beforeUpdate: (category) => {
        category.updatedAt = Math.floor(Date.now() / 1000);
      },
    },
  }
);

export default Category;
