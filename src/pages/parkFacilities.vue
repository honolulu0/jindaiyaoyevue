<template>
  <div class="w-full h-full absolute top-0 left-0 z-0">
    <SmartDevice />
    <DeviceList />
    <SecurityOpMenu />
    <ErrorAlert />
    <CarEnterRecord />
  </div>
</template>

<script setup lang="ts">
  import SmartDevice from "@/components/smartDevice.vue";
  import DeviceList from "@/components/deviceList.vue";
  import SecurityOpMenu from "@/components/securityOpMenu.vue";
  import ErrorAlert from "@/components/errorAlert.vue";
  import CarEnterRecord from "@/components/carEnterRecord.vue";
</script>

<style scoped></style>
