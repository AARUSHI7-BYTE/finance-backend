import express from "express";
import { createGoal, getGoals } from "../controllers/goal.controller.js";
import { verifyUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyUser, createGoal);
router.get("/", verifyUser, getGoals);

export default router;