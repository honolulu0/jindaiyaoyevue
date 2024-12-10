<template>
  <div class="w-full h-full absolute top-0 left-0 z-0">
    <SecurityEquipment />
    <AreaMonitoring />
    <SecurityOpMenu />
    <ErrorAlert />
    <CarEnterRecord />
  </div>
</template>

<script setup lang="ts">
  import SecurityOpMenu from "@/components/securityOpMenu.vue";
  import ErrorAlert from "@/components/errorAlert.vue";
  import CarEnterRecord from "@/components/carEnterRecord.vue";
  import SecurityEquipment from "@/components/securityEquipment.vue";
  import AreaMonitoring from "@/components/areaMonitoring.vue";
</script>

<style scoped></style>
