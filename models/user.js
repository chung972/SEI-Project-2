const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    favorites: [],
    googleId: String,
    avatar: String
}, {
    timestamps: true
});


module.exports = mongoose.model("User", userSchema);