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
  kcal: { type: Number, required: true },
  carbs: { type: Number, required: true },
  protein: { type: Number, required: true },
  fat: { type: Number, required: true },
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
    totalKcal: { type: Number, required: true },
    totalCarbs: { type: Number, required: true },
    totalProtein: { type: Number, required: true },
    totalFat: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Meal = mongoose.model("Meal", mealSchema);

export default Meal;
