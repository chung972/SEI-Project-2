const Recipe = require("../models/recipe");

module. exports = {
    create
}

function create(req, res){
    Recipe.findById(req.params.id, (err, recipe) => {
        recipe.comments.push(req.body);
        recipe.save(err => {
            res.redirect(`/recipes/${recipe._id}`);
        });
    });
}