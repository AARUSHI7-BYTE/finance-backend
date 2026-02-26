import supabase from "../config/supabase.js";

export const addTransaction = async (req, res) => {
  const { amount, category_id, type, description, tags } = req.body;

  const { data, error } = await supabase
    .from("transactions")
    .insert([
      {
        user_id: req.user.id,
        amount,
        category_id,
        type,
        description,
        tags,
      },
    ]);
    console.log("REQ.USER:", req.user);
    console.log("USER ID:", req.user?.id);

  if (error) return res.status(400).json(error);

  res.json(data);
};

export const getTransactions = async (req, res) => {
  const { data, error } = await supabase
    .from("transactions")
    .select(`
      *,
      categories (
        name
      )
    `)
    .eq("user_id", req.user.id)
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json(error);

  // Flatten category name
  const formatted = data.map((t) => ({
    ...t,
    category_name: t.categories?.name || "Other",
  }));

  res.json(formatted);
};


export const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id)
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json(error);

  res.json({ message: "Deleted successfully" });
};