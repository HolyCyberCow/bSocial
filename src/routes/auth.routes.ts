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

const router = Router();

router.post("/register", validate(createUserSchema), registerUserHandler);

router.post("/login", validate(loginUserSchema), loginUserHandler);

router.get("/logout", userAuth, requireUser, logoutHandler);

router.get("/refresh", refreshAccessTokenHandler);

export default router;
