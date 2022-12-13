// Assigning Admins to the variable Admin
const db = require("../../models");
const ClassRoom = db.models.classRoom;
const ClassDetail = db.models.class_detail;
const makeResponse = require("../../middleware/response.js");

const getClass = async (req, res) => {
  try {
    const classroom = await ClassRoom.findAll({
      attributes: ["kode_kelas", "nama_kelas"],
    });
    return makeResponse.success(res, classroom);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const createClass = async (req, res) => {
  const { kode_kelas, nama_kelas, teacherClassRelationId } = req.body;
  try {
    const classroom = await ClassRoom.create({
      kode_kelas: kode_kelas,
      nama_kelas: nama_kelas,
      teacherClassRelationId: teacherClassRelationId,
    });
    const classCode = classroom.kode_kelas;
    await ClassDetail.create({
      kode_kelas: classCode,
    });
    return makeResponse.success(res, classroom);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const findClassByClassCode = async (req, res) => {
  try {
    // TODO
    const classroom = await ClassRoom.findOne({
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
    await ClassRoom.update({
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
    await ClassRoom.destroy({
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
};
