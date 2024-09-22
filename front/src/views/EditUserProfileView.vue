<script setup>
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUsersStore } from "@/stores/UserStore";
import axios from "axios";

const route = useRoute();

const userId = route.params.id;

const form = reactive({
  firstName: "",
  lastName: "",
  username: "",
  password: "",
});

const state = reactive({
  user: {},
  isLoading: true,
});

const handleSubmit = async () => {
  const updatedUser = {
    firstName: form.firstName,
    lastName: form.lastName,
    username: form.username,
    password: form.password,
  };
  const userStore = useUsersStore();
  await userStore.updateUser(userId, updatedUser);
};

onMounted(async () => {
  try {
    const response = await axios.get(`/api/user/${userId}`);
    state.user = response.data;
    // Populate form fields
    form.firstName = state.user.firstName;
    form.lastName = state.user.lastName;
    form.username = state.user.username;
    form.password = "";
  } catch (error) {
    console.error("Error fetching user", error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <section class="bg-teal-50">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Edit Profile</h2>

          <div class="mb-4">
            <label for="firstName" class="block text-gray-700 font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              v-model="form.firstName"
              id="firstName"
              name="firstName"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="First Name"
              required />
          </div>

          <div class="mb-4">
            <label for="lastName" class="block text-gray-700 font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              v-model="form.lastName"
              id="lastName"
              name="lastName"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Last Name"
              required />
          </div>

          <div class="mb-4">
            <label for="username" class="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              v-model="form.username"
              id="username"
              name="username"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Username"
              required />
          </div>

          <div class="mb-4">
            <label for="password" class="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              v-model="form.password"
              id="password"
              name="password"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="New Password" />
            <p class="text-xs text-gray-500">
              Leave this field empty if you don't want to change your password.
            </p>
            <!-- Additional guidance below the field -->
          </div>

          <div>
            <button
              class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
