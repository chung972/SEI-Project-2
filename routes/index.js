const express = require('express');
const router = express.Router();
const passport = require("passport");



/* GET home page. */
router.get('/', (req, res, next)=> {
    res.render('index', {
      title: "EpiKorean",
      user: req.user
    });
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
// HEY LOOK HERE!!!!! once we deploy using heroku, you're going to have to go into
// the .env file and change the route for GOOGLE_CALLBACK; at that point we won't
// be using http://localhost:3000/ anymore
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
