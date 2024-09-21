import { getUser } from "../services/userService";

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
