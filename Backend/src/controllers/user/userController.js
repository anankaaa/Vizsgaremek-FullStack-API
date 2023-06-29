const createError = require("http-errors");
const logger = require("./../../config/logger");
const userService = require("./userService");
const User = require("../../models/user.model");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.findAll();

    res.status(200).json(users);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Database error"));
  }
};

exports.getUser = async (req, res, next) => {
  const userId = req.params.id;
  logger.debug(
    `${new Date().toUTCString()}, METHOD: ${req.method}, path:${
      req.originalUrl
    }` + ` Get one user with id: ${userId}`
  );
  try {
    const user = await userService.findById(userId);
    if (!user)
      return next(
        new createError.NotFound(`User with ${userId} was not found`)
      );
    res.status(200).json(user);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Database error"));
  }
};

exports.createUser = async (req, res, next) => {
  const validationErrors = new User(req.body).validateSync();
  if (validationErrors) {
    return next(new createError.BadRequest(validationErrors));
  }
  try {
    const newUser = await userService.create(req.body);

    res.status(201).json(newUser);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("User could not saved"));
  }
};

exports.updateUser = async (req, res, next) => {
  const validationErrors = new User(req.body).validateSync();
  if (validationErrors) {
    return next(new createError.BadRequest(validationErrors));
  }
  logger.info(
    `A new ${
      req.method
    }, request has been sent at ${new Date().toUTCString()}, path: ${req.url}`
  );
  const userId = req.params.id;
  try {
    const user = await userService.update(userId, req.body);
    res.status(200).json(user);
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Could not be updated"));
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    await userService.delete(userId);
    res.status(204).json({});
  } catch (err) {
    logger.error(err);
    return next(new createError.InternalServerError("Database error"));
  }
};
