import express from "express";
import { createGoal, getGoals,deleteGoal } from "../controllers/goal.controller.js";
import { verifyUser } from "../middleware/auth.js";
import { addContribution } from "../controllers/goal.controller.js";

const router = express.Router();

router.post("/", verifyUser, createGoal);
router.get("/", verifyUser, getGoals);
router.delete("/:id", verifyUser, deleteGoal);
router.put("/:id/contribute", verifyUser, addContribution);

export default router;