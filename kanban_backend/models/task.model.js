const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["todo", "ticket", "progress", "complete"],
      default: "ticket",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tasks", taskSchema);
