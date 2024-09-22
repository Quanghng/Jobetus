import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import { useAuthStore } from "./AuthStore";
import { useToast } from "vue-toastification";
import router from "@/router";
import axios from "axios";

export const useUsersStore = defineStore({
  id: "user",
  state: () => ({
    user: Object,
    jobs: [],
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
        console.log("user", user);

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
    async deleteUser(id) {
      // add isDeleting prop to user being deleted
      // this.users.find((x) => x.id === id).isDeleting = true;

      // TODO at backend
      await axios.delete(`api/users/${id}`);

      // remove user from list after deleted
      // this.users = this.users.filter((x) => x.id !== id);

      // auto logout if the logged in user deleted their own record
      const authStore = useAuthStore();
      if (id === authStore.user.id) {
        authStore.logout();
      }
    },
  },
});
