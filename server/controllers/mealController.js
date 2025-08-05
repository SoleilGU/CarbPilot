import Meal from "../models/Meal.js";
import { getNutrientData } from "../utils/foodCalculator.js";

//Add a new meal POST
export const addMeal = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error adding meal:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET all meals for a user
export const getMeals = async (req, res) => {
  try {
    const { userId, date } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const meals = await Meal.find({ user: userId, date });
    res.status(200).json(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE a meal by ID
export const deleteMeal = async (req, res) => {
  try {
    const mealId = req.params.id;

    if (!mealId) {
      return res.status(400).json({ message: "Meal ID is required" });
    }

    const deletedMeal = await Meal.findByIdAndDelete(mealId);
    if (!deletedMeal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (error) {
    console.error("Error deleting meal:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT to update a meal by ID
// waiting to be done
