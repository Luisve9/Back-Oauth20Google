const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type:String,
      required: [true, "Debes mandar un email"],
    },
    googleID:String
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);