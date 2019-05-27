const Recipe = require("../models/recipe");

module.exports = {
    index,
    show
}

function index(req, res){
    Recipe.find({}, (err, recipes) => {
        res.render("recipes/index", {
            title: "Recipe List",
            recipes,
            user: req.user
        })
    })
}

function show(req, res){
    Recipe.findById(req.params.id);

}