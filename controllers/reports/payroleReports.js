const TimeSheets = require("../../models/timeSheets");
const Allowances = require("../../models/allowances");

/***
 * get report based on the type
 */
const dayWisePayReport = async (startDate, endDate, building) => {
  try {
    const incentives = await TimeSheets.aggregate([
      {
        $match: {
          productionDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
          ...(building ? { building_id: building } : {}),
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

const monthWisePayReport = async (startDate, endDate, building) => {
  try {
    // Aggregate Incentives for the given month range
    const incentives = await TimeSheets.aggregate([
      {
        $match: {
          productionDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
          ...(building ? { building_id: building } : {}),
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
        $unwind: "$employee", // flatten the array
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

    // Aggregate Allowances for the given month range
    const allowances = await Allowances.aggregate([
      {
        $match: {
          productionDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
          ...(building ? { building_id: building } : {}),
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
      `${empCode}__${new Date(date).toISOString().split("T")[0].slice(0, 7)}`; // Group by YYYY-MM

    // Process Incentives for month
    for (const i of incentives) {
      const key = getKey(i.employeeCode, i.productionDate);
      const entry = groupedData.get(key) || {
        productionMonth: new Date(i.productionDate).toISOString().split("T")[0].slice(0, 7),
        empCode: i.employeeCode,
        incentives: 0,
        allowances: 0,
        total: 0,
      };
      const incentiveAmount = parseInt(i.incentiveAmount) || 0;
      entry.incentives += incentiveAmount;
      groupedData.set(key, entry);
    }

    // Process Allowances for month
    for (const a of allowances) {
      const key = getKey(a.empCode, a.productionDate);
      const entry = groupedData.get(key) || {
        productionMonth: new Date(a.productionDate).toISOString().split("T")[0].slice(0, 7),
        empCode: a.empCode,
        incentives: 0,
        allowances: 0,
        total: 0,
      };
      const allowanceAmount = parseInt(a.amount) || 0;
      entry.allowances += allowanceAmount;
      groupedData.set(key, entry);
    }

    // Calculate total for each entry
    for (const [key, entry] of groupedData) {
      entry.total = entry.incentives + entry.allowances;
    }

    // Convert map to array
    const finalGroupedData = Array.from(groupedData.values());

    return finalGroupedData;
  } catch (error) {
    console.error("Error generating report:", error);
    throw new Error("Failed to generate report.");
  }
};

module.exports = {
  dayWisePayReport,
  monthWisePayReport,
};
