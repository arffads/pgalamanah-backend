// // Assigning Admins to the variable Admin
// const db = require("../../models");
// const Classroom = db.models.classroom;
// const Teacher = db.models.teacher;
// const TeacherClass = db.models.teacher_class_relation;
// const makeResponse = require("../../middleware/response.js");

// const getClassByNip = async (req, res) => {
//   try {
//     const teacherClass = await TeacherClass.findAll({
//       where: {
//         nip: req.params.nip,
//       },
//       // include: ,
//     });
//     return makeResponse.success(res, teacherClass);
//   } catch (err) {
//     return makeResponse.failed(res, err);
//   }
// };

// const createTeacherClass = async (req, res) => {
//   try {
//     constfindClassroom = await Classroom.findAll({

//     })
//     const teacherClass = await TeacherClass.create({
//       nip: req.body.nip,
//       kode_kelas: req.body.kode_kelas
//     })

//     return makeResponse.success(res, teacherClass)
//   } catch (err) {
//     return makeResponse.failed(res, err)
//   }
// }

// module.exports = { getClassByNip, createTeacherClass };
