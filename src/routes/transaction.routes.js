import express from "express";
import {
  addTransaction,
  getTransactions,
  deleteTransaction,
} from "../controllers/transaction.controller.js";
import { verifyUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyUser, addTransaction);
router.get("/", verifyUser, getTransactions);
router.delete("/:id", verifyUser, deleteTransaction);

export default router;