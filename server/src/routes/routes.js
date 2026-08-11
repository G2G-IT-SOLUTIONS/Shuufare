import express from "express";
import { startFaydaAuth, faydaCallback } from "../controllers/faydaController.js";
import { submitUserProfile, getUserProfile } from "../controllers/userController.js";
import { adminLogin, adminLogout, getAdminProfile, getAllUsers, getUserById, getDashboardStats } from "../controllers/adminController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/api/auth/fayda", startFaydaAuth);

router.get("/callback", faydaCallback);

router.post("/api/driver/application", submitUserProfile);

router.get("/api/user/profile", getUserProfile);

// Admin routes
router.post("/api/admin/login", adminLogin);
router.post("/api/admin/logout", adminLogout);
router.get("/api/admin/profile", adminAuth, getAdminProfile);
router.get("/api/admin/users", adminAuth, getAllUsers);
router.get("/api/admin/users/:id", adminAuth, getUserById);
router.get("/api/admin/stats", adminAuth, getDashboardStats);

export default router;