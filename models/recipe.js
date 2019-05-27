// TODO: we will want two schemas here; we want the "main" recipe schema but also
// the embedded comment schema here; BOTH schemas will need a ref: "User" (i.e. a
// reference to a related data entity); this is because both a recipe and comment
// must know who created; however, a recipe and comment will not necessarily be
// created by the SAME user (in fact, they most likely won't)

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// two different ways of using Schema; you can assign a Schema const up here,
// or you can call mongoose.Schema in "var nameSchema = new mongoose.Schema"

var recipeSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    ingredients: [{
        type: String
    }],
    imageURL: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Recipe", recipeSchema);