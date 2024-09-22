// src/controllers/jobController.js
import {
  getAllJobs,
  getJob,
  updateJob,
  addJob,
  deleteJob,
  getJobsByUserId,
} from "../services/jobService";

// Fetch all jobs
export async function handleGetAllJobs(req, res) {
  try {
    const jobs = await getAllJobs();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).send("An error occurred while fetching jobs.");
  }
}

// Fetch a single job by jobId
export async function handleGetJob(req, res) {
  const jobId = req.params.id;
  try {
    const job = await getJob(jobId);
    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).send("Job not found.");
    }
  } catch (error) {
    res.status(500).send("An error occurred while fetching job.");
  }
}

// Get jobs by userId
export async function handleGetJobsByUserId(req, res) {
  const userId = req.params.id;
  try {
    const jobs = await getJobsByUserId(userId);
    if (jobs) {
      res.status(200).json(jobs);
    } else {
      res.status(404).send("Jobs not found.");
    }
  } catch (error) {
    res.status(500).send("An error occurred while fetching jobs.");
  }
}

// Update an existing job
export async function handleUpdateJob(req, res) {
  const jobId = req.params.id;
  const updatedJob = req.body;
  try {
    const job = await updateJob(jobId, updatedJob);
    res.status(200).json(job);
  } catch (error) {
    res.status(500).send("An error occurred while updating job.");
  }
}

// Add a new job
export async function handleAddJob(req, res) {
  const newJob = req.body;
  try {
    const job = await addJob(newJob);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).send("An error occurred while adding job.");
  }
}

// Delete a job by jobId
export async function handleDeleteJob(req, res) {
  const jobId = req.params.id;
  try {
    await deleteJob(jobId);
    res.status(200).send("Job deleted!");
  } catch (error) {
    res.status(500).send("An error occurred while deleting job.");
  }
}
