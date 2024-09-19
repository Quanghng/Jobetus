import UserModel from "../models/User";

export function registerUserDb(newUser) {
  const job = new UserModel(newUser);
  return job.save();
}
