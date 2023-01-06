// Assigning Admins to the variable Admin
const db = require("../../models");
const Classroom = db.models.classroom;
const ClassDetail = db.models.class_detail;
const Teacher = db.models.teacher;
const TeacherClass = db.models.teacher_class_relation;
const makeResponse = require("../../middleware/response.js");

const getClass = async (req, res) => {
  try {
    const classroom = await Classroom.findAll({
      attributes: ["kode_kelas", "nama_kelas"],
      include: [
        {
          attributes: ["nip", "fullName", "alamat", "gender"],
          model: Teacher,
          through: {
            attributes: ["id", "nip", "kode_kelas"],
          },
        },
      ],
    });
    return makeResponse.success(res, classroom);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const getClassByNip = async (req, res) => {
  try {
    const classroom = await Classroom.findAll({
      attributes: ["kode_kelas", "nama_kelas"],
      include: [
        {
          attributes: ["nip", "fullName", "alamat", "gender"],
          model: Teacher,
          through: {
            attributes: ["id", "nip", "kode_kelas"],
            where: {
              nip: req.params.nip,
            },
          },
        },
      ],
    });
    return makeResponse.success(res, classroom);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const createClass = async (req, res) => {
  try {
    const { kode_kelas, nama_kelas } = req.body;
    const findTeacher = await Teacher.findOne({
      where: {
        nip: req.body.nip,
      },
    });

    if (findTeacher.nip === null) {
      return makeResponse.failed(res, {
        message: "Cannot create class without nip",
      });
    }

    const classroom = await Classroom.create({
      kode_kelas: kode_kelas,
      nama_kelas: nama_kelas,
    });
    let classCode = classroom.kode_kelas;
    if (classCode !== null) {
      await TeacherClass.create({
        nip: findTeacher.nip,
        kode_kelas: classCode,
      });
    }

    return makeResponse.success(res, classroom);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const findClassByClassCode = async (req, res) => {
  try {
    // TODO
    const classroom = await Classroom.findOne({
      where: {
        kode_kelas: req.params.kode_kelas,
      },
    });
    return makeResponse.success(res, classroom);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const updateClassRoom = async (req, res) => {
  try {
    // TODO
    const { kode_kelas, nama_kelas } = req.body;
    await Classroom.update({
      kode_kelas: kode_kelas,
      nama_kelas: nama_kelas,
    });
    return makeResponse.success(res, {
      kode_kelas: kode_kelas,
      nama_kelas: nama_kelas,
    });
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const deleteClassRoom = async (req, res) => {
  try {
    // TODO
    await Classroom.destroy({
      where: {
        kode_kelas: req.params.kode_kelas,
      },
    });
    return makeResponse.success(res, { message: "Delete Success" });
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

module.exports = {
  getClass,
  createClass,
  findClassByClassCode,
  updateClassRoom,
  deleteClassRoom,
  getClassByNip,
};
