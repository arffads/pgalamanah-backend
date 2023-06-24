const success = (res, data) =>
  res.send({ data, status_code: 200, message: "SUCCESS", success: true });
const failed = (res, error) =>
  res.send({ error, status_code: 500, message: error.message, success: false });
// const failed = (res, type, )

module.exports = { success, failed };
