// importing modules
// Assigning Admins to the variable Admin
const db = require('../../models');
const Admin = db.models.admin;
const makeResponse = require('../../middleware/response');
const { createToken } = require('../../middleware/token.js');
const {
  createHashPassword,
  compareHash
} = require('../../middleware/bcrypt.js');

const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findAll();
    return makeResponse.success(res, admin);
  } catch (err) {
    return makeResponse.failed(res, err);
  }
};

const registerAdmin = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await createHashPassword(password);
  if (hashedPassword instanceof Error) throw hashedPassword;
  try {
    const admin = await Admin.create({
      username,
      password: hashedPassword
    });
    return makeResponse.success(res, admin);
  } catch (error) {
    return makeResponse.failed(res, error);
  }
};

const signInAdmin = async (req, res) => {
  try {
    const admin = await Admin.findAll({
      where: {
        username: req.body.username
      }
    });
    const isMatch = await compareHash(req.body.password, admin[0].password);
    if (!isMatch) return res.send({ msg: 'Password Salah' });
    const adminId = admin[0].id;
    const username = admin[0].username;
    const accessToken = createToken({ adminId, username });
    return makeResponse.success(res, {
      token: accessToken,
      id: adminId,
      username
    });
  } catch (error) {
    return makeResponse.failed(res, error);
  }
};

module.exports = {
  getAdmin,
  registerAdmin,
  signInAdmin
};
