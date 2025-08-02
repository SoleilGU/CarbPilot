import mongoose from "mongoose";

const carbPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    tdee: Number,
    carbPlan: [String],
  },
  {
    timestamps: true,
  }
);

const CarbPlan = mongoose.model("CarbPlan", carbPlanSchema);

export default CarbPlan;
