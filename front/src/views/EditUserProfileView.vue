<script setup>
import router from "@/router";
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import axios from "axios";

const route = useRoute();
const toast = useToast();

const userId = route.params.id;

const form = reactive({
  firstname: "test",
  lastname: "test",
  username: "test",
  email: "test",
  phone: "test",
});

const state = reactive({
  user: {},
  // TODO turn back to true when done with backend
  isLoading: flase,
});

const handleSubmit = async () => {
  // const updatedUser = {
  //   firstname: form.firstname,
  //   lastname: form.lastname,
  //   username: form.username,
  //   email: form.email,
  //   phone: form.phone,
  // };
  // try {
  //   const response = await axios.put(`/api/users/${userId}`, updatedUser);
  //   toast.success("Profile Updated Successfully");
  //   router.push(`/users/${response.data.id}`);
  // } catch (error) {
  //   console.error("Error updating profile", error);
  //   toast.error("Profile Update Failed");
  // }
};

onMounted(async () => {
  try {
    // const response = await axios.get(`/api/users/${userId}`);
    state.user = response.data;
    // Populate form fields
    form.firstname = "state.user.firstname";
    form.lastname = "state.user.lastname";
    form.username = "state.user.username";
    form.email = "state.user.email";
    form.phone = "state.user.phone";
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
            <label for="firstname" class="block text-gray-700 font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              v-model="form.firstname"
              id="firstname"
              name="firstname"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="First Name"
              required />
          </div>

          <div class="mb-4">
            <label for="lastname" class="block text-gray-700 font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              v-model="form.lastname"
              id="lastname"
              name="lastname"
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
            <label for="email" class="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              v-model="form.email"
              id="email"
              name="email"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Email"
              required />
          </div>

          <div class="mb-4">
            <label for="phone" class="block text-gray-700 font-bold mb-2">
              Phone
            </label>
            <input
              type="tel"
              v-model="form.phone"
              id="phone"
              name="phone"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Phone (Optional)" />
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
