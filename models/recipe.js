// TODO: we will want two schemas here; we want the "main" recipe schema but also
// the embedded comment schema here; BOTH schemas will need a ref: "User" (i.e. a
// reference to a related data entity); this is because both a recipe and comment
// must know who created; however, a recipe and comment will not necessarily be
// created by the SAME user (in fact, they most likely won't)

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// two different ways of using Schema; you can assign a Schema const up here,
// or you can call mongoose.Schema in "var nameSchema = new mongoose.Schema";
// in this case, we would want to create the shortcut variable (because we'll
// be calling it below for the 'user' property)

// var ingredientSchema = new Schema({
//     text: String
// }, {
//     timestamps: true
// });

// var instructionSchema = new Schema({
//     text: String
// }, {
//     timestamps: true
// });

var commentSchema = new Schema({
    text: {
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
    // the embedded schemas above and the two lines below are to be
    // paired with socket.io (live connection between front/back end)
    // ingredients: [ingredientSchema],
    // instructions:[instructionSchema],
    ingredients: [],
    instructions: [],
    imageURL: {
        type: String
    },
    user: {
        // is user a keyword?
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [commentSchema]
}, {
    timestamps: true
});

// in order to have the ability to add/delete instructions and ingredients,
// we are going to need to embed those two data entities; inspired from the
// sei-students lab from w05/d3


module.exports = mongoose.model("Recipe", recipeSchema);