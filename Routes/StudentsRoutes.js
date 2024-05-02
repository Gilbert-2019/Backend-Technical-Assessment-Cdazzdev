const studentRoute = require("express").Router();
const asyncHandler = require("express-async-handler");
const Student = require("../Models/StudentModel.js");

// Add Student
studentRoute.post(
  "/",
  asyncHandler(async (req, res) => {
    const { student, course, faculty, period, comment, enrollments } = req.body;

    try {
      const newStudent = new Student({
        student,
        course,
        faculty,
        period,
        comment,
        enrollment: enrollments,
      });

      const createdStudent = await newStudent.save();

      res.status(201).json(createdStudent); // Return the created student document in the response
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  })
);

//Get All Student Detail
studentRoute.get("/", async (req, res) => {
  try {
    let students;

    {
      students = await Student.find();
    }

    res.status(200).json(students);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get single Student detail
studentRoute.get("/:id", asyncHandler(async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) {
        res.status(404).json({ message: "Student not found" });
        return;
      }
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }));

// Update Student
studentRoute.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const studentId = req.params.id;
    const { student, course, faculty, period, comment, enrollments } = req.body;

    try {
      const existingStudent = await Student.findById(studentId);

      if (!existingStudent) {
        res.status(404).json({ message: "Student not found" });
        return;
      }
      existingStudent.student = student || existingStudent.student;
      existingStudent.course = course || existingStudent.course;
      existingStudent.faculty = faculty || existingStudent.faculty;
      existingStudent.period = period || existingStudent.period;
      existingStudent.comment = comment || existingStudent.comment;
      existingStudent.enrollment = enrollments || existingStudent.enrollment;

      const updatedStudent = await existingStudent.save();

      res.status(200).json(updatedStudent);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  })
);

// DELETE Student
studentRoute.delete("/:id", asyncHandler(async (req, res) => {
    try {
      const deletedStudent = await Student.findByIdAndDelete(req.params.id);
      if (!deletedStudent) {
        res.status(404).json({ message: "Student not found" });
        return;
      }
      res.status(200).json({ message: "Student has been deleted" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }));

module.exports = studentRoute;
