const User = require("./../../models/user.model");

exports.create = (userData) => {
  const user = new User(userData);
  return user.save();
};

exports.findAll = () => User.find();

exports.findById = (id) => User.findById(id);

exports.update = (id, updateData) =>
  User.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = (id) => User.findByIdAndRemove(id);
