const mongoose = require("mongoose");

const CoursesSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    period: { type: Number, required: true },
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

module.exports = mongoose.model("Courses", CoursesSchema);
