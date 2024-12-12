<template>
  <div class="area_monitoring">
    <TitleComponent titleText="重点区域监控" />
    <div class="content">
      <div
        class="content_item"
        v-for="item in contentList"
        :style="{ backgroundImage: item.title }"
      >
        <WebRTCStream :url="item.value" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TitleComponent from "./titleComponent.vue";
  import WebRTCStream from "./WebRTCStream.vue";
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
      value:
        "rtsp://admin:admin12345@47.120.12.122:18386/cam/realmonitor?channel=1&subtype=0",
    },
    {
      title: `url(${encodeURI(
        `${baseUrl}/../assets/securityEquipment/设备中心.png`
      )})`,
      value:
        "rtsp://admin:admin12345@47.120.12.122:18386/cam/realmonitor?channel=2&subtype=0",
    },
    {
      title: `url(${encodeURI(
        `${baseUrl}/../assets/securityEquipment/实验中心.png`
      )})`,
      value:
        "rtsp://admin:admin12345@47.120.12.122:18386/cam/realmonitor?channel=56&subtype=0",
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
