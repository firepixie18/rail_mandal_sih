import dotenv from "dotenv";
dotenv.config();
import database from "./db/index.js";

import app from "./server.js";

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`Server is running, talking to API server on port ${port}`);
});

process.on("uncaughtException", function (err) {
  console.error(err.stack);
});
