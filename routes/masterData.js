var express = require("express");
var router = express.Router();
const { verifyToken, getUserProfile } = require("../handlers/authentication");
const { uploadEmployee, uploadMasterData, uploadAllowenceMasterData } = require("../controllers/bulkUpload");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });


router.post("/employeeUpload", verifyToken, upload.single("file"), uploadEmployee);
router.post("/masterDataUpload", verifyToken, upload.single("file"), uploadMasterData);
router.post("/AllowenceDataUpload", verifyToken, upload.single("file"), uploadAllowenceMasterData);

module.exports = router;