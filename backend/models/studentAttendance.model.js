const mongoose = require("mongoose");

const StudentAttendanceSchema = mongoose.Schema(
  {
    student: { type: mongoose.Types.ObjectId, required: true, ref: "Student" },
    group: { type: mongoose.Types.ObjectId, required: true, ref: "Group" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudentAttendance", StudentAttendanceSchema);
