import supabase from "../config/supabase.js";

export const getSummary = async (req, res) => {
  const { data, error } = await supabase
    .from("transactions")
    .select("amount, type")
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json(error);

  const income = data
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = data
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  res.json({
    income,
    expense,
    savings: income - expense,
  });
};