var express = require("express");
var router = express.Router();
const { verifyToken, getUserProfile } = require("../handlers/authentication");
const { login, createUser, getUsers, userUpdate } = require("../controllers/login");

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
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: adminuser
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
 *               - username
 *               - email
 *               - password
 *               - role
 *             properties:
 *               username:
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
router.post("/createUser", verifyToken, createUser);
router.get("/usersList", verifyToken, getUsers);
router.patch("/userUpdate/:id", verifyToken, userUpdate);

module.exports = router;
