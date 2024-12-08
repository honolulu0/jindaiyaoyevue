<template>
  <div class="pmc-service-info">
    <title-component title-text="服务信息" />
    <div class="service-info-list">
      <div
        class="service-info-item"
        v-for="item in serviceInfoList"
        :key="item.index"
        :style="{ backgroundImage: item.img }"
      >
        <div class="text-item">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from "vue";
  import titleComponent from "./titleComponent.vue";

  const baseUrl = import.meta.url.substring(
    0,
    import.meta.url.lastIndexOf("/")
  );

  const serviceInfoList = reactive([
    {
      index: 1,
      name: "维修服务",
      url: "https://www.baidu.com",
      img: `url(${encodeURI(
        `${baseUrl}/../assets/enterprises/维修服务图片.png`
      )})`,
    },
    {
      index: 2,
      name: "家政服务",
      url: "https://www.baidu.com",
      img: `url(${encodeURI(
        `${baseUrl}/../assets/enterprises/家政服务图片.png`
      )})`,
    },
    {
      index: 3,
      name: "租赁服务",
      url: "https://www.baidu.com",
      img: `url(${encodeURI(
        `${baseUrl}/../assets/enterprises/租赁服务图片.png`
      )})`,
    },
    {
      index: 4,
      name: "会议服务",
      url: "https://www.baidu.com",
      img: `url(${encodeURI(
        `${baseUrl}/../assets/enterprises/会议服务图片.png`
      )})`,
    },
    {
      index: 5,
      name: "代理服务",
      url: "https://www.baidu.com",
      img: `url(${encodeURI(
        `${baseUrl}/../assets/enterprises/代理服务图片.png`
      )})`,
    },
    {
      index: 6,
      name: "家政服务",
      url: "https://www.baidu.com",
      img: `url(${encodeURI(
        `${baseUrl}/../assets/enterprises/家政服务图片.png`
      )})`,
    },
  ]);
</script>

<style scoped>
  .pmc-service-info {
    position: absolute;
    bottom: 24px;
    right: 20px;
    width: 206px;
    height: 262px;
  }

  .service-info-list {
    width: 206px;
    margin-top: 7px;
    height: calc(262px - 30px - 7px);
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 0 6px;
    margin-left: 10px;
  }

  .service-info-item {
    width: 90px;
    height: 67px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .text-item {
    font-size: 12px;
    color: #ffffff;
    height: 13px;
    font-family: "SourceHanSansSC-Normal";
    font-weight: 600;
    font-size: 6px;
    color: #ffffff;
    line-height: 13px;
    text-align: left;
    font-style: normal;
  }
</style>
