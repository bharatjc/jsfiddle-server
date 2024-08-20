const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./route/auth");
require("./config/database");
const Joi = require("joi");
const port = process.env.PORT;
const User = require("./model/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

app.use(cors());

app.use(express.json());
app.get("/", function (req, res) {
  res.send("Welcome to jsfiddle server");
});

app.use("/api", authRoute);

app.post("/api/forgotpassword", function (req, res) {
  const { email } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(404).send({ status: "User does not exist!" });
    }
    const JWT_SECRET_KEY = process.env.SECRET_KEY;
    const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bikashchy184@gmail.com",
        pass: "78$@sfAq",
      },
    });

    var mailOptions = {
      from: "bikashchy184@gmail.com",
      to: email,
      subject: "Reset your password",
      text: `https://jsfiddleserver.onrender.com/api/resetpassword/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error(error);
        return res.status(500).send({ status: "Failed to send email" });
      } else {
        return res.status(200).send({ status: "Success", info });
      }
    });
  });
});

app.listen(port, () => {
  console.log("server is running");
});
