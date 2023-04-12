import express from "express";
import {
  getDemoItemsController,
  createDemoItemController,
  getOneDemoItemController,
  deleteDemoItemController,
} from "../controllers/demo.controller";

let router = express.Router();

router.get("/", getDemoItemsController);
router.post("/", createDemoItemController);
router.get("/:demoId", getOneDemoItemController);
router.delete("/:demoId", deleteDemoItemController);

export { router };
