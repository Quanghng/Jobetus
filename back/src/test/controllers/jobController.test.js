import request from "supertest";
import express from "express";
import {
  handleGetAllJobs,
  handleGetJob,
  handleUpdateJob,
  handleAddJob,
  handleDeleteJob,
} from "@/controllers/jobController.js";

// Create a mock express app
const app = express();
app.use(express.json());

// Mock the services to avoid real database interaction
jest.mock("@/services/jobService", () => ({
  getAllJobs: jest.fn(),
  getJob: jest.fn(),
  updateJob: jest.fn(),
  addJob: jest.fn(),
  deleteJob: jest.fn(),
}));

import {
  getAllJobs,
  getJob,
  updateJob,
  addJob,
  deleteJob,
} from "@/services/jobService.js";

// Define routes for the mock app
app.get("/jobs", handleGetAllJobs);
app.get("/jobs/:id", handleGetJob);
app.put("/jobs/:id", handleUpdateJob);
app.post("/jobs", handleAddJob);
app.delete("/jobs/:id", handleDeleteJob);

// Test Suite for Job Controller
describe("Job Controller", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  describe("GET /jobs", () => {
    it("should return all jobs", async () => {
      const mockJobs = [
        { id: "1", title: "Job 1", description: "Job 1 description" },
        { id: "2", title: "Job 2", description: "Job 2 description" },
      ];
      getAllJobs.mockResolvedValue(mockJobs);

      const response = await request(app).get("/jobs");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockJobs);
      expect(getAllJobs).toHaveBeenCalledTimes(1);
    });

    it("should handle errors", async () => {
      getAllJobs.mockRejectedValue(new Error("Error fetching jobs"));

      const response = await request(app).get("/jobs");

      expect(response.status).toBe(500);
      expect(response.text).toBe("An error occurred while fetching jobs.");
      expect(getAllJobs).toHaveBeenCalledTimes(1);
    });
  });

  describe("GET /jobs/:id", () => {
    it("should return a specific job", async () => {
      const mockJob = {
        id: "1",
        title: "Job 1",
        description: "Job 1 description",
      };
      getJob.mockResolvedValue(mockJob);

      const response = await request(app).get("/jobs/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockJob);
      expect(getJob).toHaveBeenCalledWith("1");
      expect(getJob).toHaveBeenCalledTimes(1);
    });

    it("should return 404 if job is not found", async () => {
      getJob.mockResolvedValue(null);

      const response = await request(app).get("/jobs/1");

      expect(response.status).toBe(404);
      expect(response.text).toBe("Job not found.");
      expect(getJob).toHaveBeenCalledWith("1");
    });

    it("should handle errors", async () => {
      getJob.mockRejectedValue(new Error("Error fetching job"));

      const response = await request(app).get("/jobs/1");

      expect(response.status).toBe(500);
      expect(response.text).toBe("An error occurred while fetching job.");
      expect(getJob).toHaveBeenCalledWith("1");
    });
  });

  describe("POST /jobs", () => {
    it("should add a new job", async () => {
      const newJob = { title: "New Job", description: "Job description" };
      const addedJob = { id: "123", ...newJob };
      addJob.mockResolvedValue(addedJob);

      const response = await request(app).post("/jobs").send(newJob);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(addedJob);
      expect(addJob).toHaveBeenCalledWith(newJob);
    });

    it("should handle errors when adding a job", async () => {
      addJob.mockRejectedValue(new Error("Error adding job"));

      const response = await request(app).post("/jobs").send({});

      expect(response.status).toBe(500);
      expect(response.text).toBe("An error occurred while adding job.");
      expect(addJob).toHaveBeenCalledTimes(1);
    });
  });

  describe("PUT /jobs/:id", () => {
    it("should update an existing job", async () => {
      const updatedJob = {
        title: "Updated Job",
        description: "Updated description",
      };
      updateJob.mockResolvedValue(updatedJob);

      const response = await request(app).put("/jobs/1").send(updatedJob);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedJob);
      expect(updateJob).toHaveBeenCalledWith("1", updatedJob);
    });

    it("should handle errors when updating a job", async () => {
      updateJob.mockRejectedValue(new Error("Error updating job"));

      const response = await request(app).put("/jobs/1").send({});

      expect(response.status).toBe(500);
      expect(response.text).toBe("An error occurred while updating job.");
      expect(updateJob).toHaveBeenCalledTimes(1);
    });
  });

  describe("DELETE /jobs/:id", () => {
    it("should delete a job", async () => {
      deleteJob.mockResolvedValue();

      const response = await request(app).delete("/jobs/1");

      expect(response.status).toBe(200);
      expect(response.text).toBe("Job deleted!");
      expect(deleteJob).toHaveBeenCalledWith("1");
    });

    it("should handle errors when deleting a job", async () => {
      deleteJob.mockRejectedValue(new Error("Error deleting job"));

      const response = await request(app).delete("/jobs/1");

      expect(response.status).toBe(500);
      expect(response.text).toBe("An error occurred while deleting job.");
      expect(deleteJob).toHaveBeenCalledWith("1");
    });
  });
});
