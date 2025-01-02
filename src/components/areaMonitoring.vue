<template>
  <div class="area_monitoring">
    <TitleComponent titleText="重点区域监控" />
    <div class="content">
      <div
        class="content_item"
        v-for="item in contentList"
      >
        <WebRTCStream :url="item.value" />
      </div>
    </div>
    <DeviceList
      style="position: absolute; top: 122px; left: 0px; z-index: 100; height: 200px;"
      :deviceType="['视频监控', '入侵报警','电子围栏']"
    />
  </div>
</template>

<script setup lang="ts">
  import TitleComponent from "./titleComponent.vue";
  import WebRTCStream from "./WebRTCStream.vue";
  import DeviceList from "./deviceList.vue";
  import { getAreaMonitoringData } from "../apis/getAreaMonitoringData";
  import { ref, onMounted } from "vue";

  const baseUrl = import.meta.url.substring(
    0,
    import.meta.url.lastIndexOf("/")
  );

  onMounted(async () => {
    const res = await getAreaMonitoringData();
    const data = res.data.map((item) => ({
      title: ``,
      value: item.url,
    }));
    contentList.value = [data[0]];
  });

  const contentList = ref<{ title: string; value: string }[]>([
    // {
    //   title: `url(${encodeURI(
    //     `${baseUrl}/../assets/securityEquipment/研发中心.png`
    //   )})`,
    //   value:
    //     "rtsp://admin:admin12345@47.120.12.122:18386/cam/realmonitor?channel=1&subtype=0",
    // },
    // {
    //   title: `url(${encodeURI(
    //     `${baseUrl}/../assets/securityEquipment/设备中心.png`
    //   )})`,
    //   value:
    //     "rtsp://admin:admin12345@47.120.12.122:18386/cam/realmonitor?channel=2&subtype=0",
    // },
    // {
    //   title: `url(${encodeURI(
    //     `${baseUrl}/../assets/securityEquipment/实验中心.png`
    //   )})`,
    //   value:
    //     "rtsp://admin:admin12345@47.120.12.122:18386/cam/realmonitor?channel=56&subtype=0",
    // },
  ]);
</script>

<style scoped>
  .area_monitoring {
    width: 206px;
    height: 122px;
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
