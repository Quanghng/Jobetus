<script setup>
import Navbar from "./components/Navbar.vue";
import { RouterView } from "vue-router";
import { useAuthStore } from "./stores/AuthStore";

const authStore = useAuthStore();
// Call checkAuth on app load
authStore.checkAuth();
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style scoped></style>
