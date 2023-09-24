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

router.get("/me", getMeHandler);

router.get("/:userId/follow", validate(followUserSchema), followUserHanlder);

export default router;
