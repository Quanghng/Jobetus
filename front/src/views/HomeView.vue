<script setup>
import Hero from "@/components/Hero.vue";
import HomeCard from "@/components/HomeCard.vue";
import JobListings from "@/components/JobListings.vue";
</script>

<template>
  <Hero title="Nice." subtitle="Very nice." />
  <HomeCard />
  <JobListings :limit="6" :show-button="true" />
</template>
