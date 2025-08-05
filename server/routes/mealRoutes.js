import express from "express";
import {
  addMeal,
  getMeals,
  deleteMeal,
} from "../controllers/mealController.js";

const router = express.Router();

router.post("/", addMeal);
router.get("/:userId/:date", getMeals);
router.delete("/:id", deleteMeal);

export default router;
