import express from "express";
import { getAppController } from "../controllers/app.controller";

let router = express.Router();

router.get("/", getAppController);

export { router };
