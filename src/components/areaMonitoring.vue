<template>
  <div class="area_monitoring">
    <TitleComponent titleText="区域监控" />
    <div class="content">
      <div
        class="content_item"
        v-for="item in contentList"
        :style="{ backgroundImage: item.title }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TitleComponent from "./titleComponent.vue";
  import { ref } from "vue";

  const baseUrl = import.meta.url.substring(
    0,
    import.meta.url.lastIndexOf("/")
  );

  const contentList = ref([
    {
      title: `url(${encodeURI(
        `${baseUrl}/../assets/securityEquipment/研发中心.png`
      )})`,
      value: 100,
    },
    {
      title: `url(${encodeURI(
        `${baseUrl}/../assets/securityEquipment/设备中心.png`
      )})`,
      value: 20,
    },
    {
      title: `url(${encodeURI(
        `${baseUrl}/../assets/securityEquipment/实验中心.png`
      )})`,
      value: 30,
    },
  ]);
</script>

<style scoped>
  .area_monitoring {
    width: 206px;
    height: 322px;
    position: absolute;
    top: 232px;
    left: 20px;
  }

  .content {
    width: 100%;
    height: calc(100% - 35px);
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 10px;
  }

  .content_item {
    width: 100%;
    height: 90px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
</style>
