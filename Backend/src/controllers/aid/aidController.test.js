const { mockRequest, mockResponse } = require("jest-mock-req-res");
const createError = require("http-errors");
const aidController = require("./aidController");
const aidService = require("./aidService");

jest.mock("./aidService.js");

describe("AidController tests", () => {
  let mockData;
  let nextFunction;
  let response;

  beforeEach(() => {
    mockData = [
      {
        _id: {
          $oid: "6411e03165d37f46307f82c3",
        },
        title: "Vakvezető tanfolyam",
        details:
          "Speciális képzés a vakok és gyengénlátók mindennapi életének és közlekedésének segítésére",
        date: "3/20/2023",
        amount: 300000,
        collected: 300000,
        active: false,
        payment: 0,
      },
      {
        _id: {
          $oid: "6411e03165d37f46307f82c4",
        },
        title: "Vakvezető tanfolyam2",
        details: "Speciális képzés",
        date: "5/20/2023",
        amount: 50000,
        collected: 50000,
        active: false,
        payment: 0,
      },
    ];

    aidService.__setMockData(mockData);
    nextFunction = jest.fn();
    response = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("findById() with valid ID", () => {
    const VALID_AID_ID = "6411e03165d37f46307f82c3";

    const request = mockRequest({
      params: {
        id: VALID_AID_ID,
      },
    });

    return aidController.getAid(request, response, nextFunction).then(() => {
      expect(aidService.findById).toBeCalledWith(VALID_AID_ID);
      expect(aidService.findById).toBeCalledTimes(1);
      expect(response.json).toBeCalledWith(
        mockData.find((p) => p._id.$oid === VALID_AID_ID)
      );
    });
  });

  test("findByID() with invalid ID", async () => {
    const INVALID_AID_ID = "6411e03165d37f46307f82c7";

    const request = mockRequest({
      params: {
        id: INVALID_AID_ID,
      },
    });

    await aidController.getAid(request, response, nextFunction);
    expect(aidService.findById).toBeCalledWith(INVALID_AID_ID);
    expect(aidService.findById).toBeCalledTimes(1);
    expect(response.json).not.toBeCalled();
    expect(nextFunction).toBeCalledWith(
      new createError.NotFound(`Aid with ${INVALID_AID_ID} was not found`)
    );
  });

  test("create() with valid request body", async () => {
    const BODY = {
      title: "Vakvezeto tanfolyam3",
      details: "Tanfolyam details",
      date: "05/23/2023",
      amount: 100000,
      collected: 10000,
      active: true,
      payment: 0,
    };

    const request = mockRequest({
      body: BODY,
    });

    await aidController.createAid(request, response, nextFunction);

    expect(aidService.create).toBeCalledWith(BODY);
    expect(response.status).toBeCalledWith(201);
    expect(response.json).toBeCalledWith(mockData[mockData.length - 1]);
  });

  test("delete() by ID", async () => {
    const VALID_AID_ID = "6411e03165d37f46307f82c4";

    const request = mockRequest({
      params: {
        id: VALID_AID_ID,
      },
    });

    await aidController.deleteAid(request, response, nextFunction);
    expect(aidService.delete).toBeCalledWith(VALID_AID_ID);
    expect(aidService.delete).toBeCalledTimes(1);
    expect(response.json).toBeCalledWith({});
  });

  test("update() by ID", async () => {
    const VALID_AID_ID = "6411e03165d37f46307f82c3";

    const BODY = {
      title: "Vakvezeto tanfolyam3",
      details: "Tanfolyam details",
      date: "05/23/2023",
      amount: 100000,
      collected: 10000,
      active: true,
      payment: 0,
    };

    const request = mockRequest({
      params: {
        id: VALID_AID_ID,
      },
      body: BODY,
    });

    await aidController.updateAid(request, response, nextFunction);
    expect(aidService.update).toBeCalledWith(VALID_AID_ID, BODY);
    expect(aidService.update).toBeCalledTimes(1);
    expect(response.json).toBeCalledWith(BODY);
  });

  test("findAll() should return all aids", async () => {
    const request = undefined;
    await aidController.getAllAids(request, response, nextFunction);
    expect(response.json).toBeCalledWith(mockData);
  });
});
