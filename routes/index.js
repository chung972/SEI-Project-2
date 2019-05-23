const express = require('express');
const router = express.Router();
const passport = require("passport");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  // TODO: have index.ejs be a landing page; look at
  // wireframes for more details
});

// Google OAuth LOGIN route
router.get("/auth/google", passport.authenticate(
  "google",
  {scope: ["profile"]}
));

// Google OAuth CALLBACK route
router.get("/oauth2callback", passport.authenticate(
  "google",
  {
    successRedirect: "/",
    failureRedirect: "/"
    // TODO: specify what page we want to redirect to after cb executes
    // currently redirecting back to index
  }
));

router.get("/logout", (req,res)=>{
  req.logout();
  res.redirect("/");
  // TODO: again, we'll want to specify what PATH (i.e. not relative
  // to the view dir) we want to redirect to
});

module.exports = router;
