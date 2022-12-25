const mongoose = require("mongoose");

const vaccineSchema = new mongoose.Schema({
  vaccineName: {
    type: String,
    required: true,
  },
  manufacturingCompany: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
  },
  companyContact: {
    type: String,
    required: true,
  },
  manufacturedDate: {
    type: Date,
    required: true,
  },
  numberOfDose: {
    type: Number,
    required: true,
  },
  vaccineRoute: String,
  vaccinationAge: String,
  vaccineImage: String,
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  isMandatory: Boolean,
});

vaccineSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Vaccine", vaccineSchema);
