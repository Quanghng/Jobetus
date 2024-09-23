import {
  handleGetUser,
  handleUpdateUser,
  handleDeleteUser,
} from "@/controllers/userController";
import { getUser, updateUser, deleteUser } from "@/services/userService";
import UserModel from "@/models/User";

// Mock the services and models
jest.mock("@/services/userService", () => ({
  getUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
}));

jest.mock("@/models/User", () => ({
  findOne: jest.fn(),
}));

describe("UserController", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  describe("handleGetUser", () => {
    it("should return user data and status 200 if user is found", async () => {
      req.params.id = "user123";
      const mockUser = { id: "user123", username: "testUser" };
      getUser.mockResolvedValue(mockUser);

      await handleGetUser(req, res);

      expect(getUser).toHaveBeenCalledWith("user123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it("should return 404 if user is not found", async () => {
      req.params.id = "invalidUser";
      getUser.mockResolvedValue(null);

      await handleGetUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith("User not found.");
    });

    it("should return 500 if there is an error", async () => {
      req.params.id = "user123";
      getUser.mockRejectedValue(new Error("Fetch error"));

      await handleGetUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(
        "An error occurred while fetching user."
      );
    });
  });

  describe("handleUpdateUser", () => {
    it("should update the user and return status 200", async () => {
      req.params.id = "user123";
      req.body = { username: "updatedUser" };
      const mockUser = { id: "user123", username: "updatedUser" };
      UserModel.findOne.mockResolvedValue(null); // No existing user with that username
      updateUser.mockResolvedValue(mockUser);

      await handleUpdateUser(req, res);

      expect(updateUser).toHaveBeenCalledWith("user123", req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it("should return 400 if user already exists", async () => {
      req.params.id = "user123";
      req.body = { username: "existingUser" };
      const existingUser = { id: "existingUserId", username: "existingUser" };
      UserModel.findOne.mockResolvedValue(existingUser); // User already exists

      await handleUpdateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "User already exsits !",
      });
    });

    it("should return 500 if there is an error during update", async () => {
      req.params.id = "user123";
      req.body = { username: "updatedUser" };
      UserModel.findOne.mockResolvedValue(null);
      updateUser.mockRejectedValue(new Error("Update error"));

      await handleUpdateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(
        "An error occurred while updating user."
      );
    });
  });

  describe("handleDeleteUser", () => {
    it("should delete the user and return status 200", async () => {
      req.params.id = "user123";
      await handleDeleteUser(req, res);

      expect(deleteUser).toHaveBeenCalledWith("user123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith("User deleted!");
    });

    it("should return 500 if there is an error during deletion", async () => {
      req.params.id = "user123";
      deleteUser.mockRejectedValue(new Error("Delete error"));

      await handleDeleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(
        "An error occurred while deleting job."
      );
    });
  });
});
