const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
require("./config/database");

const user = require("./routes/user");
const dbConnect = require("./config/database");
dbConnect();
app.use("/api/v1", user);

app.listen(PORT, () => {
  console.log("App is listening on port", PORT);
});
