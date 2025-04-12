const mongoose = require("mongoose");

const ProductionNature = new mongoose.Schema({
  building_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductionDept',
    required: true,
  },
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
    unique: true,
  },
  manpower: {
    type: Number,
    required: true,
  },
  norms: {
    type: Number,
    required: true,
  },
  incentives: [
    {
      range: {
        type: Array,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      each: {
        type: Number,
        required: true,
      },
    },
  ],
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
