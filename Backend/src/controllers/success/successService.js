const Success = require("./../../models/success.model");

exports.create = (successData) => {
  const success = new Success(successData);
  return success.save();
};

exports.findAll = () => Success.find();

exports.findById = (id) => Success.findById(id);

exports.update = (id, updateData) =>
  Success.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = (id) => Success.findByIdAndRemove(id);
