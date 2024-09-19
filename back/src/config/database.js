import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../env" });

export async function connectToMongo() {
  try {
    await mongoose.connect("mongodb://localhost:27017", {
      dbName: "etuJobsDB",
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
