import express from "express";
import {
  getDemoItemsController,
  createDemoItemController,
  getOneDemoItemController,
  deleteDemoItemController,
  partialUpdateDemoItemController,
  fullUpdateDemoItemController,
} from "../controllers/demo.controller";

let router = express.Router();

router.get("/", getDemoItemsController);
router.post("/", createDemoItemController);
router.get("/:demoId", getOneDemoItemController);
router.delete("/:demoId", deleteDemoItemController);
router.patch("/:demoId", partialUpdateDemoItemController);
router.put("/:id", fullUpdateDemoItemController);

export { router };
