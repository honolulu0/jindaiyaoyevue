<template>
  <div class="w-full h-full absolute top-0 left-0 z-0">
    <PMCInfo />
    <WaiterInfo />
    <PMCEmployeesInfo />
    <RepairEventList />
    <PMCServiceInfo />
  </div>
</template>

<script setup lang="ts">
  import PMCInfo from "@/components/pmcInfo.vue";
  import WaiterInfo from "@/components/waiterInfo.vue";
  import PMCEmployeesInfo from "@/components/pmcEmployeesInfo.vue";
  import RepairEventList from "@/components/repairEventList.vue";
  import PMCServiceInfo from "@/components/pmcServiceInfo.vue";
</script>

<style scoped></style>
