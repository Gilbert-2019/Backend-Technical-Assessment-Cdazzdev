
const express = require("express");
const dotenv = require("dotenv");

const connectDatabase = require("./configDB/MongoDB.js");
const products = require("./data/Products.js");
const ImportData = require("./DataManualImport.js");
const courseRoute = require("./Routes/CourseRoutes.js");
const studentRoute = require("./Routes/StudentsRoutes.js");
const enrollmentRoute = require("./Routes/EnrollmentRoutes.js");
const userRoute = require("./Routes/UserRoutes.js");
const userenrollmentRoute = require("./Routes/UserEnrollRoutes.js");




dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());
express.urlencoded({extended:true});


// API
app.use("/api/import", ImportData);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/student", studentRoute);
app.use("/api/v1/enrollment", enrollmentRoute);
app.use("/api/v1/userenrollment", userenrollmentRoute);

// ERROR HANDLER


const PORT = process.env.PORT || 1000;
app.listen(PORT, console.log(`server run in port ${PORT}`));
