import supabase from "../config/supabase.js";

export const createGoal = async (req, res) => {
  const { title, target_amount, deadline } = req.body;

  const { data, error } = await supabase
    .from("savings_goals")
    .insert([
      {
        user_id: req.user.id,
        title,
        target_amount,
        deadline,
      },
    ]);

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