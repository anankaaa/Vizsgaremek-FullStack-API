const app = require("./server");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Dog = require("./models/dog.model");
const Aid = require("./models/aid.model");
const Success = require("./models/success.model");
const User = require("./models/user.model");
require("dotenv").config();

describe("REST API integration tests", () => {
  let ACCESS_TOKEN;
  let REFRESH_TOKEN;
  const insertData = {
    dogs: [
      {
        name: "Fair",
        breed: "Farkaskutya",
        age: 9,
        learning: false,
        deployable: false,
        url: "assets/img/farkaskutya.jpeg",
      },
      {
        name: "Lin",
        breed: "Tacskó",
        age: 3,
        learning: true,
        deployable: true,
        url: "assets/img/tacskó.jpeg",
      },
      {
        name: "Blondie",
        breed: "Tacskó",
        age: 3,
        learning: false,
        deployable: true,
        url: "assets/img/Tacskó.jpg",
      },
    ],
    aids: [
      {
        title: "Vakvezető tanfolyam",
        details:
          "Speciális képzés a vakok és gyengénlátók mindennapi életének és közlekedésének segítésére",
        date: "3/20/2023",
        amount: 300000,
        collected: 300000,
        active: false,
        payment: 0,
      },
    ],
    successes: [
      {
        title: "Bűncselekmény áldozatának felkutatása",
        place: "Nagytarcsa",
        date: "1/30/2022",
        success: true,
        details:
          "Egy három éves bűncselekmény áldozatának megtalálása a nagytarcsai erdőben a rendőrség kérésére. Az áldozatra egy patak mentés elásva talált kutyánk.",
      },
      {
        title: "3 segítő kutyus",
        place: "Nemesvámos",
        date: "10/8/2021",
        success: true,
        details:
          "3 kutyusunk költözött rokkant gazdához, hogy segítse a mindennapi életüket.",
      },
      {
        title: "Pécsi erdőben eltűnt idős hölgy felkutatása",
        place: "Pécs",
        date: "5/20/2021",
        success: false,
        details:
          "A pécsi erdőben eltűnt idős hölgy megkeresésében vettünk részt, sajnos későn érkeztünk.",
      },
    ],
    users: [
      {
        name: "Temp Vezey",
        city: "Shatki",
        email: "tvezey9@diigo.com",
        password: "kAN7BHpPoIj",
        age: 71,
        amount: 21821,
        role: 1,
      },
      {
        name: "Ainslie Gann",
        city: "Musina",
        email: "agann6@ycombinator.com",
        password: "wmfVimySE",
        age: 25,
        amount: 166996,
        role: 2,
      },
      {
        name: "Linnet Simpkiss",
        city: "Belo sur Tsiribihina",
        email: "lsimpkiss3@cdc.gov",
        password: "wUCcvG",
        age: 44,
        amount: 104193,
        role: 2,
      },
    ],
  };

  beforeEach(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/SuperTestDB");
    console.log("MongoDB connection established");

    const user = new User({
      name: "Temp Vezey",
      city: "Shatki",
      email: "tvezey9@diigo.com",
      password: "kAN7BHpPoIj",
      age: 71,
      amount: 21821,
      role: 1,
    });
    await user.save();
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();

    console.log("MongoDB connection closed");
  });

  test("GET / dogs endpoint", async () => {
    await Dog.insertMany(insertData.dogs);
    const response = await supertest(app).get("/api/dogs");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(insertData.dogs.length);

    response.body.forEach((dog, index) => {
      expect(dog.name).toBe(insertData.dogs[index].name);
      expect(dog.breed).toBe(insertData.dogs[index].breed);
      expect(dog.age).toBe(insertData.dogs[index].age);
    });
  });

  test("GET/dog/:id endpoint", async () => {
    const testDog = await Dog.insertMany(insertData.dogs);
    const firstDogID = testDog[0]._id;
    const response = await supertest(app).get(
      `/api/dogs/${firstDogID.toString()}`
    );

    expect(response.statusCode).toBe(200);

    expect(response.body._id).toBe(firstDogID.toString());
    expect(response.body.name).toBe(insertData.dogs[0].name);
    expect(response.body.breed).toBe(insertData.dogs[0].breed);
    expect(response.body.age).toBe(insertData.dogs[0].age);
  });

  test("GET / aid endpoint", async () => {
    await Aid.insertMany(insertData.aids);
    const response = await supertest(app).get("/api/aid");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(insertData.aids.length);

    response.body.forEach((aid, index) => {
      expect(aid.title).toBe(insertData.aids[index].title);
      expect(aid.details).toBe(insertData.aids[index].details);
      expect(aid.date).toBe(insertData.aids[index].date);
    });
  });

  test("GET/aid/:id endpoint", async () => {
    const testUser = await User.insertMany(insertData.users);
    const testAid = await Aid.insertMany(insertData.aids);
    const firstAidID = testAid[0]._id;

    await supertest(app)
      .post("/api/login")
      .send({
        email: "tvezey9@diigo.com",
        password: "kAN7BHpPoIj",
      })
      .then((res) => {
        ACCESS_TOKEN = res.body.accessToken;
        REFRESH_TOKEN = res.body.refreshToken;
      });

    const response = await supertest(app)
      .get(`/api/aid/${firstAidID.toString()}`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`);
    console.log(ACCESS_TOKEN);

    expect(response.statusCode).toBe(200);

    expect(response.body._id).toBe(firstAidID.toString());
    expect(response.body.title).toBe(insertData.aids[0].title);
    expect(response.body.details).toBe(insertData.aids[0].details);
    expect(response.body.date).toBe(insertData.aids[0].date);
  });

  test("PATCH/aid/:id endpoint", async () => {
    const testAids = await Aid.insertMany(insertData.aids);
    const firstAidID = testAids[0]._id;

    const validUpdatedAid = {
      title: "Vakvezető tanfolyam",
      details:
        "Speciális képzés a vakok és gyengénlátók mindennapi életének és közlekedésének segítésére",
      date: "03/20/2023",
      amount: 350000,
      collected: 300000,
      active: false,
      payment: 0,
    };

    const response = await supertest(app)
      .patch(`/api/aid/${firstAidID.toString()}`)
      .send(validUpdatedAid);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(validUpdatedAid.title);
    expect(response.body.details).toBe(validUpdatedAid.details);
    expect(response.body.date).toBe(validUpdatedAid.date);
  });

  test("GET / success endpoint", async () => {
    await Success.insertMany(insertData.successes);
    const response = await supertest(app).get("/api/success");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(insertData.successes.length);

    response.body.forEach((success, index) => {
      expect(success.title).toBe(insertData.successes[index].title);
      expect(success.place).toBe(insertData.successes[index].place);
      expect(success.date).toBe(insertData.successes[index].date);
    });
  });

  test("GET/success/:id endpoint", async () => {
    const testSuccess = await Success.insertMany(insertData.successes);
    const firstSuccessID = testSuccess[0]._id;
    const response = await supertest(app).get(
      `/api/success/${firstSuccessID.toString()}`
    );

    expect(response.statusCode).toBe(200);

    expect(response.body._id).toBe(firstSuccessID.toString());
    expect(response.body.title).toBe(insertData.successes[0].title);
    expect(response.body.place).toBe(insertData.successes[0].place);
    expect(response.body.date).toBe(insertData.successes[0].date);
  });

  test("GET / users endpoint wiht login", async () => {
    const testUser = await User.insertMany(insertData.users);

    await supertest(app)
      .post("/api/login")
      .send({
        email: "tvezey9@diigo.com",
        password: "kAN7BHpPoIj",
      })
      .then((res) => {
        ACCESS_TOKEN = res.body.accessToken;
        REFRESH_TOKEN = res.body.refreshToken;
      });

    const response = await supertest(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.splice(1).length).toBe(insertData.users.length);

    response.body.splice(1).forEach((user, index) => {
      expect(user.city).toBe(insertData.users[index].city);
      expect(user.name).toBe(insertData.users[index].name);
      expect(user.email).toBe(insertData.users[index].email);
    });
  });

  test("GET/users/:id endpoint with login data", async () => {
    const testUser = await User.insertMany(insertData.users);
    const firstUserID = testUser[0]._id;

    await supertest(app)
      .post("/api/login")
      .send({
        email: "tvezey9@diigo.com",
        password: "kAN7BHpPoIj",
      })
      .then((res) => {
        ACCESS_TOKEN = res.body.accessToken;
        REFRESH_TOKEN = res.body.refreshToken;
      });

    const response = await supertest(app)
      .get(`/api/users/${firstUserID.toString()}`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

    expect(response.statusCode).toBe(200);

    expect(response.body._id).toBe(firstUserID.toString());
    expect(response.body.city).toBe(insertData.users[0].city);
    expect(response.body.name).toBe(insertData.users[0].name);
    expect(response.body.email).toBe(insertData.users[0].email);
  });

  test("PATCH/users/:id endpoint with login data", async () => {
    const testUser = await User.insertMany(insertData.users);
    const firstUserID = testUser[1]._id;

    await supertest(app)
      .post("/api/login")
      .send({
        email: "tvezey9@diigo.com",
        password: "kAN7BHpPoIj",
      })
      .then((res) => {
        ACCESS_TOKEN = res.body.accessToken;
        REFRESH_TOKEN = res.body.refreshToken;
      });

    const validUpdatedUser = {
      name: "Tempy Vezey",
      city: "Shatki",
      email: "tvezey9@diigo.com",
      password: "kAN7BHpPoIj",
      age: 71,
      amount: 21821,
      role: 2,
    };

    const response = await supertest(app)
      .patch(`/api/users/${firstUserID}`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .send(validUpdatedUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(validUpdatedUser.name);
    expect(response.body.city).toBe(validUpdatedUser.city);
    expect(response.body.amount).toBe(validUpdatedUser.amount);
  });

  test("CREATE/users endpoint with login data", async () => {
    const testUser = await User.insertMany(insertData.users);
    await supertest(app)
      .post("/api/login")
      .send({
        email: "tvezey9@diigo.com",
        password: "kAN7BHpPoIj",
      })
      .then((res) => {
        ACCESS_TOKEN = res.body.accessToken;
        REFRESH_TOKEN = res.body.refreshToken;
      });

    const userToInsert = {
      name: "Nagy Miki",
      city: "Szeged",
      email: "nagy@gmail.com",
      password: "test12345",
      age: 25,
      amount: 10000,
      role: 2,
    };

    const response = await supertest(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .send(userToInsert);

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(userToInsert.name);
    expect(response.body.city).toBe(userToInsert.city);
    expect(response.body.amount).toBe(userToInsert.amount);
  });

  test("DELETE/users/:id endpoint with login data", async () => {
    const testUser = await User.insertMany(insertData.users);
    const firstUserID = testUser[1]._id;

    await supertest(app)
      .post("/api/login")
      .send({
        email: "tvezey9@diigo.com",
        password: "kAN7BHpPoIj",
      })
      .then((res) => {
        ACCESS_TOKEN = res.body.accessToken;
        REFRESH_TOKEN = res.body.refreshToken;
      });

    const response = await supertest(app)
      .delete(`/api/users/${firstUserID.toString()}`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

    expect(response.statusCode).toBe(204);
    expect(response.body).toEqual({});
  });
});
