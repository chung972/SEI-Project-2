const Recipe = require("../models/recipe");

module.exports = {
    index,
    show,
    new: newRecipe,
    create,
    edit,
    update,
    delete: deleteRecipe,
    random,
    featured
}

function index(req, res) {
    let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    Recipe.find(modelQuery, (err, recipes) => {
        res.render("recipes/index", {
            title: "Recipe List",
            recipes,
            user: req.user,
            name: req.query.name
        });
    });
}

function show(req, res) {
    Recipe.findById(req.params.id, (err, recipe) => {
        res.render("recipes/show", {
            title: recipe.name,
            user: req.user,
            recipe
        });
    });
}

function newRecipe(req, res) {
    res.render("recipes/new", {
        title: "New Recipe",
        user: req.user
    });
}

function create(req, res) {
    req.body.user = req.params.id;
    req.body.ingredients = req.body.ingredients.split(",");
    req.body.instructions = req.body.instructions.split(",");
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
    Recipe.findById(req.params.id, (err, recipe)=> {
        recipe.name = req.body.name;
        recipe.description = req.body.description;
        recipe.ingredients = req.body.ingredients.split(",");
        recipe.instructions = req.body.instructions.split(",");
        recipe.imageURL = req.body.imageURL;
        recipe.save(err => {
            res.redirect(`/recipes/${recipe._id}`);
        });
    });
}

function deleteRecipe(req, res) {
    Recipe.findByIdAndDelete(req.params.recipeid, (err) => {
        res.redirect(`/users/${req.params.userid}`)
    });
}

function random(req, res) {
    Recipe.find({}, (err, recipes) => {
        let randNum = getRndInteger(0, recipes.length);
        let url = recipes[randNum]._id
        res.redirect(`/recipes/${url}`);
    });
}

function featured(req, res){
    Recipe.find({}, (err, recipes) => {
        let randNum = getRndInteger(0, recipes.length);
        let randId = recipes[randNum]._id
        Recipe.findById(randId, (err, recipe)=>{
            res.render("home", {
                title: "Home",
                user: req.user,
                recipe
            })
        });
    });
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}