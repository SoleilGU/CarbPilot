import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import carbPlanRoutes from "./routes/carbPlanRoutes.js";
import mealRoutes from "./routes/mealRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import carbRoutes from "./routes/carbRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/carbplan", carbPlanRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/users", userRoutes);
app.use("/api/carb", carbRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
