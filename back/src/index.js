// src/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  getAllJobs,
  getJob,
  updateJob,
  addJob,
  deleteJob,
} from "./controllers";

dotenv.config({
  path: ".env",
});

const app = express();
const port = process.env.PORT || 3000;

// MiddleWares
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.get("/jobs", (req, res) => {
  getAllJobs()
    .then((jobs) => {
      res.status(200).send(jobs);
    })
    .catch((error) => {
      res.status(500).send("An error occurred while fetching jobs.");
    });
});

app.get("/jobs/:id", (req, res) => {
  const jobId = req.params.id;

  getJob(jobId)
    .then((job) => {
      res.status(200).send(job);
    })
    .catch((error) => {
      res.status(500).send("An error occurred while fetching job.");
    });
});

app.put("/jobs/:id", (req, res) => {
  const jobId = req.params.id;
  const updatedJob = req.body;

  updateJob(jobId, updatedJob)
    .then((job) => {
      res.status(200).send(job);
    })
    .catch((error) => {
      res.status(500).send("An error occurred while fetching job.");
    });
});

app.post("/jobs", (req, res) => {
  const newJob = req.body;

  addJob(newJob)
    .then((job) => {
      res.status(200).send(job);
    })
    .catch((error) => {
      res.status(500).send("An error occurred while fetching job.");
    });
});

app.delete("/jobs/:id", (req, res) => {
  const jobId = req.params.id;

  deleteJob(jobId)
    .then(() => {
      res.status(200).send("Job deleted!");
    })
    .catch((error) => {
      res.status(500).send("An error occurred while fetching job.");
    });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
