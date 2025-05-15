var express = require("express");
var router = express.Router();
const { verifyToken, getUserProfile } = require("../handlers/authentication");
const { getReport } = require("../controllers/reports");


router.get("/downloadReport", verifyToken, getReport);

module.exports = router;