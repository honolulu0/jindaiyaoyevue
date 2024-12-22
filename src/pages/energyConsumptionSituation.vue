<template>
  <div class="w-full h-full absolute top-0 left-0 z-0">
    <AnnualElectricityConsumption v-show="isShow" />
    <DeviceList
      :top="356"
      :left="20"
      :height="209"
      v-show="isShow"
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
  import { deviceSelectSubject } from "@/utils/deviceSelectSubject";
  import { errorAlertSubject } from "@/utils/errorAlertSubject";
  import { ref } from "vue";
  const isShow = ref(true);

  deviceSelectSubject.subscribe((item) => {
    if (item !== null) {
      isShow.value = false;
    } else {
      isShow.value = true;
    }
  });

  errorAlertSubject.subscribe((item) => {
    if (item !== null) {
      isShow.value = false;
    } else {
      isShow.value = true;
    }
  });
</script>

<style scoped lang="scss"></style>
