const successService = jest.mock("./successService");

let mockData;

successService.findById = jest.fn((id) => {
  return Promise.resolve(mockData.find((success) => success._id.$oid === id));
});

successService.findAll = jest.fn(() => {
  return Promise.resolve(mockData);
});

successService.create = jest.fn((success) => {
  mockData.push(success);
  return Promise.resolve(success);
});

successService.update = jest.fn((id, success) => {
  let successUpdate = mockData.find((success) => success._id.$oid === id);
  successUpdate = success;
  return Promise.resolve(successUpdate);
});

successService.delete = jest.fn((id) => {
  let successIndex = mockData.findIndex((success) => success._id.$oid === id);

  return Promise.resolve(mockData.splice(successIndex, 1));
});

successService.__setMockData = (data) => {
  mockData = data;
};

module.exports = successService;
