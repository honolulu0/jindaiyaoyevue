<template>
  <div class="w-full h-full absolute top-0 left-0 z-0">
    <AnnualElectricityConsumption />
    <DeviceList
      :top="356"
      :left="20"
      :height="209"
    />
    <AnnualWaterConsumption />
    <PowerErrorAlert />
  </div>
</template>

<script setup lang="ts">
  import AnnualElectricityConsumption from "@/components/annualElectricityConsumption.vue";
  import AnnualWaterConsumption from "@/components/annualWaterConsumption.vue";
  import DeviceList from "@/components/deviceList.vue";
  import PowerErrorAlert from "@/components/powerErrorAlert.vue";
</script>

<style scoped lang="scss"></style>
