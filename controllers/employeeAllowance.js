const Allowance = require("../models/allowances");
const log = require("../handlers/logger");

const creatAllowance = async (req, res, next) => {
  try {
    const worksheet = await Allowance.create(req.body);
    if (!worksheet) {
      return res.status(400).json({ message: "failed to create timesheet" });
    }
    res.status(201).json(worksheet);
  } catch (error) {
    if (error.code === 11000) {
      log.error("Duplicate timesheet entry:", error);
      return res.status(409).json({
        message: `Duplicate timesheet entry. Employee and shift combination must be unique.`,
        error: error.message,
      });
    }

    // Log other errors and send a generic server error response
    log.error("Error creating timesheet:", error);
    return res.status(500).json({
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};
const getAllAllowances = async (req, res, next) => {
  try {
    const { empCode, fromDate, toDate } = req.query;

    let filter = {};

    if (empCode) {
      filter.empCode = empCode;
    }

    // Handle exact date match by creating a date range
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      end.setDate(end.getDate() + 1);
      filter.productionDate = { $gte: start, $lt: end };
    }

    const worksheets = await Allowance.find(filter)
      .populate("employee_id", "_id firstName lastName empCode fullName")
      .populate("allowance_id", "_id allowence amount shift")
      .populate("building_id", "_id buildingName");
    if (!worksheets || worksheets.length === 0) {
      return res.status(404).json({ message: "No timesheets found" });
    }

    res.status(200).json({ status: true, data: worksheets });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllowanceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const worksheet = await Allowance.findById(id);
    if (!worksheet) {
      return res.status(404).json({ message: "Timesheet not found" });
    }
    res.status(200).json(worksheet);
  } catch (error) {
    log.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateAllowance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedSheet = await Allowance.findByIdAndUpdate(id, req.body, {
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
  creatAllowance,
  getAllAllowances,
  getAllowanceById,
  updateAllowance,
};
