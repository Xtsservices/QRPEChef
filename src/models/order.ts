import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import moment from 'moment-timezone'; // Import moment-timezone
moment.tz('Asia/Kolkata') // Import moment for Unix timestamps
import Canteen from './canteen';

class Order extends Model {
  public id!: number;
  public userId!: number;
  public totalAmount!: number;
  public status!: string;
  public canteenId!: number;
  public orderNo!: string;
  public menuConfigurationId!: number;
  public createdById!: number; // ID of the user who created the order
  public updatedById!: number; // ID of the user who last updated the order
  public readonly createdAt!: number; // Store as Unix timestamp
  public readonly updatedAt!: number; // Store as Unix timestamp
  public qrCode!: string; // Field to store the QR code
  orderDate: number | undefined;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    canteenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    menuConfigurationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdById: {
      type: DataTypes.INTEGER,
      allowNull: false, // Ensure this field is required
    },
    updatedById: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow null for updates
    },
    orderDate: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow null for updates
    },
    orderNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('createdAt')).unix(); // Convert to Unix timestamp
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('updatedAt')).unix(); // Convert to Unix timestamp
      },
    },
    qrCode: {
      type: DataTypes.TEXT, // Change to TEXT to allow longer strings
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'orders',
    timestamps: true, // Enable Sequelize timestamps
  }
);

Order.belongsTo(Canteen, { as: 'Canteen', foreignKey: 'canteenId' });

export default Order;