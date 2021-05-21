import { Router } from "express";
import { listUsers } from "../services/user.service";

const router = Router();

router.get("/", listUsers);

export default router;
