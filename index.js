const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.use(express.json());

require("./config/database");

const user = require("./routes/user");
const dbConnect = require("./config/database");
dbConnect();
app.use("/api/v1", user);

app.listen(PORT, () => {
  console.log("App is listening on port", PORT);
});
