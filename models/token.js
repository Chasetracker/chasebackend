const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200
}
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = { Token }