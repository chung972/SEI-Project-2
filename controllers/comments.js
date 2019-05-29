const Recipe = require("../models/recipe");

module. exports = {
    create
}

function create(req, res){
    Recipe.findById(req.params.id, (err, recipe) => {

        req.body.user = req.user._id;
        
        // we want to assign the .user property key in the comment schema to the value of
        // a user('s)._id; however, in this case, the req.params that's being passed in is
        // the id for the RECIPE and not the user

        
        // const comment = { text: 'testing123', user: '5ce830b976e61712f3cec85a' }
        recipe.comments.push(req.body);
        recipe.save(err => {
            // side note, because we have to save the MODEL whenever we want to add a comment,
            // we are incrementing the version number (something that we wouldn't normally be
            // able to do if we just updated via findByIdAndUpdate)
            res.redirect(`/recipes/${recipe._id}`);
        });
    });
}