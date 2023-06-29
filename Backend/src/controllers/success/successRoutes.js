const express = require("express");
const successController = require("./successController");

const router = express.Router();

router
  .route("/")
  .get(successController.getAllSuccesses)
  .post(successController.createSuccess);

router
  .route("/:id")
  .get(successController.getSuccess)
  .patch(successController.updateSuccess)
  .delete(successController.deleteSuccess);

module.exports = router;
