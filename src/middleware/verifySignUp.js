const db = require("../models/index");
const Teacher = db.models.teacher;
const Admin = db.models.admin;
const Student = db.models.student;
const ClassRoom = db.models.classRoom;

// console.log(db, "wwqqwqqwqwqq");
// Check Admin Username Before Create new Admin
const checkDuplicateUsernameAdmin = async (req, res, next) => {
  // Username
  await Admin.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((admin) => {
      if (admin) {
        res.status(400).send({
          message: "Failed! Username is already in use!",
        });
        return;
      }
    })
    .catch((err) => {
      console.log(err, "Error");
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
      res.status(400).send({
        message: "Failed! Nip is already in use!",
      });
      return;
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
      res.status(400).send({
        message: "Failed! Nip is already in use!",
      });
      return;
    }
  });
  next();
};

//Check Student Nis Before Create new Student
const checkDuplicateClassRoom = (req, res, next) => {
  ClassRoom.findOne({
    where: {
      kode_kelas: req.body.kode_kelas,
    },
  }).then((classRoom) => {
    if (classRoom) {
      res.status(400).send({
        message: "Failed! Nip is already in use!",
      });
      return;
    }
  });
  next();
};

module.exports = {
  checkDuplicateUsernameAdmin,
  checkDuplicateUsernameTeacher,
  checkDuplicateUsernameStudent,
  checkDuplicateClassRoom,
};
