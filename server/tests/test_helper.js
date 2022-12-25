const User = require("../models/user");
const Vaccine = require("../models/vaccine");

const vaccines = [
  {
    vaccineName: "Infanrix",
    manufacturingCompany: "GlaxoSmithKline Biologicals",
    companyEmail: "customercontactuk@gsk.com ",
    companyContact: "+44(0)80022141",
    manufacturedDate: "2019",
    numberOfDose: "5",
    vaccineRoute: "IM",
    vaccinationAge: "6 weeks-6 years",
    vaccineImage:
      "https://res.cloudinary.com/ddt5ixpqr/image/upload/v1671286678/vaccines/oqkesuimqghv9kr8cx5l.jpg",
    user: ["639853cce3305435c44ba20f"],
    isMandatory: false,
    id: "639fcef4e0d7aa9bd8bb48e8",
  },
  {
    vaccineName: "Infanrix",
    manufacturingCompany: "GlaxoSmithKline Biologicals",
    companyEmail: "customercontactuk@gsk.com ",
    companyContact: "+44(0)80022141",
    manufacturedDate: "2019",
    numberOfDose: "5",
    vaccineRoute: "IM",
    vaccinationAge: "6 weeks-6 years",
    vaccineImage:
      "https://res.cloudinary.com/ddt5ixpqr/image/upload/v1671286678/vaccines/oqkesuimqghv9kr8cx5l.jpg",
    user: ["639853cce3305435c44ba20f"],
    isMandatory: false,
    id: "639fcef4e0d7aa9bd8bb48e8",
  },
];

const vaccinesInDb = async () => {
  const vaccines = await Vaccine.find({});
  return vaccines.map((vac) => vac.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  vaccines,
  vaccinesInDb,
  usersInDb,
};
