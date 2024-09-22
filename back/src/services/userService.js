import { findUserDb, editUserDb } from "../repositories/userRepository";

// Fetch a single user by userId
export function getUser(userId) {
  return findUserDb(userId)
    .then((user) => {
      return user;
    })
    .catch((error) => {
      console.error("An error has occurred:", error);
      throw error;
    });
}

export function updateUser(userId, updatedUser) {
  return editUserDb(userId, updatedUser)
    .then((user) => {
      console.log("User updated:", user);
      return user;
    })
    .catch((error) => {
      console.error("An error has occurred:", error);
      throw error;
    });
}
