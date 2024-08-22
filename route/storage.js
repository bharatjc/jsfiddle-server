const express = require("express");
const router = express.Router();
const { savedata, getdata } = require("../controller/storage");
const { checkAuthentication } = require("../middleware/checkAuthentication");

router.post("/savedata", checkAuthentication, savedata);
router.get("/getdata", checkAuthentication, getdata);

module.exports = router;
