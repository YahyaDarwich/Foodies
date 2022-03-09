const express = require("express");
const router = express.Router();
var controller = require("../controllers/recipe");

router.get("/title/:id", controller.getByTitle);
router.get("/", controller.getAll);
router.get("/:id", controller.get);
router.get("/category/:id", controller.getByCategory);
router.post("/", controller.post);
router.put("/:id", controller.put);
router.delete("/:id", controller.delete)

module.exports = router;
