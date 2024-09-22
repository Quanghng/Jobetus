// src/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToMongo } from "./config/database";
import {
  handleGetAllJobs,
  handleGetJob,
  handleUpdateJob,
  handleAddJob,
  handleDeleteJob,
  handleGetJobsByUserId,
} from "./controllers/jobController";
import { handleRegisterUser, handleLogin } from "./controllers/authController";
import { handleGetUser, handleUpdateUser } from "./controllers/userController";

dotenv.config({
  path: ".env",
});

const app = express();
const port = process.env.PORT || 3000;

connectToMongo()
  .then(() => {
    // MiddleWares
    app.use(
      cors({
        origin: "*",
        credentials: true,
      })
    );
    app.use(express.json());

    // Define routes and attach controller functions
    // Job routes
    app.get("/jobs", handleGetAllJobs);
    app.get("/jobs/:id", handleGetJob);
    app.put("/jobs/:id", handleUpdateJob);
    app.post("/jobs", handleAddJob);
    app.delete("/jobs/:id", handleDeleteJob);

    // Auth routes
    app.post("/users/register", handleRegisterUser);
    app.post("/authenticate", handleLogin);

    // User routes
    app.get("/user/:id", handleGetUser);
    app.get("/user/:id/jobs", handleGetJobsByUserId);
    app.put("/user/edit/:id", handleUpdateUser);
    // app.delete("/user/:id", handleUpdateUser);

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
  });
