const express = require('express');
const router = express.Router();
const usersCtrl = require("../controllers/users");


// remember, with users, we'll only really ever need to
// SHOW one user at a time; in this case, the action will 
// essentially be a "my account" page; another thing to keep in mind
// is that SHOW will RENDER (we won't be changing any data)

/* GET users listing. */
router.get("/:id", usersCtrl.show);

module.exports = router;
