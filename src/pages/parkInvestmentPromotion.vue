<template>
  <div
    class="w-full h-full absolute top-0 left-0 z-0"
  >
    <ParkProfile />
    <ParkSupporting />
    <InvestmentPromotionUnitStatistics />
  </div>
</template>

<script setup lang="ts">
  import ParkProfile from "@/components/parkProfile.vue";
  import ParkSupporting from "@/components/ParkSupporting.vue";
  import InvestmentPromotionUnitStatistics from "@/components/InvestmentPromotionUnitStatistics.vue";
</script>

<style scoped></style>
