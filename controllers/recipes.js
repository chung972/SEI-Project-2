const Recipe = require("../models/recipe");

module.exports = {
    index,
    show,
    new: newRecipe,
    create
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

function newRecipe(req, res){
    res.render("recipes/new", {
        title: "New Recipe",
        user: req.user
    });
}

function create(req, res){
    // we assign the .user property in the Recipe model to be the user id that was
    // passed in from newRecipe
    req.body.user = req.params.id;
    Recipe.create(req.body, (err, recipe)=>{
        console.log(recipe);
        res.redirect(`/recipes/${recipe._id}`);
    })
}