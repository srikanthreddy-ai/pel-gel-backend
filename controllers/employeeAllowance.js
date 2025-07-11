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
    const { empCode, fromDate, toDate, page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    let filter = {};

    if (empCode) {
      filter.empCode = empCode;
    }

    // Handle date range filter
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      end.setDate(end.getDate() + 1); // Include the full end date
      filter.productionDate = { $gte: start, $lt: end };
    }

    // Count total documents matching filter
    const totalItems = await Allowance.countDocuments(filter);

    // Query paginated data
    const worksheets = await Allowance.find(filter)
      .populate("employee_id", "_id firstName lastName empCode fullName")
      .populate("allowance_id", "_id allowence amount shift")
      .populate("building_id", "_id buildingName")
      .skip(skip)
      .limit(limitNum)
      .sort({ productionDate: 1 }); // Optional: sort ascending by date

    if (!worksheets || worksheets.length === 0) {
      return res.status(404).json({ message: "No allowances found" });
    }

    res.status(200).json({
      status: true,
      currentPage: pageNum,
      totalItems,
      totalPages: Math.ceil(totalItems / limitNum),
      data: worksheets,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
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
