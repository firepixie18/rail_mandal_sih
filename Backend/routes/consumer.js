import { Router } from "express";
import multer from "multer";
const router = Router();
import controllers from "../controllers/index.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post(`/add-consumer`, controllers.addConsumer);

router.post(
  "/document",
  multer({ dest: path.resolve(__dirname + "../../uploads") }).single("image"),
  controllers.upload,
);

export default router;
