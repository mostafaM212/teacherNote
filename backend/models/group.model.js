const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema(
  {
    name: { required: true, type: String },
    appointments: [
      {
        day: { required: true, type: Number },
        time: { required: true, type: String },
      },
    ],

    stage: { required: true, type: String },
    gender: { type: String, enum: ["Male", "Female"], default: "Male" },
    period: { type: Number, default: 1 },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", GroupSchema);
