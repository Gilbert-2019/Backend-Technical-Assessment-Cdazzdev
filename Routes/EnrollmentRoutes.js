const enrollmentRoute = require("express").Router();
const asyncHandler = require("express-async-handler");
const Enrollment = require("../Models/EnrollmentModels.js");

// Create a new enrollment
enrollmentRoute.post(
  "/",
  asyncHandler(async (req, res) => {
    const { student, field, period, enrollment, comment } = req.body;

    try {
      const newEnrollment = new Enrollment({
        student,
        field,
        period,
        enrollment,
        comment,
      });
      const createdEnrollment = await newEnrollment.save();

      res.status(201).json(createdEnrollment);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  })
);

//Get All Enrollments Detail
enrollmentRoute.get("/", async (req, res) => {
  try {
    let enrollments;

    {
      enrollments = await Enrollment.find();
    }

    res.status(200).json(enrollments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get single Enrollments detail
enrollmentRoute.get("/:id", asyncHandler(async (req, res) => {
    try {
        const enrollments = await Enrollment.findById(req.params.id);
      if (!enrollments) {
        res.status(404).json({ message: "enrollment not found" });
        return;
      }
      res.status(200).json(enrollments);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }));

// Update Enrollments
enrollmentRoute.put(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const enrollment = await Enrollment.findById(req.params.id);
      if (!enrollment) {
        res.status(404).json({ message: "Enrollment not found" });
        return;
      }

      enrollment.student = req.body.student || enrollment.student;
      enrollment.field = req.body.field || enrollment.field;
      enrollment.period = req.body.period || enrollment.period;
      enrollment.enrollment = req.body.enrollment || enrollment.enrollment;
      enrollment.comment = req.body.comment || enrollment.comment;

      const updatedEnrollment = await enrollment.save();

      res.status(200).json(updatedEnrollment);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  })
);

// DELETE Enrollment
enrollmentRoute.delete("/:id", asyncHandler(async (req, res) => {
    try {
      const deletedEnrollment = await Enrollment.findByIdAndDelete(req.params.id);
      if (!deletedEnrollment) {
        res.status(404).json({ message: "Enrollment not found" });
        return;
      }
      res.status(200).json({ message: "Enrollment has been deleted" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }));

module.exports = enrollmentRoute;
