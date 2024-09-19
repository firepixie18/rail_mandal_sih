import { Router } from "express";

import consumerRoute from "./consumer.js";

const router = Router();

router.use("/consumer", consumerRoute);

export default router;
