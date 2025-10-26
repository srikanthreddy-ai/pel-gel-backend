const TimeSheets = require("../../models/timeSheets");
const Allowances = require("../../models/allowances");
const { Types } = require('mongoose');
const e = require("express");

/***
 * get report based on the type
 */
const dayWisePayReport = async (startDate, endDate, building) => {
  try {
    const buildingFilter = building && building !== 'all' ? { building_id: new Types.ObjectId(building) } : {};
    const incentives = await TimeSheets.aggregate([
      // 1️⃣ Filter records by date range (and optional building filter)
      {
        $match: {
          productionDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
          ...buildingFilter, // e.g. { building_id: ObjectId("...") }
        },
      },

      // 2️⃣ Lookup employee details
      {
        $lookup: {
          from: "employees",
          localField: "employee_id",
          foreignField: "_id",
          as: "employee",
        },
      },

      // 3️⃣ Lookup building details
      {
        $lookup: {
          from: "productiondept",
          localField: "building_id",
          foreignField: "_id",
          as: "building",
        },
      },

      // 4️⃣ Safely unwind the joined arrays
      {
        $unwind: {
          path: "$employee",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$building",
          preserveNullAndEmptyArrays: true,
        },
      },

      // 5️⃣ Shape the output data (cleaner and more readable)
      {
        $project: {
          _id: 1,
          productionDate: 1,
          shiftName: 1,
          shiftHrs: 1,
          workedHrs: 1,
          incentiveAmount: 1,

          employee_id: 1,
          building_id: 1,

          // cleaner, flatter naming for easier use in frontend / API response
          employeeName: "$employee.fullName",
          employeeCode: "$employee.empCode",
          buildingName: "$building.buildingName",
        },
      },

      // 6️⃣ (Optional) Sort for predictable results
      {
        $sort: {
          productionDate: 1,
          employeeName: 1,
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
          ...buildingFilter,
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
        $project: {
          _id: 1,
          productionDate: 1,
          employee_id: 1,
          empCode: 1,
          amount: 1,
          allowance_id: 1,
          building_id: 1, // Include building_id if needed
          "employee.fullName": 1,
          "employee.empCode": 1,
          shiftHrs: 1,
          workedHrs: 1,
        },
      },
    ]);

    const groupedData = new Map();

    const getKey = (empCode, date) =>
      `${empCode}__${new Date(date).toISOString().split("T")[0]}`;

    console.log("Incentives:", incentives);
    console.log("Allowances:", allowances);
    // Process incentives
    for (const incentive of incentives) {
      const { employeeCode, productionDate, employee, incentiveAmount } = incentive;
      const key = getKey(employeeCode, productionDate);
      const entry = groupedData.get(key) || {
        productionDate: new Date(productionDate).toISOString().split("T")[0],
        empCode: incentive?.employeeCode || "Unknown",
        employeeName: incentive?.employeeName || "Unknown",
        incentives: 0,
        allowances: 0,
        total: 0,
        workedHrs: incentive?.workedHrs,
        shiftHrs: incentive?.shiftHrs,
        building: incentive?.buildingName || "Unknown",
      };
      const amount = parseFloat(incentiveAmount) || 0;
      entry.incentives += amount;
      groupedData.set(key, entry);
    }

    // Process allowances
    for (const allowence of allowances) {
      const { empCode, productionDate, employee, amount } = allowence;
      const key = getKey(empCode, productionDate);
      const entry = groupedData.get(key) || {
        productionDate: new Date(productionDate).toISOString().split("T")[0],
        empCode: empCode,
        employeeName: employee?.fullName || "Unknown",
        incentives: 0,
        allowances: 0,
        total: 0,
      };
      const allowanceAmount = parseFloat(amount) || 0;
      entry.allowances += allowanceAmount;
      groupedData.set(key, entry);
    }
    for (const [key, entry] of groupedData) {
      entry.total = entry.incentives + entry.allowances;
    }
    const sortedGroupedData = Array.from(groupedData.values()).sort((a, b) => {
      return new Date(a.productionMonth) - new Date(b.productionMonth);
    });

    const finalGroupedData = Array.from(sortedGroupedData.values());

    return finalGroupedData;
  } catch (error) {
    console.error("Error generating report:", error);
    throw new Error("Failed to generate report.");
  }
};

const monthWisePayReport = async (startDate, endDate, building) => {
  try {
    // Aggregate Incentives for the given month range
    const buildingFilter = building && building !== 'all' ? { building_id: new Types.ObjectId(building) } : {};
    const incentives = await TimeSheets.aggregate([
      // 1️⃣ Filter by production date range and (optional) building filter
      {
        $match: {
          productionDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
          ...buildingFilter, // e.g. { building_id: ObjectId("...") }
        },
      },

      // 2️⃣ Lookup employee details
      {
        $lookup: {
          from: "employees",
          localField: "employee_id",
          foreignField: "_id",
          as: "employee",
        },
      },

      // 3️⃣ Lookup building details
      {
        $lookup: {
          from: "productiondept",
          localField: "building_id",
          foreignField: "_id",
          as: "building",
        },
      },

      // 4️⃣ Unwind the arrays (if there’s always one match, preserve nulls just in case)
      {
        $unwind: {
          path: "$employee",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$building",
          preserveNullAndEmptyArrays: true,
        },
      },

      // 5️⃣ Project only the fields you actually need
      {
        $project: {
          _id: 1,
          productionDate: 1,
          shiftName: 1,
          workedHrs: 1,
          shiftHrs: 1,
          incentiveAmount: 1,
          employee_id: 1,
          building_id: 1,
          employeeCode: "$employee.empCode", // rename for clarity
          employeeName: "$employee.fullName",
          buildingName: "$building.buildingName",
          buildingRefId: "$building._id",
        },
      },

      // 6️⃣ (Optional) Sort results
      {
        $sort: {
          productionDate: 1,
          employeeName: 1,
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
          ...buildingFilter
        },
      },
      {
        $lookup: {
          from: "employee", // collection to join
          localField: "employee_id", // field in TimeSheets
          foreignField: "_id", // field in Employees
          as: "employee",
        },
      },
      {
        $lookup: {
          from: "productiondept", // collection to join
          localField: "building_id", // field in TimeSheets
          foreignField: "_id", // field in Buildings
          as: "building",
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
          "employee.fullName": 1,
          "employee.empCode": 1,
          "building.buildingName": 1,
          building_id: 1, // Include building_id if needed
        },
      },
    ]);

    const groupedData = new Map();
    console.log("MIncentives:", incentives);
    console.log("MAllowances:", allowances);
    const getKey = (empCode, date) =>
      `${empCode}__${new Date(date).toISOString().split("T")[0].slice(0, 7)}`; // Group by YYYY-MM
    // Process Incentives for month
    for (const i of incentives) {
      const key = getKey(i.employeeCode, i.productionDate);
      const entry = groupedData.get(key) || {
        productionMonth: new Date(i.productionDate).toISOString().split("T")[0].slice(0, 7),
        empCode: i.employeeCode,
        employeeName: i.employeeName,
        incentives: 0,
        allowances: 0,
        total: 0,
        workedHrs: i.workedHrs,
        shiftHrs: i.shiftHrs,
        incentive_building: i.buildingName,
      };
      const incentiveAmount = parseFloat(i.incentiveAmount) || 0;
      entry.incentives += incentiveAmount;
      groupedData.set(key, entry);
    }

    // Process Allowances for month
    for (const a of allowances) {
      const key = getKey(a.empCode, a.productionDate);
      const entry = groupedData.get(key) || {
        productionMonth: new Date(a.productionDate).toISOString().split("T")[0].slice(0, 7),
        empCode: a.empCode,
        employeeName: a.employee.fullName,
        incentives: 0,
        allowances: 0,
        total: 0,
        allowance_building: a.building.buildingName,
      };
      const allowanceAmount = parseFloat(a.amount) || 0;
      entry.allowances += allowanceAmount;
      groupedData.set(key, entry);
    }

    const sortedGroupedData = Array.from(groupedData.values()).sort((a, b) => {
      return new Date(a.productionMonth) - new Date(b.productionMonth);
    });

    // Calculate total for each entry
    for (const entry of sortedGroupedData) {
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
