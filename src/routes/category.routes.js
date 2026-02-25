
import express from "express";
import { getCategories } from "../controllers/category.controller.js";
import { verifyUser } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyUser, getCategories);

export default router;