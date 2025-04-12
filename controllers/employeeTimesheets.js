const TimeSheet = require("../models/timeSheets");
const log = require("../handlers/logger");

const creatTimeSheet = async (req, res, next) => {
  try {
    const worksheet = await TimeSheet.create(req.body);
    if (!worksheet) {
      return res.status(400).json({ message: "failed to create timesheet" });
    }
    res.status(201).json(worksheet);
  } catch (error) {
    log.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getAllTimeSheets = async (req, res, next) => {
  try {
    const worksheets = await TimeSheet.find();
    res.status(200).json(worksheets);
  } catch (error) {
    log.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTimeSheetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const worksheet = await TimeSheet.findById(id);
    if (!worksheet) {
      return res.status(404).json({ message: "Timesheet not found" });
    }
    res.status(200).json(worksheet);
  } catch (error) {
    log.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateTimeSheet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedSheet = await TimeSheet.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedSheet) {
      return res.status(404).json({ message: "Timesheet not found" });
    }
    res.status(200).json(updatedSheet);
  } catch (error) {
    log.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  creatTimeSheet,
  getAllTimeSheets,
  getTimeSheetById,
  updateTimeSheet,
};
