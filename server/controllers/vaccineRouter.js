const vaccineRouter = require("express").Router();

const cloudinary = require("../utils/cloudinary");
const uploader = require("../utils/multer");

vaccineRouter.post("/upload", uploader.single("file"), async (req, res) => {
  const upload = await cloudinary.v2.uploader.upload(req.file.path, {
    folder: "vaccines",
  });
  return res.json({
    success: true,
    file: upload.secure_url,
  });
});

module.exports = vaccineRouter;
