const TimeSheets = require("../../models/timeSheets");
const Allowances = require("../../models/allowances");

/***
 * get report based on the type
 */
const dayWisePayReport = async (startDate, endDate) => {
  try {
    const incentives = await TimeSheets.aggregate([
      {
        $match: {
          productionDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $lookup: {
          from: "employees", // collection to join
          localField: "employee_id", // field in TimeSheets
          foreignField: "_id", // field in Employees
          as: "employee",
        },
      },
      {
        $unwind: "$employee", // flatten the array (optional but common)
      },
      {
        $project: {
          _id: 1,
          productionDate: 1,
          shiftName: 1,
          incentiveAmount: 1,
          employee_id: 1,
          employeeCode: 1,
          "employee.fullName": 1,
          "employee.empCode": 1,
        },
      },
    ]);

    const allowances = await Allowances.aggregate([
      {
        $match: {
          productionDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $lookup: {
          from: "Employee", // collection to join
          localField: "employee_id", // field in TimeSheets
          foreignField: "_id", // field in Employees
          as: "employees",
        },
      },
      {
        $project: {
          _id: 1,
          productionDate: 1,
          employee_id: 1,
          empCode: 1,
          amount: 1,
          allowance_id: 1,
        },
      },
    ]);

    const groupedData = new Map();

    const getKey = (empCode, date) =>
      `${empCode}__${new Date(date).toISOString().split("T")[0]}`;

    // Process incentives
    for (const i of incentives) {
      const key = getKey(i.employeeCode, i.productionDate);
      const entry = groupedData.get(key) || {
        productionDate: new Date(i.productionDate).toISOString().split("T")[0],
        empCode: i.employeeCode,
        incentives: 0,
        allowances: 0,
        total: 0,
      };
      const incentiveAmount = parseInt(i.incentiveAmount) || 0;
      entry.incentives += incentiveAmount;
      groupedData.set(key, entry);
    }

    // Process allowances
    for (const a of allowances) {
      const key = getKey(a.empCode, a.productionDate);
      const entry = groupedData.get(key) || {
        productionDate: new Date(a.productionDate).toISOString().split("T")[0],
        empCode: a.empCode,
        incentives: 0,
        allowances: 0,
        total: 0,
      };
      const allowanceAmount = parseInt(a.amount) || 0;
      entry.allowances += allowanceAmount;
      groupedData.set(key, entry);
    }
    for (const [key, entry] of groupedData) {
      entry.total = entry.incentives + entry.allowances;
    }

    const finalGroupedData = Array.from(groupedData.values());

    return finalGroupedData;
  } catch (error) {
    console.error("Error generating report:", error);
    throw new Error("Failed to generate report.");
  }
};

const monthWisePayReport = async (req, res) => {
  try {
    const { report, type, startDate, endDate } = req.query;

    // Validate input parameters
    if (!report || !type || !startDate || !endDate) {
      return res.status(400).send("Missing required parameters.");
    }

    // Check if the date range is valid
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);
    if (dayDiff > 31) {
      return res.status(400).send("Date range should not exceed 31 days.");
    }

    // Report generation logic based on type
    if (type === "PDF") {
      generatePDF(res, report, startDate, endDate);
    } else if (type === "Excel") {
      generateExcel(res, report, startDate, endDate);
    } else if (type === "HTML") {
      generateHTML(res, report, startDate, endDate);
    } else {
      return res.status(400).send("Invalid report type.");
    }
    res.status(200).send({
      status: true,
      data: mappedData,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      error: error.message,
    });
  }
};
module.exports = {
  dayWisePayReport,
  monthWisePayReport,
};
