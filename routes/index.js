const express = require('express');
const router = express.Router();
const passport = require("passport");
const recipesCtrl = require("../controllers/recipes");



/* get LANDING page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: "Landing"
  });
});

// get HOME page
router.get("/home", recipesCtrl.featured);


// Google OAuth LOGIN route
router.get("/auth/google", passport.authenticate(
  "google",
  { scope: ["profile"] }
));

// Google OAuth CALLBACK route
router.get("/oauth2callback", passport.authenticate(
  "google",
  {
    successRedirect: "/home",
    failureRedirect: "/"
  }
));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
