<script setup>
import { Form, Field } from "vee-validate";
import { RouterLink } from "vue-router";
import * as Yup from "yup";

import { useAuthStore } from "@/stores/AuthStore";

const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

async function onSubmit(values) {
  const authStore = useAuthStore();
  const { username, password } = values;
  await authStore.login(username, password);
  authStore.setUser;
  toast.success("Login successfully !");
}
</script>

<template>
  <section class="min-h-screen flex items-center justify-center bg-teal-50">
    <div class="container max-w-md p-6 bg-white shadow-lg rounded-lg">
      <h4 class="text-3xl font-bold text-teal-600 mb-6 text-center">Login</h4>
      <Form
        @submit="onSubmit"
        :validation-schema="schema"
        v-slot="{ errors, isSubmitting }">
        <div class="mb-4">
          <label class="block text-gray-700">Username</label>
          <Field
            name="username"
            type="text"
            class="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            :class="{ 'border-red-500': errors.username }" />
          <div class="text-red-500 text-sm mt-1">{{ errors.username }}</div>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700">Password</label>
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
            Login
          </button>
          <RouterLink to="register" class="text-teal-600 hover:underline">
            Register
          </RouterLink>
        </div>
      </Form>
    </div>
  </section>
</template>
