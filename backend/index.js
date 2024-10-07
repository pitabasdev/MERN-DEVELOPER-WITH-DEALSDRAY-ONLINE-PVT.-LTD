const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const Routes = require('./routes/Routes'); 

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(
    cors({
        origin: ["http://localhost:3000", "http://127.0.0.1:5500", "http://127.0.0.1:5501"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        allowedHeaders: ["Origin", "Content-Type", "Authorization", "X-Requested-With"]
    })
);


app.use(Routes);

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    });

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
