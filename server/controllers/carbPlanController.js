import CarbPlan from "../models/CarbPlan.js";

// Get carb plan by user ID
export const getCarbPlan = async (req, res) => {
  try {
    const { userId } = req.body;
    const plan = await CarbPlan.findOne({ user: userId });
    if (!plan) {
      return res.status(404).json({ message: "Carb plan not found" });
    }
    res.json(plan);
  } catch (error) {
    console.error("Error fetching carb plan:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Set or update carb plan
export const setCarbPlan = async (req, res) => {
  try {
    const { userId, tdee, carbPlan } = req.body;

    let plan = await CarbPlan.findOne({ user: userId });
    if (plan) {
      // Update existing plan
      plan.tdee = tdee;
      plan.carbPlan = carbPlan;
    } else {
      // Create new plan
      plan = new CarbPlan({
        user: userId,
        tdee,
        carbPlan,
      });
    }

    await plan.save();
    res.status(201).json(plan);
  } catch (error) {
    console.error("Error setting carb plan:", error);
    res.status(500).json({ message: "Server error" });
  }
};
