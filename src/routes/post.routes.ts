import { Router } from "express";
import {
  createPostHandler,
  getPostHandler,
  getPostsHandler,
} from "../controllers/post.controller";
import { userAuth } from "../middleware/userAuth";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import {
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

export default router;
