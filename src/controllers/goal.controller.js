import supabase from "../config/supabase.js";

export const createGoal = async (req, res) => {
  const { title, target_amount, deadline } = req.body;

  const { data, error } = await supabase
    .from("savings_goals")
    .insert([
      {
        title,
        target_amount,
        deadline,
        user_id: req.user.id,
      },
    ])
    .select();

  if (error) return res.status(400).json(error);

  res.json(data);
};

export const getGoals = async (req, res) => {
  const { data, error } = await supabase
    .from("savings_goals")
    .select("*")
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json(error);

  res.json(data);
};

export const deleteGoal = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("savings_goals")
    .delete()
    .eq("id", id)
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json(error);

  res.json({ message: "Goal deleted" });
};
export const addContribution = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  // 1️⃣ Get current saved_amount
  const { data: goal, error: fetchError } = await supabase
    .from("savings_goals")
    .select("saved_amount")
    .eq("id", id)
    .eq("user_id", req.user.id)
    .single();

  if (fetchError) return res.status(400).json(fetchError);

  const newSaved =
    Number(goal.saved_amount || 0) + Number(amount);

  // 2️⃣ Update with new value
  const { data, error } = await supabase
    .from("savings_goals")
    .update({ saved_amount: newSaved })
    .eq("id", id)
    .eq("user_id", req.user.id)
    .select();

  if (error) return res.status(400).json(error);

  res.json(data);
};