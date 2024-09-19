import { Sequelize } from "sequelize";

import "dotenv/config";

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      decimalNumbers: true,
    },
  },
);

db.sync().then(() => {
  console.log("table created");
});

export default db;
