import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";
import carbPlanRoutes from "./routes/carbPlanRoutes.js";
import mealRoutes from "./routes/mealRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/carbplan", carbPlanRoutes);
app.use("/api/meals", mealRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
