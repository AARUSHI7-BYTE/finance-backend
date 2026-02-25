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
    ]).select();

  if (error) return res.status(400).json(error);

  res.json(data);
};

export const getBudgets = async (req, res) => {
  const { data, error } = await supabase
    .from("budgets")
    .select(`
      *,
      categories (
        name
      )
    `)
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json(error);

  res.json(data);
};
export const deleteBudget = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("budgets")
    .delete()
    .eq("id", id)
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json(error);

  res.json({ message: "Budget deleted" });
};