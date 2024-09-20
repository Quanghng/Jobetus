import UserModel from "../models/User";
import { registerUser } from "../services/authService";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

export async function handleRegisterUser(req, res) {
  const newUser = req.body;
  try {
    const isUserExists = await UserModel.findOne({
      username: newUser.username,
    });
    if (isUserExists) {
      return res.status(400).json({ message: "User already exsits !" });
    }
    user = await registerUser(newUser);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send("An error occurred while adding user.");
  }
}

export async function handleLogin(req, res) {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exsit !" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password !" });
    }

    // Generate and assign JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET, // Ensure this is a string and not undefined
      { expiresIn: "1h" }
    );
    user.token = token;
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
}
