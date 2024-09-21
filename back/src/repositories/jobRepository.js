import JobModel from "../models/Job";

export function findAllJobsDb() {
  return JobModel.find({});
}

export function findJobDb(jobId) {
  return JobModel.findOne({ id: jobId });
}

export async function editJobDb(jobId, updatedJob) {
  await JobModel.updateOne({ id: jobId }, { $set: updatedJob });
  return JobModel.findOne({ id: jobId });
}

export function addJobDb(newJob) {
  const job = new JobModel(newJob);
  return job.save();
}

export function deleteJobDb(jobId) {
  return JobModel.deleteOne({ id: jobId });
}

export function findJobsByCreatorIdDb(creatorId) {
  return JobModel.find({ creatorId });
}
