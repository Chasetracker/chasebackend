const crypto = require("crypto");
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const {Token} = require('./token');


const userSchema = Schema({
    business_name: {
        type: String,
        required: [true, "please provide your firstName"]
    },

    email: {
        type: String,
        lowercase: true,
        required: [true, "email is required"],
        unique: [true, "email has already been registered"]
    },

    password: {
        type: String,
        required: [true, " password is required"],
        minlength: [8, "minimum password length is 8"],
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false
    },
    image: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now()
    }
})

userSchema.methods.generateAuthToken = async () => {
    user = this
    const token = jwt.sign({ user_id: user._id.toString() }, "user token")

    return token
}


userSchema.methods.generateVerificationToken = function() {
  let payload = {
      userId: this._id,
      token: crypto.randomInt(0, 9999).toString().padStart(4, 10)
  };

  return new Token(payload);
};



const User = mongoose.model("User", userSchema)

module.exports = { User }