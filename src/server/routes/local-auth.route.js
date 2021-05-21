import { Router } from "express";
import { signin, signup } from "../services/local-auth.service";

const router = Router();

router.post("/", signin);
router.post("/signup", signup);

export default router;