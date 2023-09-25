import { Router } from "express";
import {
  createPostCommentHandler,
  createPostHandler,
  getPostCommentsHandler,
  getPostsHandler,
} from "../controllers/post.controller";
import { userAuth } from "../middleware/userAuth";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import {
  createPostCommentSchema,
  createPostSchema,
  getPostListSchema,
  getPostSchema,
} from "../schemas/post.schema";

const router = Router();
router.use(userAuth, requireUser);

/**
 * @swagger
 *
 * /api/posts:
 *   post:
 *     summary: Create a post
 *     description: Create a `post` by providing a **title** and **content**.
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/CreatePostData'
 *     responses:
 *       200:
 *         description: A successfully created post.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#components/schemas/PostData'
 *       400:
 *         description: An unsuccessful post create response.
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
 *                   type: array
 *                   description: Validation errors
 *                   items:
 *                     type: object
 *                     $ref: '#components/schemas/ValidationError'
 *       409:
 *         description: An unsuccessful post create response.
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
 *                   example: Post with that title already exist.
 *   get:
 *     summary: Get a list of posts
 *     description: Get a **paginated list** of **user** `posts`. Only `posts` from the **requesting user** and his **folowees** are returned.
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         type: number
 *         required: false
 *         default: 1
 *         description: Pagination page
 *       - in: query
 *         name: perPage
 *         type: number
 *         required: false
 *         default: 30
 *         description: Posts per page
 *     responses:
 *       200:
 *         description: A pagianted list of user's posts and his followee's posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Operations/Request status.
 *                   example: success
 *                 paging:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: number
 *                       description: Pagination page
 *                       example: 1
 *                     perPage:
 *                       type: number
 *                       description: Posts per page
 *                       example: 30
 *                     totalCount:
 *                       type: number
 *                       description: Total amount of user and his followee's posts.
 *                       example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     $ref: '#components/schemas/PostWithUserData'
 *       400:
 *         description: An unsuccessful get posts response.
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
 *                   type: array
 *                   description: Validation errors
 *                   items:
 *                     type: object
 *                     $ref: '#components/schemas/ValidationError'
 */
router
  .route("/")
  .post(validate(createPostSchema), createPostHandler)
  .get(validate(getPostListSchema), getPostsHandler);

/**
 * @swagger
 *
 * /api/posts/{postId}/comment:
 *   post:
 *     summary: Create a post comment
 *     description: Create a `post comment` by providing a target `post` **id** and the comment **content**.
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         type: string
 *         required: true
 *         description: Post id
 *         example: bfb46036-79a1-4bc7-a29a-996800804bb4
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/CreatePostCommentData'
 *     responses:
 *       200:
 *         description: A successfully created post comment.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Operation/Request status.
 *                   example: success
 *                 comment:
 *                   $ref: '#components/schemas/PostCommentData'
 *       400:
 *         description: An unsuccessful create post comment response.
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
 *                   type: array
 *                   description: Validation errors
 *                   items:
 *                     type: object
 *                     $ref: '#components/schemas/ValidationError'
 *       404:
 *         description: Target post not found.
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
 *                   example: Target post not found.
 *   get:
 *     summary: Get post comments
 *     description: Get all `comments` associated with the provided `post` **id**.
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         type: string
 *         required: true
 *         description: Post id
 *         example: bfb46036-79a1-4bc7-a29a-996800804bb4
 *     responses:
 *       200:
 *         description: A list of post's comments.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Operations/Request status.
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     $ref: '#components/schemas/PostCommentListData'
 *       404:
 *         description: Target post not found.
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
 *                   example: Target post not found.
 */
router
  .route("/:postId/comment")
  .post(
    validate(createPostCommentSchema),
    validate(getPostSchema),
    createPostCommentHandler,
  )
  .get(validate(getPostSchema), getPostCommentsHandler);

export default router;
