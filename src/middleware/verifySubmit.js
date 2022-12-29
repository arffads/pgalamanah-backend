const db = require("../models/index");
const DetailHafalan = db.models.detail_hafalan;

const verifySubmit = async (req, res, next) => {
  await DetailHafalan.findOne({
    where: {
      nis: req.body.nis,
      hafalan_id: req.body.hafalan_id,
    },
  })
    .then((exist) => {
      if (exist) {
        res.status(400).send({
          message: "Failed to submit, data is exist!",
        });
      }
    })
    .catch((err) => {
      console.log(err, "Error");
    });
};

module.exports = { verifySubmit };
