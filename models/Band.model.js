const mongoose = require("mongoose");

const { REQUIRED_FIELD_ERROR } = require("../constants/errorMessages");
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const bandSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, REQUIRED_FIELD_ERROR]
    },
    email: {
        type: String,
        required: [true, REQUIRED_FIELD_ERROR],
        unique: true,
        trim: true,
        match: [EMAIL_REGEX, "Introduce un email válido"]
    }
});

const Band = mongoose.model("Band", bandSchema);
module.exports = Band;