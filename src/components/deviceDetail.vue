<template>
  <div class="error-detail">
    <div class="title">{{ title }}</div>
    <div class="device-info">
      <TitleComponent titleText="设备信息" />
      <div class="device-info-content">
        <div>设备名称:</div>
        <div class="device-name">{{ item.device_name }}</div>
        <div>设备类型:</div>
        <div class="device-type">{{ getDeviceTypeName(item.device_type) }}</div>
      </div>
      <TitleComponent
        titleText="详细信息"
        style="margin-top: 10px"
      />
      <div class="device-info-content">
        <div>设备状态:</div>
        <div class="device-name" :style="{ color: deviceDetail.status === '异常' ? '#FF0000' : '#00FF00' }">{{ deviceDetail.status }}</div>
        <div>设备位置:</div>
        <div class="device-type">{{ deviceDetail.location }}</div>
        <div>设备实时状态:</div>
        <div class="device-realtime-status">
			<div class="device-name" style="#00FF00">正常</div>
 <!--         <VueJsonPretty
            style="width: max-content; height: max-content"
            :data="deviceDetail.realtime_data"
          /> -->
        </div>
      </div>
      <TitleComponent
        titleText="监控视频"
        style="margin-top: 10px"
        v-if="deviceDetail.url"
      />
      <div class="device-realtime-status">
        <WebRTCStream :url="deviceDetail.url" />
      </div>
    </div>
    <div class="back-btn">
      <div
        class="back-btn-text"
        @click="handleBackBtnClick"
      >
        返回
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import TitleComponent from "./titleComponent.vue";
  import { deviceSelectSubject } from "@/utils/deviceSelectSubject";
  import { getDeviceInfo } from "@/apis/getDeviceInfo";
  import WebRTCStream from "./WebRTCStream.vue";
  import VueJsonPretty from "vue-json-pretty";
  import "vue-json-pretty/lib/styles.css";

  const DEVICE_TYPE_MAP = {
    "1": "水表",
    "2": "电表",
    "3": "车位",
    "4": "车辆道闸",
    "5": "智能井盖",
    "6": "电子围栏",
    "7": "视频监控",
    "8": "烟感报警",
    "9": "入侵报警",
    "10": "智能水节点",
    "11": "智能配电柜",
  };

  export interface ErrorDetailType {
    item: {
      device_name: string;
      device_type: string;
    };
    title: string;
  }

  const props = withDefaults(defineProps<ErrorDetailType>(), {
    item: () => ({
      device_name: "",
      device_type: "",
    }),
    title: "设备详情",
  });

  const getDeviceTypeName = (type: string) => {
    return DEVICE_TYPE_MAP[type as keyof typeof DEVICE_TYPE_MAP] || type;
  };

  const handleBackBtnClick = () => {
    deviceSelectSubject.next(null);
  };

  const deviceDetail = ref<any>({});

  onMounted(async () => {
    const res = await getDeviceInfo(props.item.device_name);
    deviceDetail.value = res[0];
    console.log(deviceDetail.value);
  });
</script>

<style scoped>
  .error-detail {
    width: 271px;
    height: 485px;
    position: absolute;
    left: 20px;
    top: 73px;
    background-color: rgba(65, 108, 145, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
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

  .back-btn {
    position: absolute;
    bottom: 17px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .back-btn-text {
    width: 72px;
    height: 18px;
    font-family: SourceHanSansCS-Normal;
    font-weight: 600;
    font-size: 9px;
    color: #ffffff;
    line-height: 10px;
    background-image: url("@/assets/返回按钮.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .device-realtime-status {
    max-height: 200px;
    overflow: auto;
    margin-right: 10px;
    scrollbar-width: none;  /* Firefox */
    -ms-overflow-style: none;  /* IE and Edge */
  }
  
  /* Webkit浏览器（Chrome、Safari等）隐藏滚动条 */
  .device-realtime-status::-webkit-scrollbar {
    display: none;
  }
</style>
