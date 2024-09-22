import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, default: uuidv4 },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true, maxLength: 256 }, // Hashed with bcrypt
  token: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Encrypt password before updating
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  const query = this.getQuery(); // get the userId from the query

  // Only proceed if the password is being updated
  if (update.$set && update.$set.password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(update.$set.password, saltRounds);
    update.$set.password = hashedPassword;
  } else {
    // If the password is empty, retain the old password
    const userId = query.id;
    const existingUser = await this.model.findOne({ id: userId });

    if (existingUser) {
      update.$set.password = existingUser.password;
    }
  }

  next();
});

// Check if password matches
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error;
  }
};

// Middleware to update `updatedAt` on save
userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
