import supabase from "../config/supabase.js";


export const getCategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("user_id", req.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Supabase error:", error);
      return res.status(400).json(error);
    }

    res.json(data);
  } catch (err) {
    console.log("Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================================
   CREATE CATEGORY
================================ */
export const createCategory = async (req, res) => {
  try {
    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({
        message: "Name and type are required",
      });
    }

    const { data, error } = await supabase
      .from("categories")
      .insert([
        {
          name,
          type,
          user_id: req.user.id, // 🔐 secure link to logged-in user
        },
      ])
      .select();

    if (error) {
      console.log("Supabase error:", error);
      return res.status(400).json(error);
    }

    res.status(201).json(data);
  } catch (err) {
    console.log("Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id)
      .eq("user_id", req.user.id); // 🔐 ensure user owns it

    if (error) {
      console.log("Supabase error:", error);
      return res.status(400).json(error);
    }

    res.json({ message: "Category deleted" });
  } catch (err) {
    console.log("Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
};