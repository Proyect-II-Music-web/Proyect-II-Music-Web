const mongoose = require("mongoose");
const REQUIRED_FIELD_ERROR = require("../constants/errorMessages");
const Application = require("./Application.model");
const Band = require("./Band.model");
const postSchema = mongoose.Schema(
    {
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
        },
        isClosed: {
            type: Boolean,
            default: false
        },
        owner: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            required: true
        },
        band: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Band",
            required: true 
        }

    },
    {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
)

postSchema.virtual("applications", {
    ref: "Application",
    foreignField: "post",
    localField: "_id",
    justOne: false
})


const Post = mongoose.model("Post", postSchema);
module.exports = Post;