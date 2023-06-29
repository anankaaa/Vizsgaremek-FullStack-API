const userService = jest.mock("./userService");

let mockData;

userService.findById = jest.fn((id) => {
  return Promise.resolve(mockData.find((user) => user._id.$oid === id));
});

userService.findAll = jest.fn(() => {
  return Promise.resolve(mockData);
});

userService.create = jest.fn((user) => {
  mockData.push(user);
  return Promise.resolve(user);
});

userService.update = jest.fn((id, user) => {
  let userUpdate = mockData.find((user) => user._id.$oid === id);
  userUpdate = user;
  return Promise.resolve(userUpdate);
});

userService.delete = jest.fn((id) => {
  let userIndex = mockData.findIndex((user) => user._id.$oid === id);

  return Promise.resolve(mockData.splice(userIndex, 1));
});

userService.__setMockData = (data) => {
  mockData = data;
};

module.exports = userService;
