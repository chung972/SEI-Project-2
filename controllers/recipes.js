const Recipe = require("../models/recipe");

module.exports = {
    index,
    show,
    new: newRecipe,
    create,
    edit,
    update
}

function index(req, res) {
    Recipe.find({}, (err, recipes) => {
        res.render("recipes/index", {
            title: "Recipe List",
            recipes,
            user: req.user
        })
    })
}

function show(req, res) {
    Recipe.findById(req.params.id, (err, recipe) => {
        res.render("recipes/show", {
            title: recipe.name,
            user: req.user,
            recipe
        });
    })
}

function newRecipe(req, res) {
    res.render("recipes/new", {
        title: "New Recipe",
        user: req.user
        // NOTE: req.user is NOT the same as req.params.id
        // the former is an object that is created during a passport session
        // and the latter is whatever id is passed into the path
    });
}

function create(req, res) {
    // we assign the .user property in the Recipe model to be the user id that was
    // passed in from newRecipe
    req.body.user = req.params.id;
    Recipe.create(req.body, (err, recipe) => {
        console.log(recipe);
        console.log(req.body);
        res.redirect(`/recipes/${recipe._id}`);
    });
}

function edit(req, res) {
    Recipe.findById(req.params.id, (err, recipe) => {
        res.render("recipes/edit", {
            title: `${recipe.name}`,
            user: req.user,
            recipe
        });
    });
}

function update(req, res) {
    Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, recipe) => {
        console.log(recipe);
        console.log(recipe.__v);
        res.redirect(`/recipes/${recipe._id}`);
    });
    // https://stackoverflow.com/questions/30419575/mongoose-findbyidandupdate-not-returning-correct-model

}