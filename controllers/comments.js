const Recipe = require("../models/recipe");

module. exports = {
    create,
    delete: deleteComment
}

function create(req, res){
    Recipe.findById(req.params.id, (err, recipe) => {
        req.body.user = req.user._id;
        req.body.author = req.user.name;
        req.body.avatar = req.user.avatar;

        recipe.comments.push(req.body);
        recipe.save(err => {
            res.redirect(`/recipes/${recipe._id}`);
        });
    });
}

function deleteComment(req, res){
    console.log("req.params.id of the comment should be: "+req.params.id);
    Recipe.findByIdAndUpdate(req.params.recipeid, {$pull: {comments: {_id: req.params.commentid}}}, ()=>{
        res.redirect(`/recipes/${req.params.recipeid}`);
    });
}

