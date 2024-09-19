import Sequelize from "sequelize";
import db from "../index.js";
import consumer from "./consumer.js";
import complaint from "./complaint.js";
const model = {};

model.Sequelize = Sequelize;
model.db = db;
model.consumer = consumer;
model.complaint = complaint;
model.consumer.hasMany(complaint, {
  foreignKey: "consumerId",
  as: "complaint",
});
model.complaint.belongsTo(consumer, {
  foreignKey: "consumerId",
  as: "consumer",
});

export default model;
