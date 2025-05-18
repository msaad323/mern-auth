import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);
    const user = new User({ username, email, password: hashPassword });
    await user.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    next(errorHandler(400, err.message));
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(400, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) return next(errorHandler(400, "wrong credentials!"));
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(rest);
  } catch (err) {
    next(errorHandler(400, err.message));
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      res
        .cookie("accessToken", token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json(rest);
    } else {
      const generatePassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        email,
        password: hashedPassword,
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        profilePicture: req.body.profileUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res
        .cookie("accessToken", token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json(rest);
    }
  } catch (err) {
    next(errorHandler(400, err.message));
  }
};
