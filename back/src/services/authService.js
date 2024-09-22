import { registerUserDb } from "../repositories/userRepository";

export function registerUser(newUser) {
  return registerUserDb(newUser)
    .then((user) => {
      console.log("User added:", user);
      return user;
    })
    .catch((error) => {
      console.error("An error has occurred:", error);
      throw error;
    });
}
