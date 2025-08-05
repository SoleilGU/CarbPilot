// 100gram - A simple food calculator for carb counting
const FOOD_DB = {
  apple: { carbs: 14, protein: 0.3, fat: 0.2, kcal: 52 },
  banana: { carbs: 27, protein: 1.3, fat: 0.3, kcal: 105 },
  rice: { carbs: 28, protein: 2.7, fat: 0.3, kcal: 130 },
  chicken: { carbs: 0, protein: 31, fat: 3.6, kcal: 165 },
  broccoli: { carbs: 7, protein: 2.8, fat: 0.4, kcal: 55 },
  bread: { carbs: 49, protein: 9, fat: 3.2, kcal: 265 },
  pasta: { carbs: 31, protein: 5, fat: 1.1, kcal: 157 },
  egg: { carbs: 1.1, protein: 6.3, fat: 5, kcal: 68 },
  cheese: { carbs: 1.3, protein: 25, fat: 33, kcal: 402 },
  yogurt: { carbs: 4.7, protein: 10, fat: 3.3, kcal: 59 },
  nuts: { carbs: 6, protein: 20, fat: 50, kcal: 607 },
  tofu: { carbs: 1.9, protein: 8, fat: 4.8, kcal: 76 },
};

export async function getNutrientData(foodItem, grams) {
  const nutrientPer100g = FOOD_DB[foodItem.toLowerCase()];
  if (!nutrientPer100g) {
    throw new Error(`Food item "${foodItem}" not found in database.`);
  }

  const factor = grams / 100;
  return {
    carbs: (nutrientPer100g.carbs * factor).toFixed(2),
    protein: (nutrientPer100g.protein * factor).toFixed(2),
    fat: (nutrientPer100g.fat * factor).toFixed(2),
    kcal: (nutrientPer100g.kcal * factor).toFixed(2),
  };
}
