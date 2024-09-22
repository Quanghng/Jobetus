import { getUser, updateUser } from "../services/userService";
import UserModel from "../models/User";

export async function handleGetUser(req, res) {
  const userId = req.params.id;
  try {
    const user = await getUser(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found.");
    }
  } catch (error) {
    res.status(500).send("An error occurred while fetching user.");
  }
}

export async function handleUpdateUser(req, res) {
  const userId = req.params.id;
  const updatedUser = req.body;
  try {
    const existUser = await UserModel.findOne({
      username: updatedUser.username,
    });
    if (existUser && userId !== existUser.id) {
      return res.status(400).json({ message: "User already exsits !" });
    }
    const user = await updateUser(userId, updatedUser);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("An error occurred while updating user.");
  }
}
