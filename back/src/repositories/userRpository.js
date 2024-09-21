import UserModel from "../models/User";

export function registerUserDb(newUser) {
  const job = new UserModel(newUser);
  return job.save();
}

export function findUserDb(userId) {
  return UserModel.findOne({ id: userId });
}
