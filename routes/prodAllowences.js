var express = require("express");
var router = express.Router();
const { verifyToken } = require("../handlers/authentication");
const {
  createProductionAllowence,
  getProductionAllowence,
  getProductionAllowenceById,
  updateProductionAllowence,
} = require("../controllers/allowences");

router.post("/createAllowence", verifyToken, createProductionAllowence);
router.get("/getAllowences", verifyToken, getProductionAllowence);
router.get("/getAllowence/:id", verifyToken, getProductionAllowenceById);
router.put("/updateAllowence/:id", verifyToken, updateProductionAllowence);

module.exports = router;
