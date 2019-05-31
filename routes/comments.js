const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/comments");
const recipesCtrl = require("../controllers/recipes");

router.get("/recipes/:id/comments", recipesCtrl.show);
router.post("/recipes/:id/comments", isLoggedIn, commentsCtrl.create);


router.delete("/recipes/:recipeid/comments/:commentid", isLoggedIn, commentsCtrl.delete);

module.exports = router;

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next();
    console.log(req.path);
    console.log(req.originalUrl);
    return res.redirect("/recipes");
}