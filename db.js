const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
// connectng to database
const connectToDB = (mongoURl) => {
  return mongoose.connect(mongoURl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// export of connectToDB function
module.exports = connectToDB;