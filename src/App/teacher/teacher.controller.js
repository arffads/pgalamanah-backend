// importing modules
// Assigning Admins to the variable Admin
const db = require('../../models');
const Teacher = db.models.teacher;
const makeResponse = require('../../middleware/response.js');
const { createToken } = require('../../middleware/token');
const { createHashPassword, compareHash } = require('../../middleware/bcrypt');

const getTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findAll({
      attributes: ['nip', 'fullName', 'gender', 'alamat']
    });
    return makeResponse.success(res, teacher);
  } catch (error) {
    return makeResponse.failed(res, error);
  }
};

const registerTeacher = async (req, res) => {
  const { nip, fullName, alamat, gender, password } = req.body;
  const hashedPassword = await createHashPassword(password);
  if (hashedPassword instanceof Error) throw hashedPassword;
  try {
    const teacher = await Teacher.create({
      nip,
      fullName,
      alamat,
      gender,
      password: hashedPassword
    });
    return makeResponse.success(res, teacher);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const signInTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findAll({
      where: {
        nip: req.body.nip
      }
    });
    const isMatch = await compareHash(req.body.password, teacher[0].password);
    if (!isMatch) {
      return makeResponse.failed(res, { message: 'Password Salah' });
    }
    const teacherName = teacher[0].fullName;
    const nip = teacher[0].nip;
    const accessToken = createToken({ teacherName, nip });
    return makeResponse.success(res, {
      token: accessToken,
      name: teacherName,
      nip
    });
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const findTeacherByNip = async (req, res) => {
  try {
    // TODO
    const teacher = await Teacher.findOne({
      where: {
        nip: req.params.nip
      }
    });
    if (teacher === null) {
      return makeResponse.failed(res, { message: 'Teacher Not Found' });
    }
    return makeResponse.success(res, teacher);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const updateTeacher = async (req, res) => {
  try {
    // TODO
    const teacher = await Teacher.update(
      {
        fullName: req.body.fullName,
        alamat: req.body.alamat,
        gender: req.body.gender,
        password: req.body.password
      },
      {
        where: {
          nip: req.params.nip
        }
      }
    );
    return makeResponse.success(res, teacher);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const deleteTeacher = async (req, res) => {
  try {
    // TODO
    await Teacher.destroy({
      where: {
        nip: req.params.nip
      }
    });
    return makeResponse.success(res, { message: 'Delete Success' });
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

module.exports = {
  getTeacher,
  registerTeacher,
  signInTeacher,
  findTeacherByNip,
  updateTeacher,
  deleteTeacher
};
