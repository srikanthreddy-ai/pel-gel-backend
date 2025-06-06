/**
 * @file master.js
 * @description Routes for managing Production Departments, Natures, and Shifts
 */

const express = require("express");
const router = express.Router();
const { verifyToken } = require("../handlers/authentication");

const {
  createProductionDept,
  getProductionDepts,
  getProductionDeptById,
  updateProductionDept,
  deleteProductionDept,
  createProductionNature,
  getProductionNatures,
  getProductionNatureById,
  updateProductionNature,
  deleteProductionNature,
  createProductionShift,
  getProductionShifts,
  getProductionShiftById,
  updateProductionShift,
  deleteProductionShift,
  uploadMasterData
} = require("../controllers/master");

// ────────────── Production Dept ──────────────

/**
 * @swagger
 * /ProductionDept:
 *   post:
 *     summary: Create a new Production Department
 *     tags: [ProductionDept]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - buildingId
 *               - buildingName
 *               - buildingCode
 *               - startDate
 *               - endDate
 *             properties:
 *               buildingId:
 *                 type: number
 *                 description: Unique identifier of the building
 *                 example: 101
 *               buildingName:
 *                 type: string
 *                 description: Name of the building where the department is located
 *                 example: Main Manufacturing Unit
 *               buildingCode:
 *                 type: string
 *                 description: Unique building code
 *                 example: MFG-01
 *               description:
 *                 type: string
 *                 description: Additional details about the department
 *                 example: Handles electronic component assembly
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Department operational start date (YYYY-MM-DD)
 *                 example: 2024-01-01
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: Department operational end date (YYYY-MM-DD)
 *                 example: 2026-12-31
 *     responses:
 *       201:
 *         description: Created successfully
 */


router.post("/ProductionDept", verifyToken, createProductionDept);

/**
 * @swagger
 * /ProductionDept:
 *   get:
 *     summary: Get all Production Departments
 *     tags: [ProductionDept]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of departments
 */
router.get("/ProductionDept", verifyToken, getProductionDepts);

/**
 * @swagger
 * /ProductionDept/{id}:
 *   get:
 *     summary: Get a Production Department by ID
 *     tags: [ProductionDept]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Department details
 */
router.get("/ProductionDept/:id", verifyToken, getProductionDeptById);

/**
 * @swagger
 * /ProductionDept/{id}:
 *   put:
 *     summary: Update a Production Department
 *     tags: [ProductionDept]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
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
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.put("/ProductionDept/:id", verifyToken, updateProductionDept);

/**
 * @swagger
 * /ProductionDept/{id}:
 *   delete:
 *     summary: Delete a Production Department
 *     tags: [ProductionDept]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete("/ProductionDept/:id", verifyToken, deleteProductionDept);

// ────────────── Production Nature ──────────────

/**
 * @swagger
 * /ProductionNature:
 *   post:
 *     summary: Create a new Production Nature
 *     tags: [ProductionNature]
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
 *               - productionNature
 *               - productionType
 *               - productionCode
 *               - manpower
 *               - norms
 *               - startDate
 *               - endDate
 *             properties:
 *               building_id:
 *                 type: string
 *                 format: uuid
 *                 description: ObjectId reference to the Production Department
 *                 example: 643f1bdeec1234567890abcd
 *               productionNature:
 *                 type: string
 *                 description: Nature of production (e.g., Continuous, Batch)
 *                 example: Batch
 *               productionType:
 *                 type: string
 *                 description: Type of production carried out
 *                 example: group
 *               productionCode:
 *                 type: string
 *                 description: Unique code to identify the production nature
 *                 example: PDC-001
 *               manpower:
 *                 type: number
 *                 description: Number of people required for this production nature
 *                 example: 12
 *               norms:
 *                 type: number
 *                 description: Production norms or standards to follow
 *                 example: 140000
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the production nature (YYYY-MM-DD)
 *                 example: 2024-04-01
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of the production nature (YYYY-MM-DD)
 *                 example: 2025-03-31
 *               incentives:
 *                 type: array
 *                 description: Array of incentive objects with min, max, amount, and value per unit
 *                 items:
 *                   type: object
 *                   required:
 *                     - min
 *                     - max 
 *                     - amount
 *                     - each
 *                   properties:
 *                     min:
 *                       type: number
 *                       description: The incentive applicable range (e.g., 100, 200)
 *                       example: 100
 *                     max:
 *                       type: number
 *                       description: The incentive applicable range (e.g., 200, 300)
 *                       example: 200
 *                     amount:
 *                       type: number
 *                       description: Total incentive amount for the given range
 *                       example: 500
 *                     each:
 *                       type: number
 *                       description: Incentive amount per unit in the range
 *                       example: 5
 *                 example:
 *                     - min: 0
 *                       max: 200
 *                       amount: 5
 *                       each: 100
 *                     - min: 201
 *                       max: 400
 *                       amount: 4
 *                       each: 100
 *     responses:
 *       201:
 *         description: Created successfully
 */

router.post("/ProductionNature", verifyToken, createProductionNature);

/**
 * @swagger
 * /ProductionNature:
 *   get:
 *     summary: Get all Production Natures
 *     tags: [ProductionNature]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of natures
 */
router.get("/ProductionNature", verifyToken, getProductionNatures);

/**
 * @swagger
 * /ProductionNature/{id}:
 *   get:
 *     summary: Get a Production Nature by ID
 *     tags: [ProductionNature]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Nature details
 */
router.get("/ProductionNature/:id", verifyToken, getProductionNatureById);

/**
 * @swagger
 * /ProductionNature/{id}:
 *   put:
 *     summary: Update a Production Nature
 *     tags: [ProductionNature]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.put("/ProductionNature/:id", verifyToken, updateProductionNature);

/**
 * @swagger
 * /ProductionNature/{id}:
 *   delete:
 *     summary: Delete a Production Nature
 *     tags: [ProductionNature]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete("/ProductionNature/:id", verifyToken, deleteProductionNature);

// ────────────── Production Shift ──────────────

/**
 * @swagger
 * /ProductionShift:
 *   post:
 *     summary: Create a new Production Shift
 *     tags: [ProductionShift]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shiftName:
 *                 type: string
 *                 description: Name of the shift
 *                 example: A   
 *               shiftHrs:
 *                 type: number
 *                 description: Start hours of the shift
 *                 example: 8      
 *               startTime:
 *                 type: string
 *                 description: Shift start time (HH:mm)
 *                 example: 08:00
 *               endTime:
 *                 type: string
 *                 description: Shift end time (HH:mm)
 *                 example: 16:00
 *     responses:
 *       201:
 *         description: Created successfully
 */
router.post("/ProductionShift", verifyToken, createProductionShift);

/**
 * @swagger
 * /ProductionShift:
 *   get:
 *     summary: Get all Production Shifts
 *     tags: [ProductionShift]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of shifts
 */
router.get("/ProductionShift", verifyToken, getProductionShifts);

/**
 * @swagger
 * /ProductionShift/{id}:
 *   get:
 *     summary: Get a Production Shift by ID
 *     tags: [ProductionShift]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shift details
 */
router.get("/ProductionShift/:id", verifyToken, getProductionShiftById);

/**
 * @swagger
 * /ProductionShift/{id}:
 *   put:
 *     summary: Update a Production Shift
 *     tags: [ProductionShift]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shiftName:
 *                 type: string
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.put("/ProductionShift/:id", verifyToken, updateProductionShift);

/**
 * @swagger
 * /ProductionShift/{id}:
 *   delete:
 *     summary: Delete a Production Shift
 *     tags: [ProductionShift]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete("/ProductionShift/:id", verifyToken, deleteProductionShift);
router.post("/masterUpload", verifyToken, uploadMasterData);

module.exports = router;
