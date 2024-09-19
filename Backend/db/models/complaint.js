import Sequelize from "sequelize";
import db from "../../db/index.js";
const { DataTypes } = Sequelize;
const complaint = db.define(
  "compliant",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
    },
    incidentDate: {
      type: DataTypes.STRING,
    },
    grievanceDescription: {
      type: DataTypes.STRING,
    },
    consumerId: {
      type: DataTypes.INTEGER,
      references: {
        model: "consumer",
        key: "id",
      },
    },
    document: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  },
);
export default complaint;
