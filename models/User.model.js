const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { REQUIRED_FIELD_ERROR } = require("../constants/errorMessages");
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const SALT_ROUNDS = 10;

const Application = require("./Application.model");
const Band = require("./Band.model");
const Post = require("../models/Post.model")
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, REQUIRED_FIELD_ERROR],
      trim: true,
    },
    email: {
      type: String,
      required: [true, REQUIRED_FIELD_ERROR],
      trim: true,
      unique: true,
      match: [EMAIL_REGEX, "Introduce un email válido"]
    },
    password: {
      type: String,
      required: [true, REQUIRED_FIELD_ERROR],
      minLength: [8, "Password must be at least 8 characters long"],
    },
    role: {
      type: String,
      required: [true, REQUIRED_FIELD_ERROR],
      enum: ["user", "promoter"],
      default: "user",
    },
    
  },
  {
    toObject: {
      virtuals: true
    }
  }
)

userSchema.virtual("applications", {
  ref: Application.modelName,
  foreignField: "user",
  localField: "_id",
  justOne: false
})

userSchema.virtual("bands", {
  ref: Band.modelName,
  foreignField: "owner",
  localField: "_id",
  justOne: false
})
userSchema.virtual("posts", {
  ref: Post.modelName,
  foreignField: "owner",
  localField: "_id",
  justOne: false
})


userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
      bcrypt.hash(this.password, SALT_ROUNDS)
        .then(hash => {
          this.password = hash;
          next();
        })
    } else {
      next();
    }
  })
  
  userSchema.methods.checkPassword = function(passwordToCompare) {
    return bcrypt.compare(passwordToCompare, this.password)
  }

const User = mongoose.model("User", userSchema);
module.exports = User;
