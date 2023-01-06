//importing modules
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const adminRoutes = require("./src/App/admin/admin.routes");
const teacherRoutes = require("./src/App/teacher/teacher.routes");
const studentRoutes = require("./src/App/student/student.routes");
const classRoutes = require("./src/App/classroom/classroom.routes");
const categoryRoutes = require("./src/App/category_hafalan/category.routes");
const hafalanRoutes = require("./src/App/hafalan/hafalan.routes");
const detailRoutes = require("./src/App/perhafalan/perhafalan.routes");
const teacherClassRoutes = require("./src/App/teacher_relation/teacher_class_relation.routes");

//setting up your port
const PORT = process.env.PORT || 8000;

//assigning the variable app to express
const app = express();

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("files"));

// app.post("/")
//routes for the user API
app.use("/api/admin", adminRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/class", classRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/hafalan", hafalanRoutes);
app.use("/api/detail-hafalan", detailRoutes);
// app.use("/api/teacher-class", teacherClassRoutes);

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
