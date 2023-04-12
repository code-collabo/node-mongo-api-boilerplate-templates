const express = require("express");

const {
  getDemoItemsController,
  createDemoItemController,
  getOneDemoItemController,
  deleteDemoItemController,
} = require("../controllers/demo.controller");

let router = express.Router();

/*======================
  operations for /demo
=======================*/

router.get("/", getDemoItemsController);
router.post("/", createDemoItemController);
router.get("/:demoId", getOneDemoItemController);
router.delete("/:demoId", deleteDemoItemController);

module.exports = router;
