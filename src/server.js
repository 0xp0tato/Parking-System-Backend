const express = require("express");
const cors = require("cors");
const dbConnect = require("./db/dbConnect");

require("dotenv").config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

// connect to DB
dbConnect();

app.use(express.json());
app.use(cors());

// import routers
const userRouter = require("./routes/vehicle.route");

app.use("/api/v1/vehicle", userRouter);

app.listen(port, () => {
  console.log(`🌐 Server is listening on http://localhost:${port}`);
});
