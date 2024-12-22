<template>
  <div
    class="w-full h-full absolute top-0 left-0 z-0 flex justify-center items-center"
  >
    <ParkInfo v-show="isShow" />
    <Park365Info v-show="isShow" />
    <ParkError v-show="isShow" />
    <ParkErrorAlert v-show="isShow" />
    <RealtimeElectricityConsumption  />
    <ParkingData />
    <DistributionBoxTemp />
    <StarNew style="bottom: 3px; right: 20px; position: absolute" />
  </div>
</template>

<script setup lang="ts">
  import ParkInfo from "@/components/parkInfo.vue";
  import Park365Info from "@/components/park365Info.vue";
  import ParkError from "@/components/parkError.vue";
  import ParkErrorAlert from "@/components/parkErrorAlert.vue";
  import RealtimeElectricityConsumption from "@/components/realtimeElectricityConsumption.vue";
  import ParkingData from "@/components/parkingData.vue";
  import DistributionBoxTemp from "@/components/distributionBoxTemp.vue";
  import StarNew from "@/components/starNew.vue";
  import { errorAlertSubject } from "@/utils/errorAlertSubject";
  import { deviceSelectSubject } from "@/utils/deviceSelectSubject";
  import { ref } from "vue";

  const isShow = ref(true);

  errorAlertSubject.subscribe((item) => {
    if (item === null) {
      isShow.value = true;
    } else {
      isShow.value = false;
    }
  });

  deviceSelectSubject.subscribe((item) => {
    if (item === null) {
      isShow.value = true;
    } else {
      isShow.value = false;
    }
  });
</script>

<style scoped></style>
