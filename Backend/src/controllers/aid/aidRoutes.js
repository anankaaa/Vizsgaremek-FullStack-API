const express = require("express");
const aidController = require("./aidController");

const router = express.Router();

router.route("/").get(aidController.getAllAids).post(aidController.createAid);

router
  .route("/:id")
  .get(aidController.getAid)
  .patch(aidController.updateAid)
  .delete(aidController.deleteAid);

module.exports = router;
