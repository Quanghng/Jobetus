import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Define a schema for the company object
const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
  },
  { _id: false }
); // _id: false means this schema will not have an _id field

// Define the main job schema
const jobSchema = new mongoose.Schema({
  id: { type: String, required: true, default: uuidv4 },
  title: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: String },
  company: { type: companySchema, required: true }, // Use the company schema here
  creator: { type: String, required: true },
  creatorId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update `updatedAt` on save
jobSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const JobModel = mongoose.model("Job", jobSchema); // Specify the collection name here

export default JobModel;
