// Assigning Admins to the variable Admin
const db = require('../../models');
const Classroom = db.models.classroom;
const Teacher = db.models.teacher;
const TeacherClass = db.models.teacher_class_relation;
const makeResponse = require('../../middleware/response.js');

const getClass = async (req, res) => {
  try {
    const classroom = await Classroom.findAll({
      attributes: ['kode_kelas', 'nama_kelas'],
      include: [
        {
          attributes: ['nip', 'fullName', 'alamat', 'gender'],
          model: Teacher,
          through: {
            attributes: ['id', 'nip', 'kode_kelas']
          }
        }
      ]
    });
    return makeResponse.success(res, classroom);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const getClassByNip = async (req, res) => {
  try {
    let status = {};

    if (req.params.status) {
      status = { status: req.params.status };
    }
    const teacher = await Classroom.findAll({
      attributes: ['kode_kelas', 'nama_kelas', 'status'],

      include: {
        attributes: ['nip', 'fullName', 'alamat', 'gender'],
        model: Teacher,
        where: {
          nip: req.params.nip,
          ...status
        }
      }
    });
    return makeResponse.success(res, teacher);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const createClass = async (req, res) => {
  try {
    const { kode_kelas, nama_kelas } = req.body;
    const findTeacher = await Teacher.findOne({
      where: {
        nip: req.body.nip
      }
    });

    if (findTeacher.nip === null) {
      return makeResponse.failed(res, {
        message: 'Cannot create class without nip'
      });
    }

    const classroom = await Classroom.create({
      kode_kelas,
      nama_kelas,
      status: 'ON_PROGRESS'
    });
    const classCode = classroom.kode_kelas;
    if (classCode !== null) {
      await TeacherClass.create({
        nip: findTeacher.nip,
        kode_kelas: classCode
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
        kode_kelas: req.params.kode_kelas
      }
    });
    return makeResponse.success(res, classroom);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const updateClassRoom = async (req, res) => {
  try {
    await Classroom.update(
      {
        status: req.body.status
      },
      {
        where: {
          kode_kelas: req.params.kode_kelas
        }
      }
    );
    return makeResponse.success(res, {
      status: req.body.status
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
        kode_kelas: req.params.kode_kelas
      }
    });
    return makeResponse.success(res, { message: 'Delete Success' });
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
  getClassByNip
};
