import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10)
    const user = new User({ username, email, password: hashPassword });
    await user.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: `${Object.keys(err.keyValue)[0]} already exists.` });
    }
    res.status(400).json({ error: err.message });
  }
};
