import express from "express";
import { startFaydaAuth, faydaCallback } from "../controllers/faydaController.js";

const router = express.Router();

router.get("/api/auth/fayda", startFaydaAuth);

router.get("/callback", faydaCallback);

export default router;