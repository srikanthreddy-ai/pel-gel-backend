const mongoose = require("mongoose");

const ProductionNature = new mongoose.Schema({
  productionNature: {
    type: String,
    required: true,
  },
  productionType: {
    type: String,
    required: true,
  },
  productionCode: {
    type: String,
    required: true,
  },
  manpower: {
    type: Number,
    required: true,
  },
  norms: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const Nature = mongoose.model("ProductionNature", ProductionNature);

module.exports = Nature;
