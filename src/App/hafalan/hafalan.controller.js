//importing modules
// Assigning Admins to the variable Student
const db = require("../../models");
const Hafalan = db.models.hafalan;
const DetailHafalan = db.models.detail_hafalan;
const Student = db.models.student;
const makeResponse = require("../../middleware/response");
const fs = require("fs");

const getAllHafalan = async (req, res) => {
  try {
    const hafalan = await Hafalan.findAll({
      attributes: ["id", "title", "media_reader", "category_id"],
    });
    return makeResponse.success(res, hafalan);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const getHafalanByNis = async (req, res) => {
  try {
    const findStudent = await Student.findOne({
      where: {
        nis: req.params.nis,
      },
    });

    if (findStudent === null) {
      return makeResponse.failed(res, { message: "Unregistered Student" });
    }
    const hafalan = await Hafalan.findAll({
      attributes: ["id", "title", "media_reader", "category_id"],
    });
    return makeResponse.success(res, hafalan);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const addHafalan = async (req, res) => {
  try {
    if (req.file) {
      const uploadImg = await fs.rename(
        req.file.path,
        `public/surat_img${req.file.originalname}`,
        (err) => {
          if (err) throw err;
        }
      );
    }
    const hafalan = await Hafalan.create({
      title: req.body.title,
      image_media: req.file.originalname,
      media_reader: req.body.media_reader,
      category_id: req.body.category_id,
    });
    return makeResponse.success(res, hafalan);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const getHafalanByCategoryId = async (req, res) => {
  try {
    // TODO
    const hafalan = await Hafalan.findAll({
      where: {
        category_id: req.params.category_id,
      },
    });
    return makeResponse.success(res, hafalan);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const getHafalanById = async (req, res) => {
  try {
    // TODO
    const hafalan = await Hafalan.findAll({
      where: {
        id: req.params.id,
      },
    });
    return makeResponse.success(res, hafalan);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const updateHafalan = async (req, res) => {
  try {
    const { title, media_reader, category_id } = req.body;
    await Hafalan.update(
      {
        title: title,
        media_reader: media_reader,
        category_id: category_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return makeResponse.success(res, {
      title: title,
      media_reader: media_reader,
      category_id: category_id,
    });
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const deleteHafalan = async (req, res) => {
  try {
    await Hafalan.destroy({
      where: {
        id: req.params.id,
      },
    });
    return makeResponse.success(res, { message: "Delete Success" });
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

module.exports = {
  getAllHafalan,
  addHafalan,
  getHafalanByCategoryId,
  updateHafalan,
  deleteHafalan,
  getHafalanById,
  getHafalanByNis,
};
