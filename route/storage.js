const express = require("express");
const router = express.Router();
const { savedata, getdata, gettitles } = require("../controller/storage");
const { checkAuthentication } = require("../middleware/checkAuthentication");

router.post("/savedata", checkAuthentication, savedata);
router.get("/getdata", checkAuthentication, getdata);
router.get("/gettitles", checkAuthentication, gettitles);

module.exports = router;
