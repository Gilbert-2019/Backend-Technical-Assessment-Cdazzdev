const courseRoute = require("express").Router();
const asyncHandler = require("express-async-handler");
const Courses = require("../Models/CourseModel.js");

// Update Course
courseRoute.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, period, comment } = req.body;

    if (comment && comment.length === 0) {
      res.status(400);
      throw new Error("No Comments");
      return;
    } else {
      const course = new Courses({
        name,
        period,
        comment,
      });

      const createCourse = await course.save();
      //   res.status(200).json("Course Created");
      res.status(201).json(createCourse);
    }
  })
);

//Get All Course Detail
courseRoute.get("/", async (req, res) => {
  try {
    let courses;

    {
      courses = await Courses.find();
    }

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get single Course detail
courseRoute.get("/:id", asyncHandler(async (req, res) => {
    try {
        const courses = await Courses.findById(req.params.id);
      if (!courses) {
        res.status(404).json({ message: "course not found" });
        return;
      }
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }));

// Update Course
courseRoute.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const course = await Courses.findById(req.params.id);

    if (course) {
      course.name = req.body.name || course.name;
      course.period = req.body.period || course.period;
      course.comment = req.body.comment || course.comment;
      const updatedCourse = await course.save();
      res.json({
        _id: updatedCourse._id,
        name: updatedCourse.name,
        rating: updatedCourse.rating,
        comment: updatedCourse.comment,
        isAdmin: updatedCourse.isAdmin,
        createdAt: updatedCourse.createdAt,
      });
      //   res.status(200).json("Course Updated");
    } else {
      res.status(404);
      throw new Error("Course not found");
    }
  })
);

// DELETE Courses
courseRoute.delete("/:id", asyncHandler(async (req, res) => {
    try {
      const deletedCourse = await Courses.findByIdAndDelete(req.params.id);
      if (!deletedCourse) {
        res.status(404).json({ message: "Course not found" });
        return;
      }
      res.status(200).json({ message: "Course has been deleted" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }));

module.exports = courseRoute;
