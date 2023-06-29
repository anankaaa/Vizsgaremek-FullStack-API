const Aid = require("./../../models/aid.model");

exports.create = (aidData) => {
  const aid = new Aid(aidData);
  return aid.save();
};

exports.findAll = () => Aid.find();

exports.findById = (id) => Aid.findById(id);

exports.update = (id, updateData) =>
  Aid.findByIdAndUpdate(id, updateData, { new: true });

exports.delete = (id) => Aid.findByIdAndRemove(id);
