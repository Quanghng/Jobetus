<script setup>
import { reactive, onMounted } from "vue";
import { useRoute, RouterLink, useRouter } from "vue-router";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import BackButton from "@/components/BackButton.vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { useAuthStore } from "@/stores/AuthStore";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const authStore = useAuthStore();
const userId = route.params.id;

const state = reactive({
  user: Object,
  jobs: [],
  // TODO turn back to true when done with backend
  isLoading: false,
});

const deleteUser = async () => {
  // try {
  //   const confirm = window.confirm("Are you sure you want to delete your account?");
  //   if (confirm) {
  //     await axios.delete(`/api/users/${userId}`);
  //     toast.success("Account Deleted Successfully");
  //     router.push({ name: "home" });
  //   }
  // } catch (error) {
  //   console.error("Error deleting account", error);
  //   toast.error("Account not deleted");
  // }
};

onMounted(async () => {
  try {
    // Fetching user's data
    const userResponse = await axios.get(`/api/user/${userId}`);
    state.user = userResponse.data;

    // Fetching jobs that this user created
    const jobsResponse = await axios.get(`/api/user/${userId}/jobs`);
    state.jobs = jobsResponse.data;
  } catch (error) {
    console.error("Error fetching user or jobs", error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <BackButton />
  <section v-if="!state.isLoading" class="bg-teal-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div
            class="bg-white p-8 rounded-lg shadow-lg text-center md:text-left">
            <h3 class="text-xl font-bold mb-4 text-gray-700">User Profile</h3>
            <h1 class="text-4xl font-bold mb-4 text-gray-900">
              {{ state.user.firstName }} {{ state.user.lastName }}
            </h1>
            <div
              class="text-gray-500 mb-6 flex items-center justify-center md:justify-start">
              <span class="text-orange-700 font-semibold">Username:</span>
              <p class="ml-2">{{ state.user.username }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6 text-gray-700">Posted Jobs</h3>

            <ul>
              <li
                v-for="job in state.jobs"
                :key="job.id"
                class="mb-4 border-b border-gray-300 pb-2">
                <RouterLink :to="`/jobs/${job.id}`" class="text-teal-500">
                  {{ job.title }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Manage Account -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6 text-gray-700">Manage Account</h3>

            <RouterLink
              :to="`/users/edit/${state.user.id}`"
              class="bg-teal-500 hover:bg-teal-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >Update Account</RouterLink
            >

            <button
              @click="deleteUser"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
              Delete Account
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <!-- Show loading spinner while loading is true -->
  <div v-else class="text-center text-gray-500 py-6">
    <PulseLoader />
  </div>
</template>
