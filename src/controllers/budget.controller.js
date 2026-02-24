import supabase from "../config/supabase.js";

export const createBudget = async (req, res) => {
  const { category_id, monthly_limit, month, year } = req.body;

  const { data, error } = await supabase
    .from("budgets")
    .insert([
      {
        user_id: req.user.id,
        category_id,
        monthly_limit,
        month,
        year,
      },
    ]);

  if (error) return res.status(400).json(error);

  res.json(data);
};

export const getBudgets = async (req, res) => {
  const { data, error } = await supabase
    .from("budgets")
    .select("*")
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json(error);

  res.json(data);
};