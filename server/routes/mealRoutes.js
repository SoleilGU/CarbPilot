import express from "express";
import {
  addMeal,
  getMeals,
  deleteMeal,
} from "../controllers/mealController.js";
// import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route POST /api/meals
 * @desc Add a new meal with nutrient calculation
 * @access Private
 */
router.post("/", addMeal);

/**
 * @route GET /api/meals/:userId/:date
 * @desc Get meals by user ID and date
 * @access Private
 */
router.get("/:userId/:date", getMeals);

/**
 * @route DELETE /api/meals/:id
 * @desc Delete a meal by ID
 * @access Private
 */
router.delete("/:id", deleteMeal);

export default router;
