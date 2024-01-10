const express = require("express");
const { registerVehicle } = require("../controllers/vehicle.controller");
const router = express.Router();

router.route("/register-vehicle").post(registerVehicle);

module.exports = router;
