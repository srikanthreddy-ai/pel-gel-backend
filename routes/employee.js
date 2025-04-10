var express = require("express");
var router = express.Router();
const { verifyToken } = require("../handlers/authentication");
const {
  employeeCreate,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee");

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     description: Adds a new employee to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the employee
 *               email:
 *                 type: string
 *                 description: Email of the employee
 *               department:
 *                 type: string
 *                 description: Department of the employee
 *               role:
 *                 type: string
 *                 description: Role of the employee
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/employees", verifyToken, employeeCreate);

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employee]
 *     security:
 *      - bearerAuth: []
 *     description: Retrieves a list of all employees in the system.
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   department:
 *                     type: string
 *                   role:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/employees", verifyToken, getEmployees);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employee]
 *     security:
 *      - bearerAuth: []
 *     description: Retrieves a single employee by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the employee to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The employee's data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 department:
 *                   type: string
 *                 role:
 *                   type: string
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server error
 */
router.get("/employees/:id", verifyToken, getEmployeeById);

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Update an employee's details
 *     tags: [Employee]
 *     security:
 *      - bearerAuth: []
 *     description: Updates the details of an existing employee by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the employee to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the employee
 *               email:
 *                 type: string
 *                 description: Updated email of the employee
 *               department:
 *                 type: string
 *                 description: Updated department of the employee
 *               role:
 *                 type: string
 *                 description: Updated role of the employee
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server error
 */
router.put("/employees/:id", verifyToken, updateEmployee);

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employee]
 *     security:
 *     - bearerAuth: []
 *     description: Deletes an employee from the system by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the employee to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server error
 */
router.delete("/employees/:id", verifyToken, deleteEmployee);

module.exports = router;
