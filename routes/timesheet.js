var express = require("express");
var router = express.Router();
const { verifyToken } = require("../handlers/authentication");
const {
  creatTimeSheet,
  getAllTimeSheets,
  getTimeSheetById,
  updateTimeSheet,
  createGeneralIncentive
} = require("../controllers/employeeTimesheets");
const {
  creatAllowance,
  getAllAllowances,
  updateAllowance,
} = require("../controllers/employeeAllowance");

/**
 * @swagger
 * /createTimeSheet:
 *   post:
 *     summary: Create a new TimeSheet entry
 *     tags: [TimeSheet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - building_id
 *               - naturre_id
 *               - employee_id
 *               - shiftName
 *               - employeeCode
 *               - incentiveAmount
 *               - allowenceAmount
 *               - norms
 *               - dateTime
 *             properties:
 *               building_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the building (from ProductionDept)
 *                 example: "643f1bdeec1234567890abcd"
 *               naturre_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the production nature (from ProductionNature)
 *                 example: "643f1bdeec1234567890def0"
 *               employee_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the employee (from Employee)
 *                 example: "643f1bdeec1234567890ef12"
 *               shiftName:
 *                 type: string
 *                 description: Name of the shift
 *                 example: "Morning"
 *               employeeCode:
 *                 type: string
 *                 description: Unique code of the employee
 *                 example: "EMP1234"
 *               incentiveAmount:
 *                 type: number
 *                 description: Incentive amount assigned
 *                 example: 500
 *               allowenceAmount:
 *                 type: number
 *                 description: Allowance amount assigned
 *                 example: 200
 *               norms:
 *                 type: number
 *                 description: Norms set for the work
 *                 example: 100
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *                 description: Date and time of the timesheet entry
 *                 example: "2025-04-12T08:30:00.000Z"
 *     responses:
 *       201:
 *         description: TimeSheet created successfully
 *       400:
 *         description: Failed to create timesheet
 *       500:
 *         description: Internal server error
 */

router.post("/createTimeSheet", verifyToken, creatTimeSheet);
/**
 * @swagger
 * /getAllTimeSheets:
 *   get:
 *     summary: Retrieve all TimeSheet entries
 *     tags: [TimeSheet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all timesheets
 *       500:
 *         description: Internal server error
 */
router.get("/getAllTimeSheets", verifyToken, getAllTimeSheets);
/**
 * @swagger
 * /getTimeSheet/{id}:
 *   get:
 *     summary: Get a single TimeSheet by ID
 *     tags: [TimeSheet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the TimeSheet
 *     responses:
 *       200:
 *         description: TimeSheet data retrieved
 *       404:
 *         description: Timesheet not found
 *       500:
 *         description: Internal server error
 */
router.get("/getTimeSheet/:id", verifyToken, getTimeSheetById);
/**
 * @swagger
 * /updateTimeSheet/{id}:
 *   put:
 *     summary: Update a TimeSheet by ID
 *     tags: [TimeSheet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the TimeSheet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TimeSheet'
 *     responses:
 *       200:
 *         description: Timesheet updated successfully
 *       404:
 *         description: Timesheet not found
 *       500:
 *         description: Internal server error
 */
router.put("/updateTimeSheet/:id", verifyToken, updateTimeSheet);

router.post("/createEmpAllowence", verifyToken, creatAllowance);
router.get("/getEmpAllowences", verifyToken, getAllAllowances);
router.put("/updateEmpAllowence/:id", verifyToken, updateAllowance);
router.post("/createGeneralIncentive", verifyToken, createGeneralIncentive);
module.exports = router;
