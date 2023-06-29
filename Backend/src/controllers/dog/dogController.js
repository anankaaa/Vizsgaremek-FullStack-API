const createError = require("http-errors");
const logger = require("./../../config/logger");
const dogService = require("./dogService");
const Dog = require("../../models/dog.model");

exports.getAllDogs = async (req, res, next) => {
  try {
    const dogs = await dogService.findAll();

    res.status(200).json(dogs);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Database error"));
  }
};

exports.getDog = async (req, res, next) => {
  const dogId = req.params.id;
  logger.debug(
    `${new Date().toUTCString()}, METHOD: ${req.method}, path:${
      req.originalUrl
    }` + ` Get one dog with id: ${dogId}`
  );
  try {
    const dog = await dogService.findById(dogId);
    if (!dog)
      return next(new createError.NotFound(`Dog with ${dogId} was not found`));
    res.status(200).json(dog);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Database error"));
  }
};

exports.createDog = async (req, res, next) => {
  const validationErrors = new Dog(req.body).validateSync();
  if (validationErrors) {
    return next(new createError.BadRequest(validationErrors));
  }
  try {
    const newDog = await dogService.create(req.body);
    res.status(201).json(newDog);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Dog could not saved"));
  }
};

exports.updateDog = async (req, res, next) => {
  const validationErrors = new Dog(req.body).validateSync();
  if (validationErrors) {
    return next(new createError.BadRequest(validationErrors));
  }
  logger.info(
    `A new ${
      req.method
    }, request has been sent at ${new Date().toUTCString()}, path: ${req.url}`
  );
  const dogId = req.params.id;
  try {
    const dog = await dogService.update(dogId, req.body);
    res.status(201).json(dog);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Could not be updated"));
  }
};

exports.deleteDog = async (req, res, next) => {
  const dogId = req.params.id;
  try {
    await dogService.delete(dogId);
    res.status(204).json({});
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Database error"));
  }
};
