const mongoose = require("mongoose");
const User = require("./User.model");
const Post = require("./Post.model");

const applicationSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Post",
        required: true
    }

})

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;