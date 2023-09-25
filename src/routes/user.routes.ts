import { Router } from "express";
import {
  followUserHanlder,
  getMeHandler,
} from "../controllers/user.controller";
import { userAuth } from "../middleware/userAuth";
import { followUserSchema } from "../schemas/user.schema";
import { validate } from "../middleware/validate";
import { requireUser } from "../middleware/requireUser";

const router = Router();

router.use(userAuth, requireUser);

/**
 * @swagger
 *
 * /api/user/me:
 *   get:
 *     summary: User info
 *     description: This endpoint will provide the **logged in** `user` with his **information**.
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: The logged in user's data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Operation/Request status.
 *                   example: success
 *                 data:
 *                   $ref: '#components/schemas/UserData'
 */
router.get("/me", getMeHandler);

/**
 * @swagger
 *
 * /api/user/{userId}/follow:
 *   get:
 *     summary: Follow another user
 *     description: Adds the provided `userId` to the list of the requesting user's followees. This means thet the **requesting user** is following the **provided user** (the **provided user** will ***NOT*** automatically follow the **requesting user**) and can see their `posts`.
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         type: string
 *         required: true
 *         description: ID of the user to follow.
 *         example: 6ed584bf-c0bc-4ace-a5ae-9e47fa8af17f
 *     responses:
 *       200:
 *         description: Response status and a message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Operation/Request status.
 *                   example: success
 *                 message:
 *                   type: string
 *                   description: Operation message. Notifies the requesting user that he is now following user `{username}`.
 *                   example: You are now following user jDoeImpostor.
 *       404:
 *         description: In case the provided user does not exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/SimpleResponse'
 */
router.get("/:userId/follow", validate(followUserSchema), followUserHanlder);

export default router;
