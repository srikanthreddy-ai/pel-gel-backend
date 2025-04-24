var express = require("express");
var router = express.Router();
const { verifyToken } = require("../handlers/authentication");
const { getNatureByCategory } = require("../controllers/prodMaster");

/**
 * @swagger
 * /getNatureListByCategory:
 *   get:
 *     summary: Get nature list by category
 *     description: Retrieves a list of nature items filtered by category. Requires a valid JWT token.
 *     tags:
 *       - Nature
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of nature items filtered by category.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique ID of the nature item.
 *                   name:
 *                     type: string
 *                     description: Name of the nature item.
 *                   category:
 *                     type: string
 *                     description: Category of the nature item.
 *       400:
 *         description: Missing or invalid category parameter.
 *       401:
 *         description: Unauthorized. JWT token is missing or invalid.
 *       500:
 *         description: Server error.
 */
router.get('/getNatureListByCategory', verifyToken, getNatureByCategory);

module.exports = router;
