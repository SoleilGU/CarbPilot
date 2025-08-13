import Meal from "../models/Meal.js";
import asyncHandler from "express-async-handler";
import { getNutrientData } from "../utils/foodCalculator.js";

//@desc Add a meal
//@route POST /api/meals
//@access Private
export const addMeal = asyncHandler(async (req, res) => {
  const { userId, date, mealType, items } = req.body;

  if (!userId || !date || !mealType || !items || !Array.isArray(items)) {
    return res.status(400).json({ message: "Invalid input" });
  }

  let totalKcal = 0,
    totalCarbs = 0,
    totalProtein = 0,
    totalFat = 0;

  const enrichedItems = await Promise.all(
    items.map(async (item) => {
      const nutrientData = await getNutrientData(item.name, item.grams);

      totalKcal += parseFloat(nutrientData.kcal || 0);
      totalCarbs += parseFloat(nutrientData.carbs || 0);
      totalProtein += parseFloat(nutrientData.protein || 0);
      totalFat += parseFloat(nutrientData.fat || 0);

      return {
        ...item,
        ...nutrientData,
      };
    })
  );

  const meal = new Meal({
    user: userId,
    date,
    mealType,
    items: enrichedItems,
    totalKcal,
    totalCarbs,
    totalProtein,
    totalFat,
  });

  const savedMeal = await meal.save();
  res.status(201).json(savedMeal);
});

// @desc Get meals by user ID and date
//@route GET /api/meals/:userId/:date
//@access Private
export const getMeals = asyncHandler(async (req, res) => {
  const { userId, date } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const meals = await Meal.find({ user: userId, date });
  res.status(200).json(meals);
});

// @desc Delete a meal by ID
//@route DELETE /api/meals/:id
//@access Private
export const deleteMeal = asyncHandler(async (req, res) => {
  const mealId = req.params.id;

  if (!mealId) {
    return res.status(400).json({ message: "Meal ID is required" });
  }

  const deletedMeal = await Meal.findByIdAndDelete(mealId);
  if (!deletedMeal) {
    return res.status(404).json({ message: "Meal not found" });
  }

  res.status(200).json({ message: "Meal deleted successfully" });
});

// @desc Update a meal by ID
// Optionally
