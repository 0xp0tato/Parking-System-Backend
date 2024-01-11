const express = require("express");
const {
  registerVehicle,
  releaseVehicle,
} = require("../controllers/vehicle.controller");
const router = express.Router();

router.route("/register-vehicle").post(registerVehicle);
router.route("/release-vehicle").delete(releaseVehicle);

module.exports = router;
