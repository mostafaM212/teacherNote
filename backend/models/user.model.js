const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    name: { type: String, required: true },
    photo: { type: String, required: true },
    type: {
      type: String,
      enum: ["Customer", "Teacher", "Admin", "Gest"],
      default: "Gest",
    },
    // carts: { type: Number, default: 0 },
  },
  { timestamps: true }
);
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
