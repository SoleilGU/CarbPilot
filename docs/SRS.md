# Software Requirements Specification

## Project Name: CarbPilot -- Personalised CarbCycling Tracker and Recommendation Assistant

---

### 1. Product Vision

CarbPilot is a smart web application designed for users who want to manage weight and imporve health using a carb cycling approach. The app helps users:

- Generate a personalized weekly carb cycling plan based on height, weight, gender, age, and activity level.
- Log daily meals and estimate intake of macronutrients (carbs, protein, fat)
- Receive meal recommendations based on available ingredients and daily carb targets
- Get feedback on whether their intake meets daily goals and whether exercise is recommended
- (Promotion) Integrate GPT to analyze daily intake and generate natural-language feedback

---

### 2. User Personas

| Role              | Description                                                                      |
| ----------------- | -------------------------------------------------------------------------------- |
| General User      | Wants to lose weight through smarter eating habits without overly strict control |
| Fitness Beginner  | Engages in home workouts and seeks simple caloric and nutritional guidance       |
| Nutrition Tracker | Enjoys monitoring daily macro data and tracking long-term dietary patterns       |

---

### 3. Functional Requirements

| ID  | Module               | Description                                                                                     |
| --- | -------------------- | ----------------------------------------------------------------------------------------------- |
| F1  | User Profile         | User inputs personal info (height, weight, gender, age, activity level); system calculates TDEE |
| F2  | Carb Cycle Plan      | Generates a weekly carb plan (e.g., low / moderate / high / refeed days) based on TDEE          |
| F3  | Meal Logging         | Users input food items and weights; system estimates kcal, carbs, protein, fat                  |
| F4  | Ingredient Manager   | Users input available ingredients; system recommends meals matching current carb target         |
| F5  | Daily Feedback       | Shows whether today's intake meets carb/macro goals; suggests if exercise is recommended        |
| F6  | History & Trends     | Displays last 7 days of meal records and visualizes intake trends                               |
| F7  | AI Suggestions (opt) | Uses GPT to analyze daily intake and return human-readable diet suggestions                     |
| F8  | Authentication (opt) | Allows user login/registration for data persistence across sessions/devices                     |

---

### 4. Non-Functional Requirements

| Type           | Description                                                                          |
| -------------- | ------------------------------------------------------------------------------------ |
| Responsiveness | App should be usable across desktop and mobile browsers with fast loading times      |
| Usability      | Simple, intuitive user interface with clear workflows                                |
| Data Security  | User data should be stored locally or encrypted if persisted                         |
| Scalability    | System should support future expansion with APIs, workout plans, smart scoring, etc. |

---

### 5. System Usage Flow

User registration (or anonymous start) → Enter personal info → Generate weekly carb cycle plan
→ Each day:
→ Log meals (breakfast/lunch/dinner)
→ (Optional) Enter ingredients → Get meal suggestions
→ View daily status: goals met? exercise recommended?
→ (Optional) View GPT feedback
→ Save records → View history later

---

### 6. Technology

| Layer        | Technology           |
| ------------ | -------------------- |
| Frontend     | React + Tailwind CSS |
| Backend      | Node.js + Express    |
| Database     | MongoDB or SQLite    |
| AI API       | OpenAI GPT API       |
| External API | Food data APIs       |

---

### 7. File and Version Control

- All documents are stored under the `docs/` directory
- Version control follows Git + Github workflows using `main` and the developer `Yuxin` branching

---

### 8. Notes

The project follows a modular architecture with frontend-backend separation for better maintainability and deployment flexibility

---

> Author: Yuxin Gu
>
> Date: 2025-07-31
