const Employee = require("../models/employee"); // Adjust the path as necessary

const employeeCreate = async (req, res) => {
  try {
    const { name, department, position } = req.body;
    const newEmployee = new Employee({ name, department, position });

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

const getEmployees = async (req, res) => {
  try {
    const { employeeCode, employeeName } = req.query;

    let filter = {};

    if (employeeCode) {
      filter.employeeCode = employeeCode;
    }

    if (employeeName) {
      filter.employeeName = { $regex: employeeName, $options: "i" };
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
    const { name, department, position } = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, department, position },
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

module.exports = {
  employeeCreate,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
