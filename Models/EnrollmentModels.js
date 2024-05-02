const mongoose = require("mongoose");

const EnrollmentSchema = mongoose.Schema(
  {
    student: { type: String, required: true },
    field: { type: String, required: true },
    period: { type: Number, required: true },
    enrollment: { type: String, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Enrollment", EnrollmentSchema);
