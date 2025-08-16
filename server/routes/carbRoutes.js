import express from "express";
import { calcCarbs } from "../controllers/carbController.js";

const router = express.Router();
router.post("/calc", calcCarbs);

export default router;
