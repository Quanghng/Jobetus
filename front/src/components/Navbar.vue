<script setup>
import { RouterLink, useRoute } from "vue-router";
import logo from "@/assets/img/logo.png";
import { useAuthStore } from "@/stores/AuthStore";
import { useUsersStore } from "@/stores/UserStore";

const authStore = useAuthStore();
const usersStore = useUsersStore();

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};
</script>

<template>
  <nav class="bg-teal-700 border-b border-teal-500">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <img class="h-12 w-auto rounded-lg" :src="logo" alt="Etu Jobs" />
            <span class="hidden md:block text-white text-2xl font-bold ml-2"
              >Jobetus</span
            >
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                :class="[
                  isActiveLink('/')
                    ? 'bg-teal-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >Home</RouterLink
              >
              <RouterLink
                to="/jobs"
                :class="[
                  isActiveLink('/jobs')
                    ? 'bg-teal-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                >Jobs</RouterLink
              >
              <RouterLink
                to="/jobs/add"
                :class="[
                  isActiveLink('/jobs/add')
                    ? 'bg-teal-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                v-if="authStore.isLoggedIn"
                >Add Job</RouterLink
              >
              <RouterLink
                to="/login"
                :class="[
                  isActiveLink('/login')
                    ? 'bg-teal-900'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'px-3',
                  'py-2',
                  'rounded-md',
                ]"
                v-else
                >Login</RouterLink
              >
              <button
                @click="authStore.logout()"
                class="hover:bg-gray-900 hover:text-white text-white px-3 py-2 rounded-md"
                v-if="authStore.isLoggedIn">
                Logout
              </button>

              <span
                class="bg-teal-500 text-black font-semibold px-3 py-2 rounded-md"
                v-if="authStore.isLoggedIn">
                {{ authStore.user.data.user.username }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
