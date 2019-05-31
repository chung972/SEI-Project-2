const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var commentSchema = new Schema({
    text: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    author: {
        type: String
    },
    avatar: {
        type: String
    }
}, {
        timestamps: true
    })

var recipeSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    ingredients: [],
    instructions: [],
    imageURL: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [commentSchema]
}, {
        timestamps: true
    });



module.exports = mongoose.model("Recipe", recipeSchema);