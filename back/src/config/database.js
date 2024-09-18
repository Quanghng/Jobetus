import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({
  path: "../env",
});

export async function connectToMongo(collectionName) {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    return client.db("etuJobsDB").collection(collectionName);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
