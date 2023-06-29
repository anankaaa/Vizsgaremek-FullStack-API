const { mockRequest, mockResponse } = require("jest-mock-req-res");
const createError = require("http-errors");
const successController = require("./successController");
const successService = require("./successService");

jest.mock("./successService.js");

describe("Success controller", () => {
  let mockData;
  let nextFunction;
  let response;

  beforeEach(() => {
    mockData = [
      {
        _id: {
          $oid: "6411df8d65d37f46307f828f",
        },
        title: "Bűncselekmény áldozatának felkutatása",
        place: "Nagytarcsa",
        date: "1/30/2022",
        success: true,
        details:
          "Egy három éves bűncselekmény áldozatának megtalálása a nagytarcsai erdőben a rendőrség kérésére. Az áldozatra egy patak mentés elásva talált kutyánk.",
      },
      {
        _id: {
          $oid: "6411df8d65d37f46307f829f",
        },
        title: "3 segítő kutyus",
        place: "Nemesvámos",
        date: "10/8/2021",
        success: true,
        details:
          "3 kutyusunk költözött rokkant gazdához, hogy segítse a mindennapi életüket.",
      },
      {
        _id: {
          $oid: "6411df8d65d37f46307f82b0",
        },
        title: "Pécsi erdőben eltűnt idős hölgy felkutatása",
        place: "Pécs",
        date: "5/20/2021",
        success: false,
        details:
          "A pécsi erdőben eltűnt idős hölgy megkeresésében vettünk részt, sajnos későn érkeztünk.",
      },
    ];

    successService.__setMockData(mockData);
    nextFunction = jest.fn();
    response = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("find one with valid id", () => {
    const SUCCESS_ID = "6411df8d65d37f46307f82b0";

    const request = mockRequest({
      params: {
        id: SUCCESS_ID,
      },
    });

    return successController
      .getSuccess(request, response, nextFunction)
      .then(() => {
        expect(successService.findById).toBeCalledWith(SUCCESS_ID);
        expect(successService.findById).toBeCalledTimes(1);
        expect(response.json).toBeCalledWith(
          mockData.find((p) => p._id.$oid === SUCCESS_ID)
        );
      });
  });

  test("findByID() with invalid ID", async () => {
    const INVALID_SUCCESS_ID = "6411e03165d37f46307f82c7";

    const request = mockRequest({
      params: {
        id: INVALID_SUCCESS_ID,
      },
    });

    await successController.getSuccess(request, response, nextFunction);
    expect(successService.findById).toBeCalledWith(INVALID_SUCCESS_ID);
    expect(successService.findById).toBeCalledTimes(1);
    expect(response.json).not.toBeCalled();
    expect(nextFunction).toBeCalledWith(
      new createError.NotFound(
        `Success with ${INVALID_SUCCESS_ID} was not found`
      )
    );
  });
  test("create() with valid request body", async () => {
    const BODY = {
      title: "Pécsi erdőben eltűnt 5 éves gyermek felkutatása",
      place: "Pécs",
      date: "5/20/2022",
      success: true,
      details: "A pécsi erdőben eltűnt gyermek megkeresésében vettünk részt..",
    };

    const request = mockRequest({
      body: BODY,
    });

    await successController.createSuccess(request, response, nextFunction);

    expect(successService.create).toBeCalledWith(BODY);
    expect(response.status).toBeCalledWith(201);
    expect(response.json).toBeCalledWith(mockData[mockData.length - 1]);
  });

  test("delete() by ID", async () => {
    const VALID_SUCCESS_ID = "6411df8d65d37f46307f82b0";

    const request = mockRequest({
      params: {
        id: VALID_SUCCESS_ID,
      },
    });

    await successController.deleteSuccess(request, response, nextFunction);
    expect(successService.delete).toBeCalledWith(VALID_SUCCESS_ID);
    expect(successService.delete).toBeCalledTimes(1);
    expect(response.json).toBeCalledWith({});
  });

  test("update() by ID", async () => {
    const VALID_SUCCESS_ID = "6411df8d65d37f46307f829f";

    const BODY = {
      title: "4 segítő kutyus",
      place: "Győr",
      date: "08/08/2021",
      success: true,
      details:
        "4 kutyusunk költözött rokkant gazdához, hogy segítse a mindennapi életüket.",
    };

    const request = mockRequest({
      params: {
        id: VALID_SUCCESS_ID,
      },
      body: BODY,
    });

    await successController.updateSuccess(request, response, nextFunction);
    expect(successService.update).toBeCalledWith(VALID_SUCCESS_ID, BODY);
    expect(successService.update).toBeCalledTimes(1);
    expect(response.json).toBeCalledWith(BODY);
  });

  test("findAll() should return all successes", async () => {
    const request = undefined;
    await successController.getAllSuccesses(request, response, nextFunction);
    expect(response.json).toBeCalledWith(mockData);
  });
});
