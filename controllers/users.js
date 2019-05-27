const User = require("../models/user");

module.exports = {
    show
}

function show(req, res){
    User.findById(req.params.id, (err, user) => {
        res.render("users/show", {
            title: "My Account",
            user
        });
    });
}