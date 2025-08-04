# Functional Module Design

This document defines the breakdown of features, basic UI layouts, and user interaction flows to guide implementation.

## Module Breakdown

| Module              | Description                                              |
| ------------------- | -------------------------------------------------------- |
| User Management     | Register, login, get user profile                        |
| Carb Cycle Planning | Generate weekly carb cycle plan based on user info       |
| Meal Logging        | Input meals (breakfast/lunch/dinner), estimate nutrients |
| Ingredient Storage  | Input existing ingredients at home                       |
| Meal Recommendation | Suggest meals based on ingredients + carb level          |
| Daily Summary       | Show nutritional goal met + suggest workout              |
| AI Feedback (Opt.)  | GPT-based review of dietary behavior                     |

---

## React Component

| Component                                            | Purpose                                       |
| ---------------------------------------------------- | --------------------------------------------- |
| `<span>Navbar</span>`                                | Top navigation bar with links to all pages    |
| `<span>DashboardCard</span>`                         | Show daily summary (kcal, macros, carb level) |
| `<span>MealInputForm</span>`                         | Add a meal: meal type + food items + grams    |
| `<span>IngredientInputForm</span>`                   | Add what’s in your kitchen                    |
| `<span>MealRecommendation</span>`                    | Display GPT or algorithmic suggestions        |
| `<span>CarbPlanChart</span>`                         | Weekly carb cycle summary                     |
| `<span>LoginForm</span>`/`<span>RegisterForm</span>` | Auth forms                                    |

---

## User Flow (Meal Logging)

1. User logs in
2. Lands on Dashboard → clicks "Log Meal"
3. Selects meal type (breakfast/lunch/dinner)
4. Adds food item(s) with quantity
5. Submits → backend estimates kcal, macros
6. Meal shown in Daily Summary

---

## User Flow (Carb Plan)

1. User registers & fills personal info (height, weight, activity level, etc.)
2. Clicks “Generate Plan” → system calculates TDEE & returns 7-day carb cycle
3. Carb plan is displayed in chart (e.g., bar colors for high/low carb)

---

## Dashboard Wireframe

Prototype Link: https://www.figma.com/proto/5Pp5ho1lUFFKIgY6BPBAqT/CarbPilot?node-id=0-1&t=x16yUdEJtpt7eVo1-1

---

## Summary Widget Example

```
{
  "date": "2025-08-03",
  "kcal": 1650,
  "carbs": 180,
  "protein": 100,
  "fat": 60,
  "goalMet": true,
  "suggestExercise": false
}
```

---
