require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const connectToDB = require("./db");
const port = process.env.PORT || 5000;
const cors = require("cors");
const mongoURl = process.env.Mongo_Url;
app.use(cors());
app.use(express.json()); // Used to parse JSON bodies

//Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/appointment", require("./routes/appointment"));
app.use("/api/medicalhistory", require("./routes/medhist"));

//extra middlewares
app.use(require("./middlewares/errorHandler"));
app.use(require("./middlewares/not-found"));

//connecting to db and starting server
const start = async () => {
  await connectToDB(mongoURl);
  await app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
  });
};
start();
