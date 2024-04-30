const mongoose = require("mongoose");
const User = require("./User.model");
const Post = require("./Post.model");

const ticketSchema = mongoose.Schema({
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

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;