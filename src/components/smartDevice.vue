<template>
  <div class="smart_device">
    <div class="title_bg"></div>
    <div class="title">智能设备</div>
    <div class="content">
      <div
        class="content_item"
        v-for="item in contentItem"
        :key="item.key"
      >
        <div
          class="content_item_img"
          :style="{ backgroundImage: `url(${item.img})` }"
        ></div>
        <div class="content_item_title_number">
          <div class="content_item_title">{{ item.title }}</div>
          <div class="content_item_number">{{ item.number + item.unit }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { getDeviceCount, DeviceCountVO } from "@/apis/deviceCount";
  import { onMounted, ref } from "vue";
  const contentItem = ref<DeviceCountVO[]>([]);

  onMounted(async () => {
    const { smartDevices } = await getDeviceCount();
    contentItem.value = smartDevices;
  });

  // const baseUrl = import.meta.url.substring(
  //   0,
  //   import.meta.url.lastIndexOf("/")
  // );

  // const contentItem = [
  //   {
  //     key: 1,
  //     title: "监控",
  //     img: `${encodeURI(`${baseUrl}/../assets/parkFacilities/监控icon.png`)}`,
  //     number: 248,
  //     unit: "台",
  //   },
  //   {
  //     key: 2,
  //     title: "入侵报警",
  //     img: `${encodeURI(
  //       `${baseUrl}/../assets/parkFacilities/入侵报警icon.png`
  //     )}`,
  //     number: 112,
  //     unit: "台",
  //   },
  //   {
  //     key: 3,
  //     title: "电子围栏",
  //     img: `${encodeURI(
  //       `${baseUrl}/../assets/parkFacilities/电子围栏icon.png`
  //     )}`,
  //     number: 248,
  //     unit: "台",
  //   },
  //   {
  //     key: 4,
  //     title: "烟感报警",
  //     img: `${encodeURI(
  //       `${baseUrl}/../assets/parkFacilities/烟感报警icon.png`
  //     )}`,
  //     number: 648,
  //     unit: "台",
  //   },
  //   {
  //     key: 5,
  //     title: "车牌识别",
  //     img: `${encodeURI(
  //       `${baseUrl}/../assets/parkFacilities/车牌识别icon.png`
  //     )}`,
  //     number: 99,
  //     unit: "台",
  //   },
  //   {
  //     key: 6,
  //     title: "智慧井盖",
  //     img: `${encodeURI(
  //       `${baseUrl}/../assets/parkFacilities/智慧井盖icon.png`
  //     )}`,
  //     number: 143,
  //     unit: "台",
  //   },
  //   {
  //     key: 7,
  //     title: "水节点监测",
  //     img: `${encodeURI(
  //       `${baseUrl}/../assets/parkFacilities/水节点监测icon.png`
  //     )}`,
  //     number: 66,
  //     unit: "台",
  //   },
  //   {
  //     key: 8,
  //     title: "水表数据",
  //     img: `${encodeURI(
  //       `${baseUrl}/../assets/parkFacilities/水表数据icon.png`
  //     )}`,
  //     number: 342,
  //     unit: "台",
  //   },
  //   {
  //     key: 9,
  //     title: "配电房状态",
  //     img: `${encodeURI(
  //       `${baseUrl}/../assets/parkFacilities/配电房状态icon.png`
  //     )}`,
  //     number: 232,
  //     unit: "台",
  //   },
  //   {
  //     key: 10,
  //     title: "电表数据",
  //     img: `${encodeURI(
  //       `${baseUrl}/../assets/parkFacilities/电表数据icon.png`
  //     )}`,
  //     number: 248,
  //     unit: "台",
  //   },
  //   {
  //     key: 11,
  //     title: "车位识别",
  //     img: `${encodeURI(
  //       `${baseUrl}/../assets/parkFacilities/车位识别icon.png`
  //     )}`,
  //     number: 543,
  //     unit: "台",
  //   },
  // ];
</script>

<style scoped>
  .smart_device {
    width: 211px;
    height: 203px;
    position: absolute;
    top: 84px;
    left: 20px;
  }

  .title {
    width: 39px;
    height: 13px;
    font-family: YouSheBiaoTiHei;
    font-weight: 100;
    font-size: 10px;
    color: #a5d8fc;
    line-height: 13px;
    text-align: left;
    font-style: normal;
    position: absolute;
    top: 0;
    left: 22px;
  }

  .title_bg {
    width: 201px;
    height: 12px;
    background-size: cover;
    background-image: url("@/assets/title_bg.png");
    position: absolute;
    top: 7px;
    left: 0;
  }

  .content {
    width: 251px;
    height: 172px;
    position: absolute;
    top: 30px;
    left: 0;
    display: grid;
    grid-template-columns: repeat(3, 81px);
    gap: 4px;
    justify-content: start;
  }

  .content_item {
    width: 81px;
    height: 36px;
    background-size: cover;
    background-image: url("@/assets/parkFacilities/智能设备背景icon.png");
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    align-items: center;
    justify-content: center;
  }

  .content_item_img {
    width: 18px;
    height: 18px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    align-self: center;
    justify-self: center;
  }

  .content_item_title {
    width: 40px;
    height: 12px;
    font-family: SourceHanSansSC-Normal;
    font-weight: 400;
    font-size: 8px;
    color: #e4f3ff;
    line-height: 12px;
    text-align: left;
    font-style: normal;
  }

  .content_item_number {
    width: max-content;
    height: 16px;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 12px;
    color: #00f8f4;
    line-height: 16px;
    text-align: left;
    font-style: normal;
  }
</style>
