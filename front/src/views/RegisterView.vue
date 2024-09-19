<script setup>
import { RouterLink } from "vue-router";
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { useUsersStore } from "@/stores/UserStore";
import { useAuthStore } from "@/stores/AuthStore";
import router from "@/router";

const schema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

async function onSubmit(values) {
  const usersStore = useUsersStore();
  const authStore = useAuthStore();
  try {
    // values = newUser
    await authStore.register(values);
    await router.push({ name: "login" });
    toast.success("Registration successful!");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Registration error!";
    toast.error(errorMessage);
  }
}
</script>

<template>
  <section
    class="min-h-screen flex items-center justify-center bg-teal-50 py-8">
    <div class="container max-w-lg bg-white p-6 shadow-lg rounded-lg">
      <h4 class="text-3xl font-bold text-teal-600 mb-6 text-center">
        Register
      </h4>
      <Form
        @submit="onSubmit"
        :validation-schema="schema"
        v-slot="{ errors, isSubmitting }">
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">First Name</label>
          <Field
            name="firstName"
            type="text"
            class="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            :class="{ 'border-red-500': errors.firstName }" />
          <div class="text-red-500 text-sm mt-1">{{ errors.firstName }}</div>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Last Name</label>
          <Field
            name="lastName"
            type="text"
            class="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            :class="{ 'border-red-500': errors.lastName }" />
          <div class="text-red-500 text-sm mt-1">{{ errors.lastName }}</div>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-1">Username</label>
          <Field
            name="username"
            type="text"
            class="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            :class="{ 'border-red-500': errors.username }" />
          <div class="text-red-500 text-sm mt-1">{{ errors.username }}</div>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 mb-1">Password</label>
          <Field
            name="password"
            type="password"
            class="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            :class="{ 'border-red-500': errors.password }" />
          <div class="text-red-500 text-sm mt-1">{{ errors.password }}</div>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            :disabled="isSubmitting">
            <span
              v-show="isSubmitting"
              class="spinner-border spinner-border-sm mr-1"></span>
            Register
          </button>
          <RouterLink to="/login" class="text-teal-600 hover:underline">
            Cancel
          </RouterLink>
        </div>
      </Form>
    </div>
  </section>
</template>
