const fs = require("fs");

const audioSave = async (req, res) => {
  try {
    if (req.files.hasOwnProperty("record")) {
      const uploadAudio = await fs.rename(
        req.files["record"].path,
        `../public/audio/${req.files["record"].name}`,
        (err) => {
          if (err) throw err;
        }
      );
    }
  } catch (err) {
    return makeResponse.success(res, err);
  }
};

module.exports = audioSave;
