const express = require("express");
const router = express.Router();
const recipesCtrl = require("../controllers/recipes");

// because this is a RELATED database, we're going to need a 
// different set of RESTful routes: https://gist.github.com/jim-clark/d7e5c9130c9b46b253d4c47aa601596a

router.get("/recipes", recipesCtrl.index);
router.get("/recipes/random", recipesCtrl.random);  // this is UNrestful, right?
router.get("/recipes/:id", recipesCtrl.show);
router.get("/users/:id/recipes/new", isLoggedIn, recipesCtrl.new);
router.post("/users/:id/recipes", isLoggedIn, recipesCtrl.create);
router.get("/recipes/:id/edit", isLoggedIn, recipesCtrl.edit);
router.put("/recipes/:id", isLoggedIn, recipesCtrl.update);
router.delete("/users/:userid/recipes/:recipeid", isLoggedIn, recipesCtrl.delete);


module.exports = router;

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next();
    res.redirect("/recipes");
}