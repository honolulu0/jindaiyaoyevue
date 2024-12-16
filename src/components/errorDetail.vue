<template>
  <div class="error-detail">
    <div class="title">{{ title }}</div>
    <div class="device-info">
      <TitleComponent titleText="设备信息" />
      <div class="device-info-content">
        <div>设备名称:</div>
        <div class="device-name">{{ item.deviceName }}</div>
        <div>设备类型:</div>
        <div class="device-type">{{ item.deviceType }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from "vue";
  import TitleComponent from "./titleComponent.vue";
  export interface ErrorDetailType {
    item: {
      deviceName: string;
      deviceType: string;
      errorInfo: string;
      errorTime: string;
      errorStatus: string;
      rtspUrl: string;
    };
    title: string;
  }

  const props = withDefaults(defineProps<ErrorDetailType>(), {
    item: () => ({
      deviceName: "",
      deviceType: "",
      errorInfo: "",
      errorTime: "",
      errorStatus: "",
      rtspUrl: "",
    }),
    title: "安防",
  });
</script>

<style scoped>
  .error-detail {
    width: 271px;
    height: 481px;
    position: absolute;
    left: 20px;
    top: 73px;
    background-color: rgba(65, 108, 145, 0.5);
    border: 1px solid white;
    border-radius: 10px 0 0 10px;
    overflow: hidden;
  }

  .title {
    position: absolute;
    left: 48px;
    top: 22px;
    width: 176px;
    height: 18px;
    background-image: url("@/assets/小标题背景.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    font-family: SourceHanSansCN-Normal;
    font-weight: 600;
    font-size: 13px;
    color: #ffffff;
    line-height: 13px;
    letter-spacing: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .device-info {
    position: absolute;
    left: 14px;
    top: 62px;
    width: calc(100% - 14px);
    height: 58px;
    font-family: SourceHanSansCN-Normal;
    font-weight: 500;
    font-size: 7px;
    color: #e4f3ff;
    line-height: 14px;
    text-align: left;
    font-style: normal;
  }

  .device-info-content {
    margin-top: 10px;
    margin-left: 10px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 10px;
    justify-content: center;
    padding-right: 30px;
  }
</style>
