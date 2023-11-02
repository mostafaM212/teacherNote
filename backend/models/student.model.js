const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
  {
    name: { required: true, type: String },
    phone: { required: true, type: String },
    paymentMethod: {
      enum: ["every lesson", "monthly"],
      type: String,
      default: "monthly",
    },
    price: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female"], default: "Male" },
    group: { type: mongoose.Types.ObjectId, required: true, ref: "Group" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
