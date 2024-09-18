import {
  findAllJobsDb,
  findJobDb,
  editJobDb,
  addJobDb,
  deleteJobDb,
} from "../outils";
import { connectToMongo } from "../config/database";

export function getAllJobs() {
  return connectToMongo("jobs")
    .then((collection) => {
      return findAllJobsDb(collection);
    })
    .then((jobs) => {
      return jobs;
    })
    .catch((error) => {
      console.error("An error has occurred :", error);
    });
}

export function getJob(jobId) {
  return connectToMongo("jobs")
    .then((collection) => {
      return findJobDb(collection, jobId);
    })
    .then((job) => {
      return job;
    })
    .catch((error) => {
      console.error("An error has occurred :", error);
    });
}

export function updateJob(jobId, updatedJob) {
  return connectToMongo("jobs")
    .then((collection) => {
      return editJobDb(collection, jobId, updatedJob);
    })
    .then((job) => {
      console.log("Job updated :", job);
      return job;
    })
    .catch((error) => {
      console.error("An error has occurred :", error);
    });
}

export function addJob(newJob) {
  return connectToMongo("jobs")
    .then((collection) => {
      return addJobDb(collection, newJob);
    })
    .then((job) => {
      console.log("Job added :", job);
      return job;
    })
    .catch((error) => {
      console.error("An error has occurred :", error);
    });
}

export function deleteJob(jobId) {
  return connectToMongo("jobs")
    .then((collection) => {
      return deleteJobDb(collection, jobId);
    })
    .then(() => {
      console.log("Job deleted!");
    })
    .catch((error) => {
      console.error("An error has occurred :", error);
    });
}
