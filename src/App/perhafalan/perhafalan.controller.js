//importing modules
// Assigning Admins to the variable Student
const db = require("../../models");
const DetailHafalan = db.models.detail_hafalan;
const makeResponse = require("../../middleware/response");
const Hafalan = db.models.hafalan;
const fs = require("fs");

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
    let nis = {};
    if (req.params.nis) {
      nis = { nis: req.params.nis };
    }
    if (req.file) {
      const uploadAudio = await fs.rename(
        req.file.path,
        `public/audio/${req.file.originalname}`,
        (err) => {
          if (err) throw err;
        }
      );
    }

    const postHafalan = await DetailHafalan.create(
      {
        record: req.file.originalname,
        nis: req.body.nis,
        hafalan_id: req.body.hafalan_id,
      },
      {
        where: {
          id: req.params.id,
          ...nis,
        },
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
        ...nis,
      },
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
        nis: req.params.nis,
      },
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
        grade: req.body.grade,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return makeResponse.success(res, {
      grade: req.body.grade,
    });
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const deletePerhafalan = async (req, res) => {
  try {
    await DetailHafalan.destroy({
      where: {
        id: req.params.nis,
      },
    });
    return makeResponse.success(res, { message: "Delete Perhafalan Success" });
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
  deletePerhafalan,
};
