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
  const token = req.token;

  const decodedToken = jwt.verify(token, process.env.SECRET);

  let vaccine = await Vaccine.find({});
  // const isVac = vaccine.user?.includes
  if (decodedToken.id) {
    // if (vaccine.user?.length !== 0) {
    res.send(vaccine);
  }
  // } else {
  //   res.send([]);
  // }
});

vaccineRouter.get("/:id", async (req, res, next) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  try {
    if (decodedToken.id) {
      let vaccine = await Vaccine.findById(req.params.id);
      res.send(vaccine);
    }
  } catch (error) {
    next(error);
  }
});

vaccineRouter.post("/", async (req, res, next) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  try {
    if (!decodedToken.id) {
      return res.status(401).json({ error: "token missing or invalid" });
    } else {
      const user = await User.findById(decodedToken.id);
      console.log(req.body);
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

      res.send(vaccine);
    }
  } catch (error) {
    next(error);
  }
});
vaccineRouter.put("/:id", async (req, res, next) => {
  const body = req.body.vaccine;

  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  const user = await User.findById(decodedToken.id);
  const VaccineUpdate = await Vaccine.findById(req.params.id);

  if (VaccineUpdate.user.toString() === user._id.toString()) {
    let vaccine = {
      vaccineName: body.vaccineName,
      manufacturingCompany: body.manufacturingCompany,
      companyEmail: body.companyEmail,
      companyContact: body.companyContact,
      manufacturedDate: body.manufacturedDate,
      numberOfDose: body.numberOfDose,
      vaccineRoute: body.vaccineRoute,
      vaccinationAge: body.vaccinationAge,
      vaccineImage: body.vaccineImage,
    };

    try {
      const Vaccineupdated = await Vaccine.findByIdAndUpdate(
        req.params.id,
        vaccine,
        {
          new: true,
          runValidators: true,
          context: "query",
        }
      );

      res.json(Vaccineupdated);
    } catch (error) {
      next(error);
    }
  }
});

vaccineRouter.delete("/:id", async (req, res, next) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  const user = await User.findById(decodedToken.id);
  const vaccineDelete = await Vaccine.findById(req.params.id);

  if (vaccineDelete.user.toString() === user.id.toString()) {
    await Vaccine.findByIdAndRemove(req.params.id);
    try {
      res
        .status(204)

        .end();
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(401).json({ error: "Invalid move" });
  }
});

module.exports = vaccineRouter;
