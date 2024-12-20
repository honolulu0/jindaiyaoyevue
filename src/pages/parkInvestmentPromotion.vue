<template>
  <div
    class="w-full h-full absolute top-0 left-0 z-0"
  >
    <ParkProfile />
    <ParkSupporting />
    <InvestmentPromotionUnitStatistics />
    <Park365 />
    <StarNew style="bottom: 20px; right: 20px; position: absolute;" />
  </div>
</template>

<script setup lang="ts">
  import ParkProfile from "@/components/parkProfile.vue";
  import ParkSupporting from "@/components/parkSupporting.vue";
  import InvestmentPromotionUnitStatistics from "@/components/InvestmentPromotionUnitStatistics.vue";
  import Park365 from "@/components/park365.vue";
  import StarNew from "@/components/starNew.vue";
</script>

<style scoped></style>
