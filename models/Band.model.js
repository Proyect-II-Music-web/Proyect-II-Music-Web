const mongoose = require("mongoose");
const { REQUIRED_FIELD_ERROR } = require("../constants/errorMessages");
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
    }

});

const Band = mongoose.model("Band", bandSchema);
module.exports = Band;