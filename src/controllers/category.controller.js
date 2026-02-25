
import supabase from "../config/supabase.js";

export const getCategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("user_id", req.user.id); // fetch only logged-in user categories

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