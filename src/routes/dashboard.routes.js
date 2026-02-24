import express from "express";
import { getSummary } from "../controllers/dashboard.controller.js";
import { verifyUser } from "../middleware/auth.js";

const router = express.Router();

router.get("/summary", verifyUser, getSummary);

export default router;