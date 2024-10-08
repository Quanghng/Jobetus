import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { useUsersStore } from "./UserStore";
import router from "@/router";
import axios from "axios";

const toast = useToast();

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    isLoggedIn: !!localStorage.getItem("token"), // Check if token exists to set isLoggedIn
    returnUrl: null,
  }),
  actions: {
    async register(newUser) {
      try {
        await axios.post(`api/users/register`, newUser);
        router.push({ name: "login" });
        toast.success("Registration successful!");
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Authentication error!";
        toast.error(errorMessage);
      }
    },
    async login(username, password) {
      try {
        // TODO at backend
        const response = await axios.post(`/api/authenticate`, {
          username,
          password,
        });

        const token = response.data.user.token;
        const user = response.data.user;

        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // update pinia state
        this.user = user;
        this.user.token = token;
        this.isLoggedIn = true;

        // update user store
        const userStore = useUsersStore();
        userStore.user = user;

        // redirect to previous url or default to home page
        router.push({ name: "home" });
        toast.success("Login successfully !");
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Authentication error!";
        toast.error(errorMessage);
      }
    },
    checkAuth() {
      const token = localStorage.getItem("token");
      if (token) {
        this.token = token;
        this.isLoggedIn = true;

        // update user store
        const userStore = useUsersStore();
        userStore.user = localStorage.getItem("user");
      } else {
        this.isLoggedIn = false;
      }
    },
    logout() {
      const confirm = window.confirm("Are you sure you want to logout?");
      if (confirm) {
        this.user = null;
        this.token = null;
        this.isLoggedIn = false;
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        // update user store
        const userStore = useUsersStore();
        userStore.user = {};

        router.push({ name: "home" });
        toast.success("Logout successfully !");
      }
    },
  },
});
