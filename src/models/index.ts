import { sequelize } from '../config/database';
import { DataTypes } from 'sequelize';
import User from './user';
import Role from './role';
import UserRole from './userRole';
import Cart from './cart';
import CartItem from './cartItem';
import Item from './item';
import Pricing from './pricing';
import Category from './category';

// Initialize models
User.init({}, { sequelize });
Role.init(
  {
	// Define attributes for Role model
	id: {
	  type: DataTypes.INTEGER,
	  primaryKey: true,
	  autoIncrement: true,
	},
	name: {
	  type: DataTypes.STRING,
	  allowNull: false,
	},
  },
  { sequelize }
);
UserRole.init(
  {
	// Define attributes for UserRole model
	userId: {
	  type: DataTypes.INTEGER,
	  allowNull: false,
	},
	roleId: {
	  type: DataTypes.INTEGER,
	  allowNull: false,
	},
  },
  { sequelize }
 );

export { sequelize, User, Role, UserRole, Cart, CartItem, Item, Pricing, Category };