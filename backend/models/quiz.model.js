const mongoose = require("mongoose");

const QuizSchema = mongoose.Schema(
  {
    student: { type: mongoose.Types.ObjectId, required: true, ref: "Student" },
    total: { type: Number, required: true },
    degree: { type: Number, required: true },
    percentage: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", QuizSchema);
