const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  permissions: {
    type: Array,
    default: ["nosell"],
  },
  userRoll: {
    type: String,
    required: false,
    default: "user",
  },
});

module.exports = mongoose.model("user", UserSchema);
