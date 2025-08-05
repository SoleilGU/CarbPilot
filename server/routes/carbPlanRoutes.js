import express from "express";
import { getCarbPlan, setCarbPlan } from "../controllers/carbPlanController.js";

const router = express.Router();

router.get("/:id", getCarbPlan);
router.post("/", setCarbPlan);

export default router;
