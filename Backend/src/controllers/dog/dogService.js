const Dog = require("./../../models/dog.model");

exports.create = (dogData) => {
  const dog = new Dog(dogData);
  return dog.save();
};

exports.findAll = () => Dog.find();

exports.findById = (id) => Dog.findById(id);

exports.update = (id, updateData) =>
  Dog.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = (id) => Dog.findByIdAndRemove(id);
