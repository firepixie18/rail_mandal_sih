import Sequelize from "sequelize";
import db from "../../db/index.js";
const { DataTypes } = Sequelize;

const consumer = db.define(
  "consumer",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    journeyDetails: {
      type: DataTypes.STRING,
    },
    pnrNo: {
      type: DataTypes.STRING,
    },
    contactNo: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  },
);
export default consumer;
