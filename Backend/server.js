import express, { json } from "express";

import routes from "./routes/index.js";

import errorHandler from "./middlewares/errorHandler.js";


const app = express();

app.use(json());

app.get("/", (req, res) => {
  res.send("Application backend started");
});
app.use("/api/v1", routes);
app.use(errorHandler);


export default app;
