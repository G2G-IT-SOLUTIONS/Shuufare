import express from "express";
import { startFaydaAuth, faydaCallback } from "../controllers/faydaController.js";
import { submitUserProfile, getUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/api/auth/fayda", startFaydaAuth);

router.get("/callback", faydaCallback);

router.post("/api/user/profile", submitUserProfile);

router.get("/api/user/profile", getUserProfile);

export default router;