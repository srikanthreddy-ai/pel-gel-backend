const Employee = require("../models/employee"); // Adjust the path as necessary

const employeeCreate = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);

    await newEmployee.save();

    res.status(201).send({
      status: true,
      message: "Employee created successfully",
      data: newEmployee,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error creating employee",
      error: error.message,
    });
  }
};

const getEmployeesQuery = async (req, res) => {
  try {
    const { empCode, fullName } = req.query;

    let filter = {};

    if (empCode) {
      filter.empCode = empCode;
    }

    if (fullName) {
      filter.fullName = { $regex: fullName, $options: "i" };
    }

    const employees = await Employee.find(filter);

    res.status(200).send({
      status: true,
      data: employees,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error retrieving employees",
      error: error.message,
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).send({
        status: false,
        message: "Employee not found",
      });
    }

    res.status(200).send({
      status: true,
      data: employee,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error retrieving employee",
      error: error.message,
    });
  }
};
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).send({
        status: false,
        message: "Employee not found",
      });
    }

    res.status(200).send({
      status: true,
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error updating employee",
      error: error.message,
    });
  }
};
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).send({
        status: false,
        message: "Employee not found",
      });
    }

    res.status(200).send({
      status: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error deleting employee",
      error: error.message,
    });
  }
};

const getEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page 1
    const limit = parseInt(req.query.limit) || 10; // Default 10 records per page
    const skip = (page - 1) * limit;
    const { empCode, fullName } = req.query;
    let filter = {};

    if (empCode) {
      filter.empCode = empCode;
    }
    const employees = await Employee.find(filter)
      .skip(skip)
      .limit(limit);
    const total = await Employee.countDocuments();
    res.status(200).json({
      status: true,
      totalItems: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: employees,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error retrieving employees",
      error: error.message,
    });
  }
};

module.exports = {
  employeeCreate,
  getEmployees,
  getEmployeesQuery,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
