const express = require("express");
const router = express.Router();
const {
  forgotPassword,
  resetPassword,
} = require("../controller/forgotPassword");

router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:id/:token", resetPassword);

module.exports = router;
