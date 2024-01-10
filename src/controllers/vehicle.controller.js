const Vehicle = require("../models/vehicle.model");

const registerVehicle = async (req, res) => {
  try {
    // Get data from request body
    const { numberPlate, vehicleType } = req.body;

    //Check if data is present or not
    if (!numberPlate || !vehicleType) {
      res
        .status(400)
        .send(
          "Invalid request. Either Number Plate or Vehicle Type is missing"
        );
      return;
    }

    //Check for data in DB
    const existedVehicle = await Vehicle.findOne({ numberPlate });

    if (existedVehicle) {
      res
        .status(403)
        .send(
          `Vehicle of number plate ${numberPlate} already parked in the parking space`
        );
      return;
    }

    //Create data for DB

    const CreatedVehicle = await Vehicle.create({ numberPlate, vehicleType });

    if (!CreatedVehicle) {
      res
        .status(500)
        .send(
          `Something went wrong while registering the Vehicle. Please try again later.`
        );
      return;
    }

    res.status(201).send(`Vehicle is parked in the parking space`);
    return;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerVehicle };
