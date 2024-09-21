import { findUserDb } from "../repositories/userRpository";

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
