const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: { // Add the 'email' property
      type: String,
      required: true, // You can set this to true if email is required
      unique: true, // You can set this to true if email should be unique
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
