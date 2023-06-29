const createError = require("http-errors");
const logger = require("./../../config/logger");
const successService = require("./successService");
const Success = require("../../models/success.model");

exports.getAllSuccesses = async (req, res, next) => {
  try {
    const successes = await successService.findAll();

    res.status(200).json(successes);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Database error"));
  }
};

exports.getSuccess = async (req, res, next) => {
  const successId = req.params.id;
  logger.debug(
    `${new Date().toUTCString()}, METHOD: ${req.method}, path:${
      req.originalUrl
    }` + ` Get one success with id: ${successId}`
  );
  try {
    const success = await successService.findById(successId);
    if (!success)
      return next(
        new createError.NotFound(`Success with ${successId} was not found`)
      );
    res.status(200).json(success);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Database error"));
  }
};

exports.createSuccess = async (req, res, next) => {
  const validationErrors = new Success(req.body).validateSync();
  if (validationErrors) {
    return next(new createError.BadRequest(validationErrors));
  }
  try {
    const newSuccess = await successService.create(req.body);
    res.status(201).json(newSuccess);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Success could not saved"));
  }
};

exports.updateSuccess = async (req, res, next) => {
  const validationErrors = new Success(req.body).validateSync();
  if (validationErrors) {
    return next(new createError.BadRequest(validationErrors));
  }
  logger.info(
    `A new ${
      req.method
    }, request has been sent at ${new Date().toUTCString()}, path: ${req.url}`
  );
  const successId = req.params.id;
  try {
    const success = await successService.update(successId, req.body);
    res.status(200).json(success);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Could not be updated"));
  }
};

exports.deleteSuccess = async (req, res, next) => {
  const successId = req.params.id;
  try {
    await successService.delete(successId);
    res.status(204).json({});
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Database error"));
  }
};
