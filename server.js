// importing modules
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const adminRoutes = require('./src/App/admin/admin.routes');
const teacherRoutes = require('./src/App/teacher/teacher.routes');
const studentRoutes = require('./src/App/student/student.routes');
const classRoutes = require('./src/App/classroom/classroom.routes');
const categoryRoutes = require('./src/App/category_hafalan/category.routes');
const hafalanRoutes = require('./src/App/hafalan/hafalan.routes');
const detailRoutes = require('./src/App/perhafalan/perhafalan.routes');
const cors = require('cors');

// setting up your port
const HOST = process.env.DATABASE_HOST;
const PORT = process.env.DATABASE_PORT;

// assigning the variable app to express
const app = express();

// middleware
app.use(cors({
  origin: '*'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("files"));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});
app.use('/surat_img', express.static('surat_img'));

// app.post("/")
// routes for the user API
app.use('/api/admin', adminRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/class', classRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/hafalan', hafalanRoutes);
app.use('/api/detail-hafalan', detailRoutes);
// app.use("/api/teacher-class", teacherClassRoutes);

// listening to server connection
app.listen(PORT, () =>
/* eslint-disable no-console */
  console.log(`Server is connected on "http://${HOST}:${PORT}"`)
);
