const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Db connection established"))
    .catch((e) => {
      console.log("Error connecting to database");
      process.exit(1);
    });
};

module.exports = dbConnect;
