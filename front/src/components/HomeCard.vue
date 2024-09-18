<script setup>
import { RouterLink } from "vue-router";
import Card from "./Card.vue";
</script>
<template>
  <section class="py-4">
    <div class="container-xl lg:container m-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        <Card>
          <h2 class="text-2xl font-bold">For Developers</h2>
          <p class="mt-2 mb-4">
            Browse available positions and kickstart your career today.
          </p>
          <RouterLink
            to="/jobs"
            class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700">
            Browse Jobs
          </RouterLink>
        </Card>
        <Card bg="bg-teal-100">
          <h2 class="text-2xl font-bold">For Employers</h2>
          <p class="mt-2 mb-4">
            Add your job listings to our site to find the ideal developer for
            your needs.
          </p>
          <RouterLink
            to="/jobs/add"
            class="inline-block bg-teal-500 text-white rounded-lg px-4 py-2 hover:bg-teal-600">
            Add Job
          </RouterLink>
        </Card>
      </div>
    </div>
  </section>
</template>
