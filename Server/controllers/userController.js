import User from "../models/User.js";

// GET user by ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id || req.user?.id;

    // base query
    const user = await User.findById(userId).select("name email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET current user (used in dashboard or session)
const getUser = async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId;

    console.log(userId);

    const user = await User.findById(userId).select("name email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  getUserById,
  getUser,
};
