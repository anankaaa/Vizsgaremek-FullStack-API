const createError = require("http-errors");
const logger = require("./../../config/logger");
const aidService = require("./aidService");
const Aid = require("../../models/aid.model");

exports.getAllAids = async (req, res, next) => {
  try {
    const aids = await aidService.findAll();

    res.status(200).json(aids);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Database error"));
  }
};

exports.getAid = async (req, res, next) => {
  const aidId = req.params.id;
  logger.debug(
    `${new Date().toUTCString()}, METHOD: ${req.method}, path:${
      req.originalUrl
    }` + ` Get one aid with id: ${aidId}`
  );
  try {
    const aid = await aidService.findById(aidId);
    if (!aid)
      return next(new createError.NotFound(`Aid with ${aidId} was not found`));
    res.status(200).json(aid);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Database error"));
  }
};

exports.createAid = async (req, res, next) => {
  const validationErrors = new Aid(req.body).validateSync();
  if (validationErrors) {
    return next(new createError.BadRequest(validationErrors));
  }
  try {
    const newAid = await aidService.create(req.body);

    res.status(201).json(newAid);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Aid could not saved"));
  }
};

exports.updateAid = async (req, res, next) => {
  const validationErrors = new Aid(req.body).validateSync();
  if (validationErrors) {
    return next(new createError.BadRequest(validationErrors));
  }
  logger.info(
    `A new ${
      req.method
    }, request has been sent at ${new Date().toUTCString()}, path: ${req.url}`
  );
  const aidId = req.params.id;
  try {
    const aid = await aidService.update(aidId, req.body);
    res.status(200).json(aid);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Could not be updated"));
  }
};

exports.deleteAid = async (req, res, next) => {
  const aidId = req.params.id;
  try {
    await aidService.delete(aidId);
    res.status(204).json({});
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Database error"));
  }
};
