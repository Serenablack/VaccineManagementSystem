const helper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Vaccine = require("../models/vaccine");

var token = "";
beforeEach(async () => {
  await Vaccine.deleteMany({});
  let VaccineObject = helper.vaccines.map((vaccine) => new Vaccine(vaccine));
  const promiseArray = VaccineObject.map((vaccine) => vaccine.save());

  await Promise.all(promiseArray);

  var credentials = {
    email: "gary@email.com",
    password: "sandhyayadav",
  };

  const response = await api
    .post("/api/login")
    .send(credentials)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  token = response.body.token;
});

describe("when there are Vaccines saved in the database", () => {
  test("Vaccines are returned as json", async () => {
    await api
      .get("/api/vaccines")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are two Vaccines", async () => {
    const response = await api
      .get("/api/vaccines")
      .set("Authorization", "bearer " + token)
      .expect(200);
    expect(response.body).toHaveLength(helper.vaccines.length);
  });

  test("a specific Vaccine is present in the returned Vaccine list", async () => {
    const response = await api
      .get("/api/vaccines")
      .set("Authorization", "bearer " + token);
    const name = response.body.map((x) => x.vaccineName);
    expect(name).toContain("Infanrix");
  });

  test("the unique identifier property of the Vaccines is its id", async () => {
    const vaccines = await Vaccine.find({});
    expect(vaccines[0]._id).toBeDefined();
  });
});

describe("addition of a new Vaccine", () => {
  test("a valid Vaccine is added", async () => {
    const createdVaccine = {
      vaccineName: "Adacel",
      manufacturingCompany: "Sanofi Pasteur",
      companyEmail: "customercontactus@sp.com",
      companyContact: "+01888564838",
      manufacturedDate: "2005",
      numberOfDose: "1",
      vaccineRoute: "IM",
      vaccinationAge: "10-64",
      vaccineImage:
        "https://res.cloudinary.com/ddt5ixpqr/image/upload/v1671007144/vaccines/lojozz7ttmhuml08mwp3.jpg",
      isMandatory: false,
    };

    await api
      .post("/api/vaccines")
      .send(createdVaccine)
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    const vaccinesInDb = await helper.vaccinesInDb();
    const vaccineName = vaccinesInDb.map((x) => x.vaccineName);
    expect(vaccineName).toHaveLength(helper.vaccines.length + 1);
    expect(vaccineName).toContain("Adacel");
  });
});
