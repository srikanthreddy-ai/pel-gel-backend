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
const getAllTimeSheets = async (req, res, next) => {
  try {
    const { building, nature, shift, fromDate, toDate } = req.query;
    const page = parseInt(req.query.page) || 1; // Default page 1
    const limit = parseInt(req.query.limit) || 10; // Default 10 records per page
    const skip = (page - 1) * limit;
    const filter = {};

    if (building) filter.building_id = building;
    if (nature) filter.nature_id = nature;
    if (shift) filter.shiftName = shift;

    // Handle exact date match by creating a date range
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      end.setDate(end.getDate() + 1);
      filter.productionDate = { $gte: start, $lt: end };
    }

    const [worksheets, total] = await Promise.all([
      TimeSheet.find(filter)
        .skip(skip)
        .limit(limit)
        .populate('building_id', '_id buildingName buildingCode')
        .populate('employee_id', '_id firstName lastName empCode fullName')
        .populate('nature_id', '_id productionNature productionType productionCode manpower norms'),

      TimeSheet.countDocuments(filter)
    ]);
    res.status(200).json({
      status: true,
      totalItems: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: worksheets,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
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
