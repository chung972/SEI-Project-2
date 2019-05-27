const express = require("express");
const router = express.Router();
const recipesCtrl = require("../controllers/recipes");

router.get("/", recipesCtrl.index);
router.get("/:id", recipesCtrl.show);

module.exports = router;