import CarbPlan from "../models/CarbPlan.js";

// Get carb plan by user ID
export const getCarbPlan = async (req, res) => {
  try {
    const userId = req.params.userId;
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
// export const setCarbPlan = async (req, res) => {
//   try {
//     const { userId, tdee, carbPlan } = req.body;

//     let plan = await CarbPlan.findOne({ user: userId });
//     if (plan) {
//       // Update existing plan
//       plan.tdee = tdee;
//       plan.carbPlan = carbPlan;
//     } else {
//       // Create new plan
//       plan = new CarbPlan({
//         user: userId,
//         tdee,
//         carbPlan,
//       });
//     }

//     await plan.save();
//     res.status(201).json(plan);
//   } catch (error) {
//     console.error("Error setting carb plan:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
const ACT = { low: 1.375, moderate: 1.55, high: 1.725 };
const CARB_PCT = { low: 0.25, medium: 0.45, high: 0.65 }; // 和前端保持一致

export const setCarbPlan = async (req, res) => {
  try {
    const { userId, gender, age, height, weight, activityLevel, carbType } =
      req.body;

    const a = Number(age),
      h = Number(height),
      w = Number(weight);
    if (
      !userId ||
      !gender ||
      !Number.isFinite(a) ||
      !Number.isFinite(h) ||
      !Number.isFinite(w) ||
      !["low", "moderate", "high"].includes(activityLevel) ||
      !["low", "medium", "high"].includes(carbType)
    ) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    // 计算
    const bmr =
      gender === "male"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;

    const tdee = Math.round(bmr * (ACT[activityLevel] || 1.55));
    const targetCarbs = Math.round((tdee * (CARB_PCT[carbType] || 0.45)) / 4);

    // 一周 carb 计划（示例，可按需改）
    const weeklyPlan =
      carbType === "low"
        ? ["low", "low", "low", "low", "medium", "low", "low"]
        : carbType === "high"
        ? ["medium", "high", "medium", "high", "medium", "high", "medium"]
        : ["low", "medium", "low", "medium", "low", "high", "medium"];

    // upsert
    const update = {
      user: userId,
      gender,
      age: a,
      height: h,
      weight: w,
      activityLevel,
      carbType,
      tdee,
      targetCarbs,
      carbPlan: weeklyPlan,
    };

    const plan = await CarbPlan.findOneAndUpdate({ user: userId }, update, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });

    res.status(200).json(plan);
  } catch (error) {
    console.error("Error setting carb plan:", error);
    res.status(500).json({ message: "Server error" });
  }
};
