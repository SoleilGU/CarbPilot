import asyncHandler from "express-async-handler";
import { getNutrientData } from "../utils/foodCalculator.js";

const round = (n) => Math.round(Number(n) || 0);

// @route POST /api/carb/calc
// @desc Calculate nutrition totals for a list of items [{name, grams}]
export const calcCarbs = asyncHandler(async (req, res) => {
  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  if (!items.length) {
    return res.status(400).json({ message: "Invalid items" });
  }

  let totalCarb = 0;
  let totalProtein = 0;
  let totalFat = 0;
  const detailed = [];

  try {
    for (const { name, grams } of items) {
      const nm = String(name || "").trim();
      const g = Number(grams);
      if (!nm || !Number.isFinite(g) || g <= 0) {
        return res
          .status(400)
          .json({ message: "Each item needs a name and positive grams." });
      }

      const n = await getNutrientData(nm.toLowerCase(), g);
      const carb = Number(n.carbs) || 0;
      const protein = Number(n.protein) || 0;
      const fat = Number(n.fat) || 0;
      const kcal = Number(n.kcal) || 0;

      totalCarb += carb;
      totalProtein += protein;
      totalFat += fat;

      detailed.push({
        name: nm,
        grams: g,
        carb: round(carb),
        protein: round(protein),
        fat: round(fat),
        energy: round(kcal),
      });
    }
  } catch (e) {
    return res.status(400).json({ message: e.message || "Unknown food item" });
  }

  const energyTotal = round(4 * totalCarb + 4 * totalProtein + 9 * totalFat);

  return res.json({
    totals: {
      carb: round(totalCarb),
      protein: round(totalProtein),
      fat: round(totalFat),
      energy: energyTotal,
    },
    items: detailed,
  });
});
