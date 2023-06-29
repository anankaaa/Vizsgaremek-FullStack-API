const dogService = jest.mock("./dogService");

let mockData;

dogService.findById = jest.fn((id) => {
  return Promise.resolve(mockData.find((dog) => dog._id.$oid === id));
});

dogService.findAll = jest.fn(() => {
  return Promise.resolve(mockData);
});

dogService.create = jest.fn((dog) => {
  mockData.push(dog);
  return Promise.resolve(dog);
});

dogService.update = jest.fn((id, dog) => {
  let dogUpdate = mockData.find((dog) => dog._id.$oid === id);
  dogUpdate = dog;
  return Promise.resolve(dogUpdate);
});

dogService.delete = jest.fn((id) => {
  let dogIndex = mockData.findIndex((dog) => dog._id.$oid === id);
  return Promise.resolve(mockData.splice(dogIndex, 1));
});

dogService.__setMockData = (data) => {
  mockData = data;
};

module.exports = dogService;
