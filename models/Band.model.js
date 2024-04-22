const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { REQUIRED_FIELD_ERROR } = require("../constants/errorMessages");
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const SALT_ROUNDS = 10;
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
    },
    password: {
        type: String,
        required: [true, REQUIRED_FIELD_ERROR],
        minLength: [8, "La contraseña dete tener al menos 8 caracteres"]
    }
});

//Hasheamos la contraseña antes de guardarla
bandSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        bcrypt.hash(this.password, SALT_ROUNDS)
            .then(hash=> {
                this.password = hash;
                next();
            })
    } else{
        next();
    }
})

bandSchema.methods.checkPassword = function (passwordToCompare) {
   return bcrypt.compare(passwordToCompare, this.password) 
}
const Band = mongoose.model("Band", bandSchema);
module.exports = Band;