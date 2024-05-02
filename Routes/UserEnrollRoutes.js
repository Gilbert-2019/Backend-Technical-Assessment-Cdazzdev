const userenrollmentRoute = require("express").Router();
const asyncHandler = require("express-async-handler");
const UserEnrollment = require("../Models/UserEnrollModel.js");
const protect = require("../Middleware/AuthMiddleware.js");

// Create a new enrollment
userenrollmentRoute.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { enroll, comment } = req.body;

    try {
      // Check if enrollment already exists
      const enrollmentExists = await UserEnrollment.findOne({ enroll });
      if (enrollmentExists) {
        return res.status(400).json({ message: "Already Submitted" });
      }

      // Create new enrollment
      const newuserEnrollment = new UserEnrollment({
        enroll,
        comment,
      });
      const createduserEnrollment = await newuserEnrollment.save();

      res.status(201).json(createduserEnrollment);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  })
);

// Get All Enrollments
userenrollmentRoute.get("/", async (req, res) => {
  try {
    const userenrollments = await UserEnrollment.find();
    res.status(200).json(userenrollments);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Update Enrollment
userenrollmentRoute.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    try {
      const userenrollment = await UserEnrollment.findById(req.params.id);
      if (!userenrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
      }

      userenrollment.enroll = req.body.enroll || userenrollment.enroll;
      userenrollment.comment = req.body.comment || userenrollment.comment;

      const updatedUserEnrollment = await userenrollment.save();

      res.status(200).json(updatedUserEnrollment);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  })
);

module.exports = userenrollmentRoute;
