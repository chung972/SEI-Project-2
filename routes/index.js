const express = require('express');
const router = express.Router();
const passport = require("passport");


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: "Express"});
    // TODO: we DON'T want the logic to live here. call on a controller function
    // if you want to perform logic; therefore, we want to redirect to another view
    // page; consider where you want to redirect/render, though;
    // maybe something like /users/show 
});

// Google OAuth LOGIN route
router.get("/auth/google", passport.authenticate(
  "google",
  { scope: ["profile"] }
  // TODO: read documentation on scope; note that unlike the sei students example
  // we did in class, because we're not using email, we're going to leave that
  // property(?) out
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

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
  // TODO: again, we'll want to specify what PATH (i.e. not relative
  // to the view dir) we want to redirect to
});

module.exports = router;
