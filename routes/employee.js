var express = require("express");
var router = express.Router();
const { verifyToken } = require("../handlers/authentication");
const {
  employeeCreate,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeesQuery,
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
 *               title:
 *                 type: string 
 *                 enum: ["Mr", "Ms", "Mrs", "Dr"]
 *                 example: Mr  
 *                 description: Title of the employee (e.g., Mr., Ms.)
 *               firstName:
 *                 type: string
 *                 example: John
 *                 description: First name of the employee
 *               middleName:
 *                 type: string
 *                 example: A
 *                 description: Middle name of the employee
 *               lastName:
 *                 type: string
 *                 example: Doe    
 *                 description: Last name of the employee        
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *                 description: Email of the employee
 *               department:
 *                 type: string
 *                 example: HR
 *                 description: Department of the employee
 *               cader:
 *                 type: string
 *                 example: Manager
 *                 description: employee cader  
 *               empCode:
 *                 type: string
 *                 example: EMP12345
 *                 description: Employee code
 *               designation:
 *                 type: string
 *                 example: Software Engineer
 *                 description: Designation of the employee
 *               pfNo:
 *                 type: string
 *                 example: PF123456              
 *                 description: PF number
 *               basic:
 *                 type: number
 *                 example: 50000
 *                 description: Basic salary
 *               fda:
 *                 type: number
 *                 example: 2000
 *                 description: FDA (Fixed Dearness Allowance)
 *               newVda:
 *                 type: number
 *                 example: 1500
 *                 description: New VDA (Variable Dearness Allowance)
 *               splPay:
 *                 type: number
 *                 example: 1000
 *                 description: Special Pay
 *               hra:
 *                 type: number
 *                 example: 8000
 *                 description: House Rent Allowance
 *               ca:
 *                 type: number
 *                 description: Conveyance Allowance
 *               sa:
 *                 type: number
 *                 example: 500
 *                 description: Special Allowance
 *               ea:
 *                 type: number
 *                 example: 300
 *                 description: Extra Allowance
 *               serAllow:
 *                 type: number
 *                 description: Service Allowance
 *                 example: 1000
 *               linkMaintQcStoresAllow:
 *                 type: number
 *                 example: 200
 *                 description: Link Maintenance / QC / Stores Allowance
 *               seniorityAllow:
 *                 type: number
 *                 example: 100
 *                 description: Seniority Allowance
 *               stdGrossTotal:
 *                 type: number
 *                 example: 70000
 *                 description: Standard Gross Total
 *               dateOfProbation:
 *                 type: string
 *                 example: "2023-01-01"
 *                 format: date
 *                 description: Date of probation
 *               totalGrossWithCantAb:
 *                 type: number
 *                 example: 75000
 *                 description: Total Gross + Canteen + AB
 *               uanNumber:
 *                 type: string
 *                 example: UAN123456789
 *                 description: UAN Number
 *               dateOfBirth:
 *                 type: string
 *                 example: "1990-01-01"
 *                 format: date
 *                 description: Date of Birth
 *               dateOfJoining:
 *                 type: string
 *                 example: "2023-01-01"
 *                 format: date
 *                 description: Date of Joining
 *               s/o:
 *                 type: string
 *                 example: "John Doe"
 *                 description: S/O (Son Of)
 *               bankDetails:
 *                 type: object
 *                 description: Bank account information
 *                 properties:
 *                   accountNumber:
 *                     type: string
 *                     description: Bank account number
 *                     example: "1234567890123456"
 *                   ifscCode:
 *                     type: string
 *                     description: IFSC code of the bank
 *                     example: "SBIN0001234"
 *                   bankName:
 *                     type: string
 *                     description: Name of the bank
 *                     example: "State Bank of India"
 *                   branchName:
 *                     type: string
 *                     description: Name of the bank branch
 *                     example: "Main Branch"
 *                   accountHolderName:
 *                     type: string
 *                     description: Name of the account holder
 *                     example: "John Doe"       
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
 * /employeesList:
 *   get:
 *     summary: Get all employees
 *     tags: [Employee]
 *     security:
 *      - bearerAuth: []
 *     description: Retrieves a list of all employees in the system.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: pagelimit number
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
router.get("/employeesList", verifyToken, getEmployees);

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

/**
 * @swagger
 * /employeesQuery:
 *   get:
 *     summary: Get employees with query parameters
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves a list of all employees. Supports filtering by empCode or fullName.
 *     parameters:
 *       - in: query
 *         name: empCode
 *         schema:
 *           type: string
 *         description: Filter employees by Employee Code
 *       - in: query
 *         name: fullName
 *         schema:
 *           type: string
 *         description: Filter employees by Full Name
 *     responses:
 *       200:
 *         description: A list of employees based on the filter
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
 *                   empCode:
 *                     type: string
 *                   fullName:
 *                     type: string
 *       500:
 *         description: Server error
 */

router.get("/employeesQuery", verifyToken, getEmployeesQuery);


module.exports = router;
