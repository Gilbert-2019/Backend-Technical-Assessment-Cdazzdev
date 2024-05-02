const mongoose = require("mongoose");

const userenrollmentSchema = mongoose.Schema(
    {
      enroll: { type: String, required: true },
      comment: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

  module.exports = mongoose.model("UserEnrollment", userenrollmentSchema);