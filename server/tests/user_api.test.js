const mongoose = require("mongoose");

const helper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const bcrypt = require("bcrypt");

var token = "";
beforeEach(async () => {
  await User.deleteMany({});
  var newUser = {
    email: "jerry@email.com",
    name: "name",
    password: "sandhyayadav",
  };

  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  token = response.body.token;
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    var newUser = {
      email: "jerry@email.com",
      name: "name",
      password: "sandhyayadav",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("user with username less than 3 characters long is not created", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "ro",
      name: "Superuser",
      password: "sakura",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(result.body.error).toContain(
      `is shorter than the minimum allowed length (3).`
    );
    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("user with password less than 3 characters long is not created", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "romi",
      name: "Superuser",
      password: "sa",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(result.body.error).toContain(
      `is shorter than the minimum allowed length (3).`
    );
    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(result.body.error).toContain("username must be unique");
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});
