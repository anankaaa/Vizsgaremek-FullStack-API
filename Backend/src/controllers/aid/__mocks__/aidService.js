const aidService = jest.mock("./aidService");

let mockData;

aidService.findById = jest.fn((id) => {
  return Promise.resolve(mockData.find((p) => p._id.$oid === id));
});

aidService.findAll = jest.fn(() => {
  return Promise.resolve(mockData);
});

aidService.create = jest.fn((aid) => {
  mockData.push(aid);
  return Promise.resolve(aid);
});

aidService.update = jest.fn((id, aid) => {
  let aidUpdate = mockData.find((aid) => aid._id.$oid === id);
  aidUpdate = aid;
  return Promise.resolve(aidUpdate);
});

aidService.delete = jest.fn((id) => {
  let aidIndex = mockData.findIndex((aid) => aid._id.$oid === id);

  return Promise.resolve(mockData.splice(aidIndex, 1));
});

aidService.__setMockData = (data) => {
  mockData = data;
};

module.exports = aidService;
