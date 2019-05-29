const express = require("express");
const router = express.Router();
const recipesCtrl = require("../controllers/recipes");

// because this is a RELATED database, we're going to need a 
// different set of RESTful routes: https://gist.github.com/jim-clark/d7e5c9130c9b46b253d4c47aa601596a

router.get("/recipes", recipesCtrl.index);
router.get("/recipes/:id", recipesCtrl.show);
router.get("/users/:id/recipes/new", recipesCtrl.new);
router.post("/users/:id/recipes", recipesCtrl.create);
router.get("/recipes/:id/edit", recipesCtrl.edit);
router.put("/recipes/:id", recipesCtrl.update);

module.exports = router;

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next();
    res.redirect("/");
}