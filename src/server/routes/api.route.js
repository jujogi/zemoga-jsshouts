import { Router } from "express";
import { getMyProfile, getMyPosts, getMyPhotos } from "../services/facebook.service";

const router = Router();

router.get("/", getMyProfile);
router.get("/posts", getMyPosts);
router.get("/photos", getMyPhotos);

export default router;
