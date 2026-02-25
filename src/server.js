import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import categoryRoutes from "./routes/category.routes.js";
import authRoutes from "./routes/auth.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import budgetRoutes from "./routes/budget.routes.js";
import goalRoutes from "./routes/goal.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();   // ✅ CREATE APP FIRST

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API running");
});

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 4800;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});