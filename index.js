const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./route/auth");
require("./config/database");
const Joi = require("joi");
const port = process.env.PORT;

app.use(cors());

app.use(express.json());
app.get("/", function (req, res) {
  res.send("Welcome to jsfiddle server");
});

app.use("/api", authRoute);

app.listen(port, () => {
  console.log("server is running");
});
