<template>
  <div
    class="w-full h-full absolute top-0 left-0 z-0 flex justify-center items-center"
  >
    <ParkInfo v-show="isShow" />
    <Park365Info v-show="isShow" />
    <ParkError v-show="isShow" />
    <ParkErrorAlert v-show="isShow" />
    <RealtimeElectricityConsumption />
    <ParkingData />
    <DistributionBoxTemp />
    <div style="bottom: 5px; right: 20px; position: absolute; width: 206px; height: 80px; overflow: hidden">
      <TitleComponent titleText="园区俯视图" />
      <Image :src="imgUrl" width="100%" height="90%" style="margin-top: 3px" />
    </div>
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
  import TitleComponent from "@/components/titleComponent.vue";
  import { Image } from "ant-design-vue";
  import { ref } from "vue";

  const baseUrl = import.meta.url.substring(
    0,
    import.meta.url.lastIndexOf("/")
  );

  const imgUrl = `${baseUrl}/../assets/WechatIMG3166.jpg`

  const isShow = ref(true);
</script>

<style scoped></style>
