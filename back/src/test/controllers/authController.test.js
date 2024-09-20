import { handleRegisterUser, handleLogin } from "@/controllers/authController";
import UserModel from "@/models/User";
import { registerUser } from "@/services/authService";
import * as jwt from "jsonwebtoken";

// Mock the services and models
jest.mock("@/services/authService", () => ({
  registerUser: jest.fn(),
}));

jest.mock("@/models/User", () => ({
  findOne: jest.fn(),
  prototype: {
    comparePassword: jest.fn(),
  },
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("AuthController", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  describe("handleRegisterUser", () => {
    it("should register a new user and return 201", async () => {
      const newUser = { username: "testUser", password: "testPass" };
      req.body = newUser;

      const mockUser = { id: "user123", username: "testUser" };
      registerUser.mockResolvedValue(mockUser);

      await handleRegisterUser(req, res);

      expect(registerUser).toHaveBeenCalledWith(newUser);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it("should return 500 if there is an error during registration", async () => {
      req.body = { username: "testUser", password: "testPass" };

      registerUser.mockRejectedValue(new Error("Registration error"));

      await handleRegisterUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(
        "An error occurred while adding user."
      );
    });
  });

  describe("handleLogin", () => {
    it("should log in the user and return the token", async () => {
      req.body = { username: "testUser", password: "testPass" };

      const mockUser = {
        _id: "user123",
        username: "testUser",
        comparePassword: jest.fn().mockResolvedValue(true),
      };
      UserModel.findOne.mockResolvedValue(mockUser);

      const mockToken = "mockJwtToken";
      jwt.sign.mockReturnValue(mockToken);

      await handleLogin(req, res);

      expect(UserModel.findOne).toHaveBeenCalledWith({ username: "testUser" });
      expect(mockUser.comparePassword).toHaveBeenCalledWith("testPass");
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: mockUser._id, username: mockUser.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      expect(res.json).toHaveBeenCalledWith({
        user: { ...mockUser, token: mockToken },
      });
    });

    it("should return 400 if user is not found", async () => {
      req.body = { username: "invalidUser", password: "testPass" };

      UserModel.findOne.mockResolvedValue(null);

      await handleLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
    });

    it("should return 400 if password is incorrect", async () => {
      req.body = { username: "testUser", password: "wrongPass" };

      const mockUser = {
        username: "testUser",
        comparePassword: jest.fn().mockResolvedValue(false),
      };
      UserModel.findOne.mockResolvedValue(mockUser);

      await handleLogin(req, res);

      expect(UserModel.findOne).toHaveBeenCalledWith({ username: "testUser" });
      expect(mockUser.comparePassword).toHaveBeenCalledWith("wrongPass");
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
    });

    it("should return 500 if there is an error during login", async () => {
      req.body = { username: "testUser", password: "testPass" };

      UserModel.findOne.mockRejectedValue(new Error("Login error"));

      await handleLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error logging in",
        error: new Error("Login error"),
      });
    });
  });
});
