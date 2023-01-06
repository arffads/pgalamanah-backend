const db = require("../models/index");
const Teacher = db.models.teacher;
const Admin = db.models.admin;
const Student = db.models.student;
const Classroom = db.models.classroom;

// Check Admin Username Before Create new Admin
const checkDuplicateUsernameAdmin = async (req, res, next) => {
  // Username
  await Admin.findOne({
    where: {
      username: req.body.username,
    },
  }).then((admin) => {
    if (admin) {
      res.status(400).send({
        err: {},
        status_code: 400,
        message: "Failed! Username is already in use!",
        success: false,
      });
    }
  });
  next();
};
// Check Teacher Nip Before Create new Teacher
const checkDuplicateUsernameTeacher = (req, res, next) => {
  Teacher.findOne({
    where: {
      nip: req.body.nip,
    },
  }).then((teacher) => {
    if (teacher) {
      return res.status(400).send({
        err: {},
        status_code: 400,
        message: "Failed! Nip is already in use!",
        success: false,
      });
    }
  });
  next();
};
//Check Student Nis Before Create new Student
const checkDuplicateUsernameStudent = (req, res, next) => {
  Student.findOne({
    where: {
      nis: req.body.nis,
    },
  }).then((student) => {
    if (student) {
      return res.status(400).send({
        err: {},
        status_code: 400,
        message: "Failed! Nis is already in use!",
        success: false,
      });
    }
  });
  next();
};

//Check Student Nis Before Create new Student
const checkDuplicateClassroom = (req, res, next) => {
  Classroom.findOne({
    where: {
      kode_kelas: req.body.kode_kelas,
    },
  }).then((classroom) => {
    if (classroom) {
      return res.status(400).send({
        err: {},
        status_code: 400,
        message: "Failed! Class is already in use!",
        success: false,
      });
    }
  });
  next();
};

module.exports = {
  checkDuplicateUsernameAdmin,
  checkDuplicateUsernameTeacher,
  checkDuplicateUsernameStudent,
  checkDuplicateClassroom,
};
