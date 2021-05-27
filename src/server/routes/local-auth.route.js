import { Router } from "express";
import { signIn, signUp } from "../services/local-auth.service";
import { authLocal } from "../strategies/local.strategy";

const router = Router();

router.post("/", authLocal, signIn);
router.post("/signup", signUp);

export default router;