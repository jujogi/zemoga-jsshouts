import { Router } from "express";
import { signin, signup } from "../services/local-auth.service";
import { authLocal } from "../strategies/local.strategy";


const router = Router();

router.post("/", authLocal, signin);
router.post("/signup", signup);

export default router;