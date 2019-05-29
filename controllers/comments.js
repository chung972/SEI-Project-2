const Recipe = require("../models/recipe");

module. exports = {
    create,
    delete: deleteComment
}

function create(req, res){
    Recipe.findById(req.params.id, (err, recipe) => {
        
        req.body.user = req.user._id;
        // we want to assign the .user property key in the comment schema to the value of
        // a user('s)._id; however, in this case, the req.params that's being passed in is
        // the id for the RECIPE and not the user; REMEMBER that ONLY users (meaning they've
        // logged in) are able to CREATE comments; therefore, req.user will inherently always
        // be a handle on the user creating a comment

        req.body.author = req.user.name;
        // along the same lines in the comments above, because req.user is an actual handle
        // on the user OBJECT, we are able to call user.name and get the .name (returned courtesy
        // of Google)

        req.body.avatar = req.user.avatar;

        recipe.comments.push(req.body);
        recipe.save(err => {
            // side note, because we have to save the MODEL whenever we want to add a comment,
            // we are incrementing the version number (something that we wouldn't normally be
            // able to do if we just updated via findByIdAndUpdate)
            res.redirect(`/recipes/${recipe._id}`);
        });
    });
}

function deleteComment(req, res){
    console.log("req.params.id of the comment should be: "+req.params.id);
    // Recipe.findByIdAndDelete(req.params.id, (err)=>{
    // // Recipe.findByIdAndDelete({"comments.comment": req.params.id}, ()=>{
    //     console.log("you got this far");
    //     res.redirect(`/`);
    // });
    // the code above won't work because if we think about it, the comments property in our Recipe model is
    // an ARRAY. remember that comments are an embedded schema, so they can't stand alone (this is 
    // apparent in the example labs where in order to save a review in movies, we had to save the 
    // movie MODEL); also, BECAUSE comments are a subdoc and can't stand alone, we won't be able to
    // use methods like .findByIdAndDelete (note how we wouldn't even be able to .require() Comment
    // because they don't have their own model to begin with)

    Recipe.findByIdAndUpdate(req.params.recipeid, {$pull: {comments: {_id: req.params.commentid}}}, ()=>{
        res.redirect(`/recipes/${req.params.recipeid}`);
    });
    // considering that explanation in the above comments, the thought process for THIS solution (i'm sure there
    // are other, maybe more semantic, ways of doing it) is we first have to make the route (that'll eventually call
    // this controller action) include both the recipe id and comment id. we do that in the recipe show.ejs (in that
    // view template we already have handles on both the currently viewed recipe and a specific comment - which we get
    // from iterating through a forEach). we use those two ids to construct our route: "/recipes/:recipeid/comments/:commentid"
}

