<template>
  <div
    class="w-full h-full absolute top-0 left-0 z-0"
  >
    <ParkProfile />
    <ParkSupporting />
    <InvestmentPromotionUnitStatistics />
    <Park365 />
    <div style="bottom: 10px; right: 20px; position: absolute; width: 206px; height: 130px; overflow: hidden">
      <TitleComponent titleText="园区俯视图" />
      <Image :src="imgUrl" width="100%" height="90%" style="margin-top: 3px" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import ParkProfile from "@/components/parkProfile.vue";
  import ParkSupporting from "@/components/parkSupporting.vue";
  import InvestmentPromotionUnitStatistics from "@/components/InvestmentPromotionUnitStatistics.vue";
  import Park365 from "@/components/park365.vue";
  import TitleComponent from "@/components/titleComponent.vue";
  import { Image } from "ant-design-vue";
  const baseUrl = import.meta.url.substring(
    0,
    import.meta.url.lastIndexOf("/")
  );

  const imgUrl = `${baseUrl}/../assets/WechatIMG3166.jpg`
</script>

<style scoped></style>
