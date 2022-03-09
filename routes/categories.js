const express = require("express");
const router = express.Router();
var controller = require("../controllers/Categories");

router.post("/", controller.post);
router.get("/", controller.getAll);
router.get("/:id", controller.get);
router.delete("/:id", controller.delete);
router.put("/:id", controller.put);

module.exports = router;
