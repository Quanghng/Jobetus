import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import { useAuthStore } from "./AuthStore";
import { useToast } from "vue-toastification";
import router from "@/router";
import axios from "axios";

const toast = useToast();

export const useUsersStore = defineStore({
  id: "user",
  state: () => ({
    user: Object,
  }),
  actions: {
    async updateUser(userId, updatedUser) {
      const toast = useToast();
      try {
        const response = await axios.put(
          `/api/user/edit/${userId}`,
          updatedUser
        );

        const user = response.data;

        // update local storage
        localStorage.setItem("user", JSON.stringify(user));

        // update pinia state
        const authStore = useAuthStore();
        authStore.user = user;

        router.push(`/user/${user.id}`);
        toast.success("Profile Updated Successfully");
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "updateUser error!";
        toast.error(errorMessage);
      }
    },
    async deleteUser(userId) {
      try {
        const confirm = window.confirm(
          "Are you sure you want to delete this account?"
        );
        if (confirm) {
          await axios.delete(`/api/user/${userId}`);

          // Redo the logout action to prevent the window warning
          const authStore = useAuthStore();
          authStore.user = null;
          authStore.token = null;
          authStore.isLoggedIn = false;
          localStorage.removeItem("user");
          localStorage.removeItem("token");

          // update user store
          this.user = {};

          router.push({ name: "home" });
          toast.success("Account Deleted Successfully");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "deleteUser error!";
        toast.error(errorMessage);
      }
    },
  },
});
