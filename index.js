const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./route/auth");
require("./config/database");
const Joi = require("joi");
const port = process.env.PORT;
const User = require("./model/User");
const nodemailer = require("nodemailer");

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
      return res.send({ status: "User didnot exist!" });
    }
    const JWT_SECRET_KEY = process.env.SECRET_KEY;
    const token = jwt.sign(user, JWT_SECRET_KEY);
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
        console.log(error);
      } else {
        return res.send({ status: "Success" });
      }
    });
  });
});

app.listen(port, () => {
  console.log("server is running");
});
