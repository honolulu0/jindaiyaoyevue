<template>
  <div class="security_equipment">
    <TitleComponent titleText="安防设备" />
    <div class="content">
      <div
        class="content_item"
        v-for="item in contentItem"
        :key="item.title"
        :style="{
          backgroundImage: `${item.url}`,
        }"
      >
        <div class="content_item_title">{{ item.title }}</div>
        <div class="content_item_number">{{ item.number }}{{ item.unit }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TitleComponent from "./titleComponent.vue";
  import { onMounted, ref } from "vue";
  import { getDeviceCount } from "../apis/deviceCount";

  const baseUrl = import.meta.url.substring(
    0,
    import.meta.url.lastIndexOf("/")
  );

  onMounted(async () => {
    const res = await getDeviceCount();
    const data = res.securityDevices.map((item) => ({
      title: item.title,
      number: item.number,
      unit: item.unit,
      url: item.url,
    }));
	//todo 验收暂时不用接口
    // contentItem.value = data;
  });

  const contentItem = ref([
    {
      title: "入侵报警",
      number: 40,
      unit: "台",
      url: `url(${encodeURI(
        `${baseUrl}/../assets/securityEquipment/入侵报警+底座.png`
      )})`,
    },
    {
      title: "电子围栏",
      number: 12,
      unit: "防区",
      url: `url(${encodeURI(
        `${baseUrl}/../assets/securityEquipment/电子围栏+底座.png`
      )})`,
    },
    {
      title: "视频监控",
      number: 218,
      unit: "台",
      url: `url(${encodeURI(
        `${baseUrl}/../assets/securityEquipment/监控+底座.png`
      )})`,
    },
    {
      title: "车牌识别",
      number: 2,
      unit: "组",
      url: `url(${encodeURI(
        `${baseUrl}/../assets/securityEquipment/车牌识别+底座.png`
      )})`,
    },
  ]);
</script>

<style scoped>
  .security_equipment {
    position: absolute;
    top: 84px;
    left: 20px;
    width: 206px;
    height: 132px;
  }
  .content {
    width: 100%;
    height: calc(100% - 35px);
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  .content_item {
    width: calc(50% - 10px);
    height: calc(50% - 10px);
    margin: 5px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
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
