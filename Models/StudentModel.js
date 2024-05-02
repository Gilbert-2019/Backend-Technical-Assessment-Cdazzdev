const mongoose = require("mongoose");

const enrollmentSchema = mongoose.Schema(
    {
      field: { type: String, required: true },
      project: { type: Number, required: true },
      comment: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

const studentSchema = mongoose.Schema(
  {
    student: { type: String, required: true },
    course: { type: String, required: true },
    faculty: { type: String, required: true },
    enrollment: [enrollmentSchema],
    period: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);
