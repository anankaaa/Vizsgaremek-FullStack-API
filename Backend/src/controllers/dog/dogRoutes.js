const express = require("express");
const dogController = require("./dogController");

const router = express.Router();

router.route("/").get(dogController.getAllDogs).post(dogController.createDog);

router
  .route("/:id")
  .get(dogController.getDog)
  .patch(dogController.updateDog)
  .delete(dogController.deleteDog);

module.exports = router;
