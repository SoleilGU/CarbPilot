import mongoose from "mongoose";

const mealItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  grams: {
    type: Number,
    required: true,
  },
  kcal: Number,
  carbs: Number,
  protein: Number,
  fat: Number,
});

const mealSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    mealType: {
      type: String,
      enum: ["breakfast", "lunch", "dinner", "snack"],
      required: true,
    },
    items: [mealItemSchema],
    totalKcal: Number,
    totalCarbs: Number,
    totalProtein: Number,
    totalFat: Number,
  },
  {
    timestamps: true,
  }
);

const Meal = mongoose.model("Meal", mealSchema);

export default Meal;
