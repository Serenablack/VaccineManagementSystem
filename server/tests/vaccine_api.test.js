const mongoose = require("mongoose");

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

describe("update of a vaccine", () => {
  test("update of a vaccine", async () => {
    const vaccinetobeUpdated = {
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
      .send(vaccinetobeUpdated)
      .set("Authorization", "bearer " + token)
      .expect(200);

    const allVaccines = await helper.vaccinesInDb();

    const vaccineToUpdate = allVaccines.find(
      (vaccine) => vaccine.vaccineName === vaccinetobeUpdated.vaccineName
    );
    console.log(vaccineToUpdate);
    const updatedVaccine = {
      ...vaccineToUpdate,
      companyContact: "+08888888828",
    };

    await api
      .put(`/api/vaccines/${vaccineToUpdate.id}`)
      .send({ vaccine: updatedVaccine })
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const vaccinesAfter = await helper.vaccinesInDb();
    expect(vaccinesAfter).toHaveLength(helper.vaccines.length + 1);
    const vaccineupdated = vaccinesAfter.find(
      (vaccine) => vaccine.companyContact === "+08888888828"
    );
    expect(vaccineupdated.companyContact).toBe("+08888888828");
  });
});

describe("deletion of a vaccine", () => {
  test("succeeds with status code 204 if id is valid", async () => {
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
      .post("/api/Vaccines")
      .send(createdVaccine)
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const vaccinesBefore = await helper.vaccinesInDb();

    const vaccineToDelete = vaccinesBefore.find(
      (vaccine) => vaccine.vaccineName === createdVaccine.vaccineName
    );

    await api
      .delete(`/api/vaccines/${vaccineToDelete.id}`)
      .set("Authorization", "bearer " + token)
      .expect(204);

    const vaccinesAfter = await helper.vaccinesInDb();

    expect(vaccinesAfter).toHaveLength(helper.vaccines.length);

    const vacName = vaccinesAfter.map((vac) => vac.vaccineName);

    expect(vacName).not.toContain(vaccineToDelete.vaccineName);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
