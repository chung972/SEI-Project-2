const express = require('express');
const router = express.Router();
const usersCtrl = require("../controllers/users");

/* GET users listing. */
router.get("/:id", usersCtrl.show);

module.exports = router;
