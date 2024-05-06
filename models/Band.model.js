const mongoose = require("mongoose");
const { REQUIRED_FIELD_ERROR } = require("../constants/errorMessages");
const User = require("../models/User.model");
const Post = require("./Post.model");
const bandSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, REQUIRED_FIELD_ERROR]
    },

    description: {
        type: String,
        required: [true, REQUIRED_FIELD_ERROR]
    },

    tags: {
        type: [String],
        required: [true, REQUIRED_FIELD_ERROR]
    },

    members: {
        type: [String],
        required: [true, REQUIRED_FIELD_ERROR]
    },
    owner:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    avatar: {
        type: String
    },
    video: {
        type: String // Aquí almacenaremos el enlace del video
    }
   

},
{
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});
bandSchema.virtual("posts", {
    ref: "Post",
    foreignField: "band",
    localField: "_id",
    justOne: false
})

const Band = mongoose.model("Band", bandSchema);
module.exports = Band;