import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
// import { useUsersStore } from "./UserStore";
import router from "@/router";
import axios from "axios";

// const usersStore = useUsersStore();
const toast = useToast();

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem("user")),
    token: null,
    isLoggedIn: false,
    // redirect the user to the previous url after successful login
    returnUrl: null,
  }),
  actions: {
    async register(newUser) {
      await axios.post(`api/users/register`, newUser);
    },
    async login(username, password) {
      try {
        // TODO at backend
        const user = await axios.post(`/api/authenticate`, {
          username,
          password,
        });

        // store user details and jwt in local storage to keep user logged in between page refreshes
        // TODO check if need both
        const token = user.token;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // update pinia state
        this.user = user;
        this.user.token = token;
        this.isLoggedIn = true;
        // redirect to previous url or default to home page
        router.push({ name: "home" });
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
        // Optionally, decode the JWT and extract user info
      } else {
        this.isLoggedIn = false;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      this.isLoggedIn = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push({ name: "home" });
    },
  },
});
