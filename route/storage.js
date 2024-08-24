const express = require("express");
const router = express.Router();
const {
  savedata,
  getdata,
  gettitles,
  deletefile,
} = require("../controller/storage");
const { checkAuthentication } = require("../middleware/checkAuthentication");

router.post("/savedata", checkAuthentication, savedata);
router.get("/getdata/:title", checkAuthentication, getdata);
router.get("/gettitles/:userId", checkAuthentication, gettitles);
router.delete("/deletefile/:id", checkAuthentication, deletefile);

module.exports = router;
