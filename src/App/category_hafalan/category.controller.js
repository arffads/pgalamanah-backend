//importing modules
// Assigning Admins to the variable Student
const db = require("../../models");
const Category = db.models.category_hafalan;
const makeResponse = require("../../middleware/response");

const getAllCategory = async (req, res) => {
  try {
    const category = await Category.findAll({
      attributes: ["id", "category_name"],
    });
    return makeResponse.success(res, category);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const addCategory = async (req, res) => {
  const { category_name } = req.body;
  try {
    const category = await Category.create({
      category_name: category_name,
    });
    // console.log(category, "<============");
    return makeResponse.success(res, category);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const deleteCategory = async (req, res) => {
  try {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    return makeResponse.success(res, { message: "Delete Success" });
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

module.exports = { getAllCategory, addCategory, deleteCategory };