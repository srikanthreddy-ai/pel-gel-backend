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
 *             properties:
 *               name:
 *                 type: string
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
 *             properties:
 *               type:
 *                 type: string
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
 *               startTime:
 *                 type: string
 *                 format: time
 *               endTime:
 *                 type: string
 *                 format: time
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

module.exports = router;
