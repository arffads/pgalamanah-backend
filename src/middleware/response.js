const success = (res, data) =>
  res.send({ data, status_code: 200, message: "SUCCESS", success: true });
const failed = (res, err) =>
  res.send({ err, status_code: 500, message: err.message, success: false });
// const failed = (res, type, )

module.exports = { success, failed };
