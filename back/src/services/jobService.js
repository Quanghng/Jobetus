import {
  findAllJobsDb,
  findJobDb,
  editJobDb,
  addJobDb,
  deleteJobDb,
  findJobsByCreatorIdDb,
} from "../repositories/jobRepository";

// Fetch all jobs
export function getAllJobs() {
  return findAllJobsDb()
    .then((jobs) => {
      return jobs;
    })
    .catch((error) => {
      console.error("An error has occurred:", error);
      throw error;
    });
}

// Fetch a single job by jobId
export function getJob(jobId) {
  return findJobDb(jobId)
    .then((job) => {
      return job;
    })
    .catch((error) => {
      console.error("An error has occurred:", error);
      throw error;
    });
}

// Fetch all jobs by userId
export function getJobsByUserId(userId) {
  return findJobsByCreatorIdDb(userId)
    .then((jobs) => {
      return jobs;
    })
    .catch((error) => {
      console.error("An error has occurred:", error);
      throw error;
    });
}

// Update an existing job
export function updateJob(jobId, updatedJob) {
  return editJobDb(jobId, updatedJob)
    .then((job) => {
      console.log("Job updated:", job);
      return job;
    })
    .catch((error) => {
      console.error("An error has occurred:", error);
      throw error;
    });
}

// Add a new job
export function addJob(newJob) {
  return addJobDb(newJob)
    .then((job) => {
      console.log("Job added:", job);
      return job;
    })
    .catch((error) => {
      console.error("An error has occurred:", error);
      throw error;
    });
}

// Delete a job by jobId
export function deleteJob(jobId) {
  return deleteJobDb(jobId)
    .then(() => {
      console.log("Job deleted!");
    })
    .catch((error) => {
      console.error("An error has occurred:", error);
      throw error;
    });
}
