const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const vehicleEnum = {
  values: ["Bike", "Car", "Truck", "Plane"],
  message: "Invalid vehicle type with value `{VALUE}`",
};

const vehicleSchema = new Schema(
  {
    numberPlate: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    vehicleType: {
      type: String,
      required: true,
      trim: true,
      enum: vehicleEnum,
    },
  },
  { timestamps: true }
);

module.exports = Vehicle = mongoose.model("vehicle", vehicleSchema);
