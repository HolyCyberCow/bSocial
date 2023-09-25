import { Router } from "express";
import {
  loginUserHandler,
  logoutHandler,
  refreshAccessTokenHandler,
  registerUserHandler,
} from "../controllers/auth.controller";
import { userAuth } from "../middleware/userAuth";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: access_token
 *     refreshSession:
 *       type: apiKey
 *       in: cookie
 *       name: refresh_token
 */

const router = Router();

/**
 * @swagger
 *
 * /api/auth/register:
 *   post:
 *     summary: User registration
 *     description: In order for a user to register, one must provide a `first name`, `last name`, `username`, `email` and a `password`. The endpoint additionaly requires a `confirmPassword` field.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/UserRegisterData'
 *     responses:
 *       201:
 *         description: A successfull user registration response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Operation/Request status.
 *                   example: success
 *       409:
 *         description: An unsuccessful user registration response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Operation/Request status.
 *                   example: error
 *                 message:
 *                   type: string
 *                   description: Failure message/reason.
 *                   example: user with that emai already exists.
 */
router.post("/register", validate(createUserSchema), registerUserHandler);

/**
 * @swagger
 *
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: User login endpoint; simple **email** + **password** login. Returns a `cookie` that needs to be **included in the subsequent requests**, a `cookie` that can be used to **refresh the user session** and a cookie that signlas the user that he is logged in.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/UserLoginData'
 *     responses:
 *       200:
 *         description: A successfull user login response.
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: access_token=eyJhbGci... { characters in here where trimmed for visibility} ...Co_7zQ; Max-Age=900; Path=/; Expires=Mon, 25 Sep 2023 13:41:47 GMT; HttpOnly; SameSite=Lax
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Operation/Request status.
 *                   example: success
 *       400:
 *         description: An unsuccessful user login response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Operation/Request status.
 *                   example: error
 *                 errors:
 *                   type: string
 *                   description: Failure message/reason; errors.
 *                   example: Invalid username or password
 */
router.post("/login", validate(loginUserSchema), loginUserHandler);

/**
 * @swagger
 *
 * /api/auth/logout:
 *   get:
 *     security:
 *       - cookieAuth: []
 *     summary: User logout
 *     description: User logout endpoint, invalidates the `cookies` provided by the **login** endpoint
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: A successfull user logout response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Operation/Request status.
 *                   example: success
 */
router.get("/logout", userAuth, requireUser, logoutHandler);

/**
 * @swagger
 *
 * /api/auth/refresh:
 *   get:
 *     security:
 *       - cookieAuth: []
 *       - refreshSession: []
 *     summary: Refresh user session
 *     description: Uses the provided `refresh_token` from the cookies to **refresh** the user session by generating new cookie keys.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: A successfull user isession refresh response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Operation/Request status.
 *                   example: success
 */
router.get("/refresh", refreshAccessTokenHandler);

export default router;
