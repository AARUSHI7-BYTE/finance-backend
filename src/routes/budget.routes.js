import express from "express";
import { createBudget, getBudgets } from "../controllers/budget.controller.js";
import { verifyUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyUser, createBudget);
router.get("/", verifyUser, getBudgets);

export default router;