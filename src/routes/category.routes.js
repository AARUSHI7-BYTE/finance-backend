import express from "express";
import {
  getCategories,
  createCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { verifyUser } from "../middleware/auth.js";

const router = express.Router();


router.get("/", verifyUser, getCategories);
router.post("/", verifyUser, createCategory);
router.delete("/:id", verifyUser, deleteCategory);

export default router;