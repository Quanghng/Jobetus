import { defineStore } from "pinia";
import { useAuthStore } from "./AuthStore";
import axios from "axios";

export const useUsersStore = defineStore({
  id: "user",
  state: () => ({
    // Can hold {} / {loading: true} / [{...},{...},..,{...}] / {error: message}
    // users: {},

    // Can hold {} / {loading: true} / {...} / {error: message}
    user: {},
    jobs: [],
  }),
  actions: {
    // GetAllJobs -> filter id match jobs
    async getAll() {
      this.users = { loading: true };
      try {
        // TODO at backend
        this.users = await axios.get(baseUrl);
      } catch (error) {
        this.users = { error };
      }
    },
    // async getById(id) {
    //   this.user = { loading: true };
    //   try {
    //     this.user = await axios.get(`api/users/${id}`);
    //   } catch (error) {
    //     this.user = { error };
    //   }
    // },
    async update(id, params) {
      // TODO at backend
      await axios.put(`api/users/${id}`, params);

      // update local stored user if the logged in user updated their own record
      const authStore = useAuthStore();
      if (id === authStore.user.id) {
        // update local storage
        const user = { ...authStore.user, ...params };
        localStorage.setItem("user", JSON.stringify(user));

        // update auth user in pinia state
        authStore.user = user;
      }
    },
    async delete(id) {
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
