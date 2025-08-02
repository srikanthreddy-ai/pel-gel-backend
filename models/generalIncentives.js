const mongoose = require("mongoose");

const generalIncentives = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    building_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductionDept",
        required: true,
    },
    production_from_date: {
        type: Date,
        required: true,
    },
    production_to_date: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        index: true,
    },
});

generalIncentives.index({ production_from_date: 1, production_to_date: 1 }, { unique: true });
module.exports = mongoose.model("generalIncentives", generalIncentives);
