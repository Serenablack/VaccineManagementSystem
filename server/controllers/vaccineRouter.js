const vaccineRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Vaccine = require("../models/vaccine");
const User = require("../models/user");
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

vaccineRouter.get("/", async (req, res) => {
  let vaccine = await Vaccine.find({});
  res.send(vaccine);
});

vaccineRouter.post("/", async (req, res) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  } else {
    const user = await User.findById(decodedToken.id);
    // console.log(decodedToken.id);
    const vaccine = new Vaccine(req.body);
    if (!vaccine) {
      return res.status(400).json({
        error: "bad request",
      });
    }
    vaccine["user"] = user._id;
    const result = await vaccine.save();
    user.vaccines = user.vaccines.concat(result._id);
    await user.save();
    console.log(vaccine);

    res.send(vaccine);
  }
});

module.exports = vaccineRouter;
