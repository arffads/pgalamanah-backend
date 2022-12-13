const jwt = require("jsonwebtoken");
const { secret } = require("../config/auth.config");

const createToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: "12h" });
};

const verifyToken = (req, res, next) => {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];
  if (token == null) return res.status(401);
  jwt.verify(token, secret, (err, decoded) => {
    req.adminID = decoded.adminId;
    req.username = decoded.username;
    next();
  });
};

const verifyTokenStudent = (req, res, next) => {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];
  if (token == null) return res.status(401);
  jwt.verify(token, secret, (err, decoded) => {
    req.nis = decoded.nis;
    next();
  });
};

const verifyTokenTeacher = (req, res, next) => {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];
  if (token == null) return res.status(401);
  jwt.verify(token, secret, (err, decoded) => {
    req.nip = decoded.nip;
    next();
  });
};

module.exports = {
  verifyToken,
  verifyTokenStudent,
  verifyTokenTeacher,
  createToken,
};
