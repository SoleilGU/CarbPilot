import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser); // Register
router.post("/auth", authUser); // Login
router.post("/logout", logoutUser); // Logout
router.get("/profile", protect, getUserProfile); // Get user profile
router.put("/profile", protect, updateUserProfile); // Update user profile

export default router;
