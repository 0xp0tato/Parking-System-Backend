const { mongoose } = require("mongoose");

const dbConnect = async () => {
  const dbURI = process.env.MONGODB_URI;
  try {
    const res = await mongoose.connect(dbURI);

    if (res) console.log("Connected to database");

    return;
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;
