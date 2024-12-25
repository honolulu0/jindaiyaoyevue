<template>
  <div class="smart_device">
    <TitleComponent titleText="智能设备" />
    <div class="content">
      <div
        class="content_item"
        v-for="item in contentItem"
        :key="item.key"
      >
        <div
          class="content_item_img"
          :style="{
            backgroundImage: `url(${item.img})`,
            left: `${item.left}px`,
            top: `${item.top}px`,
          }"
        ></div>
        <div class="content_item_title">{{ item.title }}</div>
        <div class="content_item_number">{{ item.number }}{{ item.unit }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TitleComponent from "./titleComponent.vue";
  import { getDeviceCount, DeviceCountVO } from "@/apis/deviceCount";
  import { onMounted, ref } from "vue";
  const contentItem = ref<DeviceCountVO[]>([]);

  onMounted(async () => {
    // 测试注销
    // const { smartDevices } = await getDeviceCount();
    // contentItem.value = smartDevices;
  });

  const baseUrl = import.meta.url.substring(
    0,
    import.meta.url.lastIndexOf("/")
  );

  contentItem.value = [
    {
      key: 4,
      title: "烟感报警",
      img: `${encodeURI(
        `${baseUrl}/../assets/parkFacilities/烟感报警icon.png`
      )}`,
      number: 79,
      unit: "台",
      left: 15,
      top: 40,
    },
    {
      key: 6,
      title: "智慧井盖",
      img: `${encodeURI(
        `${baseUrl}/../assets/parkFacilities/智慧井盖icon.png`
      )}`,
      number: 112,
      unit: "台",
      left: 120,
      top: 40,
    },
    {
      key: 7,
      title: "消防管廊",
      img: `${encodeURI(
        `${baseUrl}/../assets/parkFacilities/水节点监测icon.png`
      )}`,
      number: 618,
      unit: "台",
      left: 15,
      top: 90,
    },
    {
      key: 11,
      title: "车位引导",
      img: `${encodeURI(
        `${baseUrl}/../assets/parkFacilities/车位识别icon.png`
      )}`,
      number: 6,
      unit: "台",
      left: 120,
      top: 90,
    },
  ];
</script>

<style scoped>
  .smart_device {
    width: 206px;
    height: 132px;
    position: absolute;
    top: 84px;
    left: 20px;
  }

  .content {
    width: 100%;
    height: calc(100% - 35px);
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }

  .content_item_img {
    position: absolute;
    width: 23px;
    height: 23px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .content_item {
    width: calc(50% - 10px);
    height: calc(50% - 10px);
    margin: 5px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url("@/assets/parkFacilities/智能设备背景icon.png");
  }

  .content_item_title {
    font-family: "SourceHanSansSC-Normal";
    font-weight: 600;
    font-size: 8px;
    color: #e4f3ff;
    line-height: 12px;
    text-align: left;
    font-style: normal;
    margin-left: 45px;
    margin-top: 2px;
  }

  .content_item_number {
    height: 17px;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 12px;
    color: #00f8f4;
    line-height: 17px;
    text-align: left;
    font-style: normal;
    margin-left: 45px;
  }
</style>
