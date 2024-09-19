import { v4 as uuidv4 } from "uuid";

export function findAllJobsDb(collection) {
  return collection.find({}).toArray();
}

export function findJobDb(collection, jobId) {
  return collection.findOne({ id: jobId });
}

export function editJobDb(collection, jobId, updatedJob) {
  collection.updateOne({ id: jobId }, { $set: updatedJob });
  return collection.findOne({ id: jobId });
}

export function addJobDb(collection, newJob) {
  newJob.id = uuidv4();
  collection.insertOne(newJob);
  return newJob;
}

export function deleteJobDb(collection, jobId) {
  return collection.deleteOne({ id: jobId });
}
