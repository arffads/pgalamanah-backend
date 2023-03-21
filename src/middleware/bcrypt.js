const bcrypt = require("bcrypt");

const compareHash = async (payload, encrypted) => {
  try {
    const isMatch = await bcrypt.compare(payload, encrypted);
    return isMatch;
  } catch (error) {
    return error;
  }
};

const createHashPassword = async (payload) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(payload, salt);
    return hash;
  } catch (error) {
    return error;
  }
};

module.exports = { compareHash, createHashPassword };
