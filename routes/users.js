var express = require('express');
var router = express.Router();


// remember, with users, we'll only really ever need to
// SHOW one user at a time; in this case, the action will 
// essentially be a "my account" page; another thing to keep in mind
// is that SHOW will RENDER (we won't be changing any data)

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
