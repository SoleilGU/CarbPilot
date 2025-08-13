# CarbPilot - RESTful API Design

This document outlines the API endpoints for the CarbPilot web application. Each route adheres to RESTful conventions and is designed to support key features including user management, carb cycle planning, meal logging, ingredient-based recommendations, and feedback.

---

## User Authentication

### POST /api/register

Register a new user.

Request Body:

```javascript
{
	"name": "admin",
	"email": "admin@example.com",
	"password": "securePassword123"
}
```

### POST /api/login

Log in and receive a JWT token

Request Body:

```javascript
{
	"email": "admin@example.com",
	"password": "securePassword123"
}
```

### GET /api/user/profile

Get the authenticated user profile

**Header:**

```
Authorization: Bearer <token>
```

## Carb Cycle Plan

### POST /api/carb-plan

Generate a 7-day carb cycling plan based on user profile

**Request Body:**

```
{
	"age": 25,
	"gender": f,
	"height": 165,
	"weight": 65,
	"activityLevel": "moderate"
}
```

**Response: （7-days carb plan)**

```
{
	"carbPlan": [
		"high",
		"low",
		"medium",
		"high",
		"low",
		"refeed",
		"medium"
	]
}
```

## Meal Records

### POST /api/meal

Submit one meal record, system calculate the nutrients automatically

Request Header:

```
Authorization: Bearer <token>
Content-Type: application/json
```

Request Body:

```
{
	"mealType": "lunch",
	"date": "2025-08-01",
	"items": [
		{ "name": "rice", "grams": 150 },
		{"name": "egg", "grams": 60 }
	]
}
```

### GET /api/meal/today

Get today's meals:

**Header:**

```
Authorization: Bearer <token>
```

**Response:**

```
{
	"date": "2025-08-01",
	"meal": [
	{
		"mealType": "lunch".
		"items": [
			{"name": "rice", "grams": 150},
			{"name": "egg", "grams": 60}
		],
		"totalKcal": 520,
		"carbs": 65,
		"protein": 20,
		"fat": 18
	}
	]
}
```

## Ingredients & Menu Recommendation

### POST /api/ingredients

Submit available ingredients

**Request Body:**

```
{
  "ingredients": ["zucchini", "chicken thigh", "green beans"]
}
```

### GET /api/recommendation

Get recommended meals based on current ingredients and carb level

**Response:**

```
[
  "Stir-fried chicken with zucchini",
  "Green bean salad with eggs"
]
```

## Summary & Feedback

### Get /api/summary

Return today's nutrition summary and goal status

Response:

```
{
  "kcal": 1650,
  "carbs": 180,
  "protein": 100,
  "fat": 60,
  "goalMet": true,
  "suggestExercise": false
}
```

### GET /api/feedback

(promotion) Return GPI-generated suggestion based on logged meals

Response:

```
{
  "message": "You did great today! Slightly high on carbs, but overall well-balanced. Consider a 20-minute walk."
}
```
