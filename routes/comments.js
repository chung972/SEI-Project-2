const express = require("express");
const router = express.Router();
const commentsCtrl = require("../controllers/comments");
const recipesCtrl = require("../controllers/recipes");

router.get("/recipes/:id/comments", recipesCtrl.show);
router.post("/recipes/:id/comments", isLoggedIn, commentsCtrl.create);
// we have this .get above to catch the path req.path/req.originalUrl throws;
// unfortunately, for some reason when we DO catch that get request, that request
// gets called on repeatedly

router.delete("/recipes/:recipeid/comments/:commentid", isLoggedIn, commentsCtrl.delete);
// router.delete("/comments/:id", isLoggedIn, commentsCtrl.delete);

module.exports = router;

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next();
    console.log(req.path);
    console.log(req.originalUrl);
    return res.redirect("/recipes");
    // return res.redirect(`/recipes/${req.params.id}`);
}