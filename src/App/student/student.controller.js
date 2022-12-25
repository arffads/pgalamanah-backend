//importing modules
// Assigning Admins to the variable Student
const db = require("../../models");
const Student = db.models.student;
const DetailHafalan = db.models.detail_hafalan;
const makeResponse = require("../../middleware/response");
const { createToken } = require("../../middleware/token");
const { createHashPassword, compareHash } = require("../../middleware/bcrypt");

// Get All Student Was Registered
const getStudent = async (req, res) => {
  try {
    const student = await Student.findAll({
      attributes: ["nis", "fullName", "gender", "alamat", "classDetailId"],
    });
    return makeResponse.success(res, student);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

// Create New Student
const registerStudent = async (req, res) => {
  const { nis, fullName, alamat, gender, password, classDetailId } = req.body;
  const hashedPassword = await createHashPassword(password);
  if (hashedPassword instanceof Error) throw hashedPassword;
  try {
    const student = await Student.create({
      nis: nis,
      fullName: fullName,
      alamat: alamat,
      gender: gender,
      password: hashedPassword,
      classDetailId: classDetailId,
    });
    return makeResponse.success(res, student);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

// Sign In Student
const signInStudent = async (req, res) => {
  try {
    const student = await Student.findAll({
      where: {
        nis: req.body.nis,
      },
    });
    const isMatch = await compareHash(req.body.password, student[0].password);
    if (!isMatch) {
      return makeResponse.failed(res, { message: "Password Salah" });
    }
    const studentName = student[0].fullName;
    const nis = student[0].nis;
    const accessToken = createToken({ studentName, nis });
    return makeResponse.success(res, {
      token: accessToken,
      name: studentName,
      nis: nis,
    });
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

// Find Student By Nomor Induk Siswa
const findStudentByNis = async (req, res) => {
  try {
    // TODO
    const student = await Student.findOne({
      where: {
        nis: req.params.nis,
      },
    });
    if (student === null) {
      return makeResponse.failed(res, { message: "NIS Student Not found" });
    }
    return makeResponse.success(res, student);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

// Update Student
const updateStudent = async (req, res) => {
  try {
    // TODO
    const student = await Student.update(
      {
        fullName: req.body.fullName,
        alamat: req.body.alamat,
        gender: req.body.gender,
        password: req.body.password,
        classDetailId: req.body.classDetailId,
      },
      {
        where: { nis: req.params.nis },
      }
    );
    return makeResponse.success(res, student);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

// Delete Student
const deleteStudent = async (req, res) => {
  try {
    // TODO
    await Student.destroy({
      where: {
        nis: req.params.nis,
      },
    });
    return makeResponse.success(res, { message: "Student Delete Success" });
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

module.exports = {
  getStudent,
  registerStudent,
  signInStudent,
  findStudentByNis,
  updateStudent,
  deleteStudent,
};
