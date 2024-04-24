const mongoose = require("mongoose");
const REQUIRED_FIELD_ERROR = require("../constants/errorMessages");
const postSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, REQUIRED_FIELD_ERROR]
    },
    description: {
        type: String,
        required: [true, REQUIRED_FIELD_ERROR]
    },
    //Querys de busqueda
    tags: {
        type: [String],
        required: [true, REQUIRED_FIELD_ERROR]
    },
    date: {
        type: Date,
        required: [true, REQUIRED_FIELD_ERROR]
    },
    place: {
        type: String,
        required: [true, REQUIRED_FIELD_ERROR]
    }

})

const Post = mongoose.model("Post", postSchema);
module.exports = Post;