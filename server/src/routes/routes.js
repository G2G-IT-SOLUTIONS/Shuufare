import express from "express";
import { startFaydaAuth, faydaCallback } from "../controllers/faydaController.js";
import { submitUserProfile, getUserProfile } from "../controllers/userController.js";
import { adminLogin, adminLogout, getAllUsers, getUserById, getDashboardStats } from "../controllers/adminController.js";
import { adminAuth } from "../middleware/adminAuth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/api/auth/fayda", startFaydaAuth);
289044802102061149240984059299778107
289044802102061149240984059299778107

router.get("/callback", faydaCallback);

router.post("/api/driver/application", upload.single('license_photo'), submitUserProfile);

router.get("/api/user/profile", getUserProfile);

// Admin routes
router.post("/api/admin/login", adminLogin);
router.post("/api/admin/logout", adminLogout);
router.get("/api/admin/users", adminAuth, getAllUsers);
router.get("/api/admin/users/:id", adminAuth, getUserById);
router.get("/api/admin/stats", adminAuth, getDashboardStats);

export default router;