const db = require("../models/index");
const Teacher = db.models.teacher;
const Admin = db.models.admin;
const Student = db.models.student;
const Classroom = db.models.classroom;
const makeResponse = require("./response")

// Check Admin Username Before Create new Admin
const checkDuplicateUsernameAdmin = async (req, res, next) => {
    const findAdmin =  await Admin.findOne({ where: { username: req.body.username}})

    if (findAdmin) {
      return res.status(400).json({
        message: "Failed! Username is already in use!",
        success: false,
      })
    }
  next();
};
// Check Teacher Nip Before Create new Teacher
const checkDuplicateUsernameTeacher = async (req, res, next) => {
  const findTeacher = await Teacher.findOne({ where: { nip: req.body.nip}})

    if (findTeacher) {
      return res.status(400).json({
        message: "Failed! Username is already in use!",
        success: false,
      })
    }
  next();
};
//Check Student Nis Before Create new Student
const checkDuplicateUsernameStudent = async (req, res, next) => {
  const findStudent =  await Student.findOne({ where: { nis: req.body.nis}})

    if (findStudent) {
      return res.status(400).json({
        message: "Failed! Username is already in use!",
        success: false,
      })
    }
  next();
};

//Check Student Nis Before Create new Student
const checkDuplicateClassroom = async (req, res, next) => {
    const findClassroom =  await Classroom.findOne({ where: { kode_kelas: req.body.kode_kelas}})
  
      if (findClassroom) {
        return res.status(400).json({
          message: "Failed! Username is already in use!",
          success: false,
        })
      }
    next();
};

module.exports = {
  checkDuplicateUsernameAdmin,
  checkDuplicateUsernameTeacher,
  checkDuplicateUsernameStudent,
  checkDuplicateClassroom,
};
