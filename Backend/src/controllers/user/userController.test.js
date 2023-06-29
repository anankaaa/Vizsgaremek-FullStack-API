const { mockRequest, mockResponse } = require("jest-mock-req-res");
const createError = require("http-errors");
const userController = require("./userController");
const userService = require("./userService");

jest.mock("./userService.js");

describe("User controller", () => {
  let mockData;
  let nextFunction;
  let response;

  beforeEach(() => {
    mockData = [
      {
        _id: {
          $oid: "6411dc9a65d37f46307f8233",
        },
        name: "Temp Vezey",
        city: "Shatki",
        email: "tvezey9@diigo.com",
        password: "kAN7BHpPoIj",
        age: 71,
        amount: 21821,
        role: 2,
      },
      {
        _id: {
          $oid: "6411dc9a65d37f46307f8231",
        },
        name: "Ainslie Gann",
        city: "Musina",
        email: "agann6@ycombinator.com",
        password: "wmfVimySE",
        age: 25,
        amount: 166996,
        role: 2,
      },
      {
        _id: {
          $oid: "6411dc9a65d37f46307f822f",
        },
        name: "Linnet Simpkiss",
        city: "Belo sur Tsiribihina",
        email: "lsimpkiss3@cdc.gov",
        password: "wUCcvG",
        age: 44,
        amount: 104193,
        role: 2,
      },
    ];

    userService.__setMockData(mockData);
    nextFunction = jest.fn();
    response = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("find one with valid id", () => {
    const USER_ID = "6411dc9a65d37f46307f822f";

    const request = mockRequest({
      params: {
        id: USER_ID,
      },
    });

    return userController.getUser(request, response, nextFunction).then(() => {
      expect(userService.findById).toBeCalledWith(USER_ID);
      expect(userService.findById).toBeCalledTimes(1);
      expect(response.json).toBeCalledWith(
        mockData.find((p) => p._id.$oid === USER_ID)
      );
    });
  });

  test("findByID() with invalid ID", async () => {
    const INVALID_USER_ID = "6411e03165d37f46307f82c7";

    const request = mockRequest({
      params: {
        id: INVALID_USER_ID,
      },
    });

    await userController.getUser(request, response, nextFunction);
    expect(userService.findById).toBeCalledWith(INVALID_USER_ID);
    expect(userService.findById).toBeCalledTimes(1);
    expect(response.json).not.toBeCalled();
    expect(nextFunction).toBeCalledWith(
      new createError.NotFound(`User with ${INVALID_USER_ID} was not found`)
    );
  });

  test("create() with valid request body", async () => {
    const BODY = {
      name: "Linnet Simpkiss",
      city: "Belo sur Tsiribihina",
      email: "lsimpkiss3@cdc.gov",
      password: "wUCcvG",
      age: 55,
      amount: 100000,
      role: 2,
    };

    const request = mockRequest({
      body: BODY,
    });

    await userController.createUser(request, response, nextFunction);

    expect(userService.create).toBeCalledWith(BODY);
    expect(response.status).toBeCalledWith(201);
    expect(response.json).toBeCalledWith(mockData[mockData.length - 1]);
  });

  test("delete() by ID", async () => {
    const VALID_USER_ID = "6411dc9a65d37f46307f8231";

    const request = mockRequest({
      params: {
        id: VALID_USER_ID,
      },
    });

    await userController.deleteUser(request, response, nextFunction);
    expect(userService.delete).toBeCalledWith(VALID_USER_ID);
    expect(userService.delete).toBeCalledTimes(1);
    expect(response.json).toBeCalledWith({});
  });

  test("update() by ID", async () => {
    const VALID_USER_ID = "6411dc9a65d37f46307f8233";

    const BODY = {
      name: "Temp Vezey",
      city: "New York",
      email: "tvezey9@diigo.com",
      password: "kAN7BHpPoIj",
      age: 55,
      amount: 100000,
      role: 2,
    };

    const request = mockRequest({
      params: {
        id: VALID_USER_ID,
      },
      body: BODY,
    });

    await userController.updateUser(request, response, nextFunction);
    expect(userService.update).toBeCalledWith(VALID_USER_ID, BODY);
    expect(userService.update).toBeCalledTimes(1);
    expect(response.json).toBeCalledWith(BODY);
  });

  test("findAll() should return all dogs", async () => {
    const request = undefined;
    await userController.getAllUsers(request, response, nextFunction);
    expect(response.json).toBeCalledWith(mockData);
  });
});
