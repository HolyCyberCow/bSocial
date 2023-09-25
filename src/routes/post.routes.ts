import { Router } from "express";
import {
  createPostCommentHandler,
  createPostHandler,
  getPostCommentsHandler,
  getPostHandler,
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
router
  .route("/")
  .post(validate(createPostSchema), createPostHandler)
  .get(validate(getPostListSchema), getPostsHandler);

router.route("/:postId").get(validate(getPostSchema), getPostHandler);
router
  .route("/:postId/comment")
  .post(
    validate(createPostCommentSchema),
    validate(getPostSchema),
    createPostCommentHandler,
  )
  .get(validate(getPostSchema), getPostCommentsHandler);

export default router;
