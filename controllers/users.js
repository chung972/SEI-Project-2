const User = require("../models/user");
const Recipe = require("../models/recipe");

module.exports = {
    show
}

function show(req, res) {
    User.findById(req.params.id, (err, user) => {
        Recipe.find({ user: user._id }, (err, recipes) => {
            res.render("users/show", {
                title: "My Account",
                user,
                recipes
            });
        });
    });
}