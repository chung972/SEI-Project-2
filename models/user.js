const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    favorites: []
}, {
    timestamps: true
});


module.exports = mongoose.model("User", userSchema);