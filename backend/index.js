const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
