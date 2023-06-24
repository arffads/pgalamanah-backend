// importing modules
// Assigning Admins to the variable Student
const db = require('../../models');
const DetailHafalan = db.models.detail_hafalan;
const Student = db.models.student;
const makeResponse = require('../../middleware/response');
const fs = require('fs');

const getAllPerhafalan = async (req, res) => {
  try {
    const perhafalan = await DetailHafalan.findAll();
    return makeResponse.success(res, perhafalan);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const studentPostPerhafalan = async (req, res) => {
  try {
    const findStudent = await Student.findOne({
      where: {
        nis: req.body.nis
      }
    });

    if (findStudent === null) {
      return makeResponse.failed(res, { message: 'Student Unregistered!' });
    }
    const findHafalan = await DetailHafalan.findOne({
      where: {
        nis: req.body.nis,
        hafalan_id: req.body.hafalan_id
      }
    });

    if (findHafalan !== null) {
      return makeResponse.failed(res, {
        message: 'Failed to submit, Data is Exist!'
      });
    }

    let nis = {};
    if (req.params.nis) {
      nis = { nis: req.params.nis };
    }
    let newFilename = req.file.originalname;
    if (req.file) {
      newFilename = `${req.body.hafalan_id}_${req.body.nis}_${newFilename}`;
      const uploadAudio = await fs.rename(
        req.file.path,
        `public/audio/${newFilename}`,
        (err) => {
          if (err) throw err;
        }
      );
    }

    const postHafalan = await DetailHafalan.create(
      {
        record: newFilename,
        nis: req.body.nis,
        hafalan_id: req.body.hafalan_id
      },
      {
        where: {
          id: req.params.id,
          ...nis
        }
      }
    );

    return makeResponse.success(res, postHafalan);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const findPerhafalanById = async (req, res) => {
  try {
    let nis = {};
    if (req.params.nis) {
      nis = { nis: req.params.nis };
    }
    const perhafalan = await DetailHafalan.findOne({
      where: {
        hafalan_id: req.params.hafalan_id,
        ...nis
      }
    });
    return makeResponse.success(res, perhafalan);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const findPerhafalanByStudentNis = async (req, res) => {
  try {
    const perhafalan = await DetailHafalan.findAll({
      where: {
        nis: req.params.nis
      }
    });

    return makeResponse.success(res, perhafalan);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const updatePerhafalanByTeacher = async (req, res) => {
  try {
    await DetailHafalan.update(
      {
        grade: req.body.grade
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    return makeResponse.success(res, {
      grade: req.body.grade
    });
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const deletePerhafalan = async (req, res) => {
  try {
    await DetailHafalan.destroy({
      where: {
        id: req.params.nis
      }
    });
    return makeResponse.success(res, { message: 'Delete Perhafalan Success' });
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

module.exports = {
  studentPostPerhafalan,
  getAllPerhafalan,
  findPerhafalanById,
  findPerhafalanByStudentNis,
  updatePerhafalanByTeacher,
  deletePerhafalan
};
