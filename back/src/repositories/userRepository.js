import UserModel from "../models/User";
import JobModel from "../models/Job";

export function registerUserDb(newUser) {
  const job = new UserModel(newUser);
  return job.save();
}

export function findUserDb(userId) {
  return UserModel.findOne({ id: userId });
}

export async function editUserDb(userId, updatedUser) {
  // Update jobs by user only if username changed
  const currentUser = await UserModel.findOne({ id: userId });

  const user = await UserModel.findOneAndUpdate(
    { id: userId },
    { $set: updatedUser },
    { new: true }
  );

  if (currentUser.username !== updatedUser.username) {
    const jobs = await JobModel.find({ creatorId: userId });

    for (const job of jobs) {
      await JobModel.updateOne(
        { id: job.id },
        { $set: { creator: updatedUser.username } }
      );
    }
  }

  return user;
}
