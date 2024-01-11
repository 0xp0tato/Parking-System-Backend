const Vehicle = require("../models/vehicle.model");

const registerVehicle = async (req, res) => {
  try {
    // Get data from request body
    const { numberPlate, vehicleType } = req.body;

    //Check if data is present or not
    if (!numberPlate || !vehicleType) {
      res.status(400).send({
        message:
          "Invalid request. Either Number Plate or Vehicle Type is missing",
      });
      return;
    }

    //Check for data in DB
    const existedVehicle = await Vehicle.findOne({ numberPlate });

    if (existedVehicle) {
      res.status(403).send({
        message: `Vehicle of number plate ${numberPlate} already parked in the parking space`,
      });
      return;
    }

    //Create data for DB

    const createdVehicle = await Vehicle.create({ numberPlate, vehicleType });

    if (!createdVehicle) {
      res.status(500).send({
        message: `Something went wrong while registering the Vehicle. Please try again later.`,
      });
      return;
    }

    res.status(201).send({ message: `Vehicle is parked in the parking space` });
    return;
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: `${error.message}` });
  }
};

const releaseVehicle = async (req, res) => {
  const { numberPlate } = req.body;

  try {
    if (!numberPlate) {
      res
        .status(400)
        .send({ message: "Invalid request. Number Plate is missing" });
      return;
    }

    const vehicleToRelease = await Vehicle.findOneAndDelete({ numberPlate });

    if (!vehicleToRelease) {
      res.status(404).send({
        message: `Vehicle with number plate ${numberPlate} does not exists`,
      });
      return;
    } else {
      res.status(200).send({
        message: `${vehicleToRelease.vehicleType} with number plate ${vehicleToRelease.numberPlate} released successfully`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerVehicle, releaseVehicle };
