import { Router } from "express";
import { authFacebook, authFacebookCallback } from "../strategies/facebook.strategy";

const router = Router();

router.get("/", authFacebook);
router.get('/callback', authFacebookCallback);

export default router;
