import { Router } from "express";
import { getMeHandler } from "../controllers/user.controller";
import { userAuth } from "../middleware/userAuth";
import { requireUser } from "../middleware/requireUser";

const router = Router();

router.use(userAuth, requireUser);

router.get("/me", getMeHandler);

export default router;
