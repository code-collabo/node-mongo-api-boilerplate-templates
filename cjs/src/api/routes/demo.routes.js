const express = require("express");

const {
  getDemoItemsController,
  createDemoItemController,
  getOneDemoItemController,
  deleteDemoItemController,
  partialUpdateDemoItemController,
  fullUpdateDemoItemController,
} = require("../controllers/demo.controller");

let router = express.Router();

/*======================
  operations for /demo
=======================*/

router.get("/", getDemoItemsController);
router.post("/", createDemoItemController);
router.get("/:demoId", getOneDemoItemController);
router.delete("/:demoId", deleteDemoItemController);
router.patch("/:demoId", partialUpdateDemoItemController);
router.put("/:id", fullUpdateDemoItemController);

module.exports = router;
