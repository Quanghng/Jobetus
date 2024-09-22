const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

require("dotenv").config();

async function main() {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("etuJobsDB");
    const jobCollection = database.collection("jobs");
    const userCollection = database.collection("users");

    // Load job data
    const jobs = [
      {
        title: "Software Engineer",
        type: "Full-Time",
        location: "San Francisco, CA",
        description:
          "Join our team to develop cutting-edge software solutions.",
        salary: "$120K - $140K",
        company: {
          name: "Tech Innovations Inc.",
          description: "A leader in software development and tech solutions.",
          contactEmail: "info@techinnovations.com",
          contactPhone: "+1 (415) 555-0123",
        },
        creator: "johnsmith",
        creatorId: "12345678-1234-1234-1234-123456789012",
        id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
      },
      {
        title: "Product Manager",
        type: "Part-Time",
        location: "New York, NY",
        description: "Seeking a talented Product Manager to lead our projects.",
        salary: "$90K - $110K",
        company: {
          name: "Global Enterprises",
          description: "We focus on innovative products and user experiences.",
          contactEmail: "contact@globalenterprises.com",
          contactPhone: "+1 (212) 555-9876",
        },
        creator: "janedoe",
        creatorId: "23456789-2345-2345-2345-234567890123",
        id: "7a8b9c0d-e1f2-3g4h-5i6j-7k8l9m0n1o2p",
      },
      {
        title: "UI/UX Designer",
        type: "Contract",
        location: "Remote",
        description:
          "Looking for a creative UI/UX Designer to enhance our applications.",
        salary: "$75K - $95K",
        company: {
          name: "Design Masters",
          description: "We create visually stunning and user-friendly designs.",
          contactEmail: "hello@designmasters.com",
          contactPhone: "+1 (800) 555-0147",
        },
        creator: "mikejohnson",
        creatorId: "34567890-3456-3456-3456-345678901234",
        id: "3b4c5d6e-7f8g-9h0i-1j2k-3l4m5n6o7p8q",
      },
      {
        title: "Data Analyst",
        type: "Full-Time",
        location: "Chicago, IL",
        description: "Join our analytics team to derive insights from data.",
        salary: "$85K - $105K",
        company: {
          name: "Insight Analytics",
          description: "We specialize in data-driven solutions for businesses.",
          contactEmail: "support@insightanalytics.com",
          contactPhone: "+1 (312) 555-0189",
        },
        creator: "alicewhite",
        creatorId: "45678901-4567-4567-4567-456789012345",
        id: "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
      },
      {
        title: "DevOps Engineer",
        type: "Full-Time",
        location: "Austin, TX",
        description:
          "Seeking a DevOps Engineer to streamline our development processes.",
        salary: "$100K - $120K",
        company: {
          name: "Cloud Solutions LLC",
          description:
            "We provide cloud-based solutions for modern businesses.",
          contactEmail: "contact@cloudsolutions.com",
          contactPhone: "+1 (512) 555-0234",
        },
        creator: "robertdavis",
        creatorId: "56789012-5678-5678-5678-567890123456",
        id: "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
      },
    ];

    // Insert jobs into the database
    const jobResult = await jobCollection.insertMany(jobs);
    console.log("Successfully loaded job data", jobResult);

    // Custom function to hash a password
    async function hashPassword(password) {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    }

    // Load user data
    const users = [
      {
        firstName: "John",
        lastName: "Smith",
        username: "johnsmith",
        password: "password123",
        id: "12345678-1234-1234-1234-123456789012",
      },
      {
        firstName: "Jane",
        lastName: "Doe",
        username: "janedoe",
        password: "securepassword",
        id: "23456789-2345-2345-2345-234567890123",
      },
      {
        firstName: "Mike",
        lastName: "Johnson",
        username: "mikejohnson",
        password: "mikepassword",
        id: "34567890-3456-3456-3456-345678901234",
      },
      {
        firstName: "Alice",
        lastName: "White",
        username: "alicewhite",
        password: "alicepassword",
        id: "45678901-4567-4567-4567-456789012345",
      },
      {
        firstName: "Robert",
        lastName: "Davis",
        username: "robertdavis",
        password: "robertpassword",
        id: "56789012-5678-5678-5678-567890123456",
      },
    ];
    // Hash passwords and prepare user data for insertion
    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await hashPassword(user.password);
        return {
          ...user,
          password: hashedPassword, // Replace plain password with hashed one
        };
      })
    );

    // Insert users into the database
    const userResult = await userCollection.insertMany(
      usersWithHashedPasswords
    );
    console.log("Successfully loaded user data", userResult);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  } finally {
    // Close the connection
    await client.close();
    console.log("Connection closed");
  }
}

main();
