var express = require("express");
var router = express.Router();
const { verifyToken, getUserProfile } = require("../handlers/authentication");
const { login, createUser } = require("../controllers/login");

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user and return access token
 *     tags: [Authentication]
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: securePassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login);

/**
 * @swagger
 * /createUser:
 *   post:
 *     summary: Create a new user account
 *     tags: [Authentication]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: MySecretPassword!
 *               role:
 *                  type: string
 *                  example: admin
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request or user already exists
 */
router.post("/createUser", createUser);

module.exports = router;
