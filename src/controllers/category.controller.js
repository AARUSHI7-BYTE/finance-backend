import supabase from "../config/supabase.js";

/* ================================
   GET CATEGORIES
================================ */
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
   CREATE CATEGORY (Manual)
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
          user_id: req.user.id,
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

/* ================================
   CREATE DEFAULT CATEGORIES
================================ */
export const createDefaultCategories = async (req, res) => {
  try {
    // 🔎 Check if user already has categories
    const { data: existing, error: checkError } = await supabase
      .from("categories")
      .select("id")
      .eq("user_id", req.user.id);

    if (checkError) {
      console.log("Check error:", checkError);
      return res.status(400).json(checkError);
    }

    if (existing.length > 0) {
      return res.json({
        message: "Default categories already exist",
      });
    }

    const defaultCategories = [
      { name: "Food", type: "expense" },
      { name: "Travel", type: "expense" },
      { name: "Bills", type: "expense" },
      { name: "Entertainment", type: "expense" },
      { name: "Salary", type: "income" },
    ];

    const { error } = await supabase
      .from("categories")
      .insert(
        defaultCategories.map((cat) => ({
          ...cat,
          user_id: req.user.id,
        }))
      );

    if (error) {
      console.log("Insert error:", error);
      return res.status(400).json(error);
    }

    res.json({ message: "Default categories created" });
  } catch (err) {
    console.log("Server error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================================
   DELETE CATEGORY
================================ */
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id)
      .eq("user_id", req.user.id);

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