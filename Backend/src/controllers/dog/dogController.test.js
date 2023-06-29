const { mockRequest, mockResponse } = require("jest-mock-req-res");
const createError = require("http-errors");
const dogController = require("./dogController");
const dogService = require("./dogService");

jest.mock("./dogService.js");

describe("Dog controller", () => {
  let mockData;
  let nextFunction;
  let response;

  beforeEach(() => {
    mockData = [
      {
        _id: {
          $oid: "6411e0ff65d37f46307f82f0",
        },
        name: "Fair",
        breed: "Farkaskutya",
        age: 9,
        learning: false,
        deployable: false,
        url: "assets/img/farkaskutya.jpeg",
      },
      {
        _id: {
          $oid: "6411e0ff65d37f46307f82d6",
        },
        name: "Lin",
        breed: "Tacskó",
        age: 3,
        learning: true,
        deployable: true,
        url: "assets/img/tacskó.jpeg",
      },
      {
        _id: {
          $oid: "6411e0ff65d37f46307f82e4",
        },
        name: "Blondie",
        breed: "Tacskó",
        age: 3,
        learning: false,
        deployable: true,
        url: "assets/img/Tacskó.jpg",
      },
    ];

    dogService.__setMockData(mockData);
    nextFunction = jest.fn();
    response = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("find one with valid id", () => {
    const DOG_ID = "6411e0ff65d37f46307f82f0";

    const request = mockRequest({
      params: {
        id: DOG_ID,
      },
    });

    return dogController.getDog(request, response, nextFunction).then(() => {
      expect(dogService.findById).toBeCalledWith(DOG_ID);
      expect(dogService.findById).toBeCalledTimes(1);
      expect(response.json).toBeCalledWith(
        mockData.find((p) => p._id.$oid === DOG_ID)
      );
    });
  });

  test("findByID() with invalid ID", async () => {
    const INVALID_DOG_ID = "6411e03165d37f46307f82c7";

    const request = mockRequest({
      params: {
        id: INVALID_DOG_ID,
      },
    });

    await dogController.getDog(request, response, nextFunction);
    expect(dogService.findById).toBeCalledWith(INVALID_DOG_ID);
    expect(dogService.findById).toBeCalledTimes(1);
    expect(response.json).not.toBeCalled();
    expect(nextFunction).toBeCalledWith(
      new createError.NotFound(`Dog with ${INVALID_DOG_ID} was not found`)
    );
  });

  test("create() with valid request body", async () => {
    const BODY = {
      name: "Szocsi",
      breed: "Tacskó",
      age: 3,
      learning: false,
      deployable: true,
      url: "assets/img/Tacskó.jpg",
    };

    const request = mockRequest({
      body: BODY,
    });

    await dogController.createDog(request, response, nextFunction);

    expect(dogService.create).toBeCalledWith(BODY);
    expect(response.status).toBeCalledWith(201);
    expect(response.json).toBeCalledWith(mockData[mockData.length - 1]);
  });

  test("delete() by ID", async () => {
    const VALID_DOG_ID = "6411e0ff65d37f46307f82d6";

    const request = mockRequest({
      params: {
        id: VALID_DOG_ID,
      },
    });

    await dogController.deleteDog(request, response, nextFunction);
    expect(dogService.delete).toBeCalledWith(VALID_DOG_ID);
    expect(dogService.delete).toBeCalledTimes(1);
    expect(response.json).toBeCalledWith({});
  });

  test("update() by ID", async () => {
    const VALID_DOG_ID = "6411e0ff65d37f46307f82f0";

    const BODY = {
      name: "Fairy",
      breed: "Farkaskutya",
      age: 9,
      learning: false,
      deployable: false,
      url: "assets/img/farkaskutya.jpeg",
    };

    const request = mockRequest({
      params: {
        id: VALID_DOG_ID,
      },
      body: BODY,
    });

    await dogController.updateDog(request, response, nextFunction);
    expect(dogService.update).toBeCalledWith(VALID_DOG_ID, BODY);
    expect(dogService.update).toBeCalledTimes(1);
    expect(response.json).toBeCalledWith(BODY);
  });

  test("findAll() should return all dogs", async () => {
    const request = undefined;
    await dogController.getAllDogs(request, response, nextFunction);
    expect(response.json).toBeCalledWith(mockData);
  });
});
