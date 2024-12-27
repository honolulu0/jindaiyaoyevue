<template>
  <Transition name="fade">
    <div class="model_container">
      <Transition name="slide-fade">
        <div class="model" :class="{'video-model': props.data.device_type === 7}">
          <div class="model_title" :style="{ top: props.data.device_type === 7 ? '45px' : '40px' }">{{ props.data.device_type === 7 ? `实时监控 - ${props.data.location}` : '设备详情' }}</div>
          <div class="close_btn" :style="{ right: props.data.device_type === 7 ? '55px' : '40px', top: props.data.device_type === 7 ? '55px' : '40px' }" @click="handleClose">关闭</div>
          <div class="model_content" :style="{ height: props.data.device_type === 7 ? '75%' : '190px', width: props.data.device_type === 7 ? '84.3%' : '80%', display: props.data.device_type === 7 ? 'flex' : 'grid' }">
            <!-- 当没有视频时显示左侧基本信息 -->
            <template v-if="props.data.device_type !== 7">
              <div class="model_content_text">
                <div class="model_content_item" v-for="(item, key) in displayItems" :key="key">
                  <div class="model_content_item_title">{{ item.label }}</div>
                  <div class="model_content_item_value">
                    <p :style="{ color: getValueColor(item.key, mappedData[item.key]) }">
                      {{ mappedData[item.key] || "无" }}
                    </p>
                  </div>
                </div>
              </div>
              <!-- 右侧实时数据 -->
              <div class="model_content_realtime">
                <div class="realtime-title">实时数据</div>
                <div class="realtime-content">
                  <div class="model_content_item" v-for="(value, key) in deviceData.realtime_data" :key="key">
                    <div class="model_content_item_title">{{ key }}</div>
                    <div class="model_content_item_value">
                      <p>{{ value }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            
            <!-- 当有视频时全屏显示视频 -->
            <template v-else>
              <div class="model_content_realtime full-width " :style="{ border: props.data.device_type === 7 ? 'none' : '1px solid #2b9daa' }">
                <div class="video-container">
                  <WebRTCStream :url="deviceData.url" />
                </div>
              </div>
            </template>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { deviceSelectSubject } from "@/utils/deviceSelectSubject";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { getDeviceInfo } from "@/apis/getDeviceInfo";
import WebRTCStream from './WebRTCStream.vue';

const props = defineProps<{
  data: any;
}>();

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

const deviceData = ref<any>({});

// 添加加载状态
const isReady = ref(false);

// 在组件挂载时获取设备详情
onMounted(async () => {
  const res = await getDeviceInfo(props.data.device_name);
  deviceData.value = res[0];
  isReady.value = true;
});

const handleClose = () => {
  deviceSelectSubject.next(null);
};

const mappedData = computed(() => {
  const data = deviceData.value;
  return {
    ...data,
    device_type: data.device_type_name,
  };
});

const getValueColor = (key: string, value: string) => {
  if (key === 'status') {
    return value === '异常' ? '#FF0000' : '#00FF00';
  }
  return '#71f3ff';
};

const displayItems = [
  { label: "设备名称", key: "device_name" },
  { label: "设备类型", key: "device_type" },
  { label: "设备状态", key: "status" },
  { label: "设备位置", key: "location" },
];
</script>

<style scoped>
.model_container {
  width: 1080px;
  height: 579px;
  position: absolute;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}

.model {
  position: absolute;
  width: 587px;
  height: 298px;
  background: url("@/assets/enterprises/弹窗背景.png") no-repeat center center;
  background-size: 100% 100%;
}

.video-model {
  width: 755px;
  height: 470px;
  background: url("@/assets/弹窗背景4-5.png") no-repeat center center;
  background-size: 100% 100%;
}

.model_title {
  position: absolute;
  top: 40px;
  width: 100%;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: YouSheBiaoTiHei;
  font-size: 18px;
  color: #71f3ff;
  line-height: 18px;
  letter-spacing: 3px;
  text-align: left;
  font-style: normal;
}

.close_btn {
  position: absolute;
  top: 40px;
  right: 45px;
  cursor: pointer;
  width: 35px;
  height: 14px;
  font-family: YouSheBiaoTiHei;
  font-size: 14px;
  color: #71f3ff;
  line-height: 14px;
  letter-spacing: 3px;
  text-align: left;
  font-style: normal;
}

.model_content {
  position: absolute;
  top: 65px;
  left: 60px;
  width: 80%;
  height: 190px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.model_content::-webkit-scrollbar {
  display: none;
}

.model_content_text {
  width: 100%;
  height: max-content;
  border: 1px solid #2b9daa;
  border-radius: 10px;
}

.model_content_item {
  display: grid;
  grid-template-columns: 1.8fr 5fr;
  align-items: center;
  height: 30px;
  font-family: SourceHanSansCS-Normal;
  font-weight: 500;
  font-size: 11px;
  color: #71f3ff;
  line-height: 30px;
  letter-spacing: 1px;
  text-align: left;
  font-style: normal;
}

.model_content_item_title {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 80px;
  background: rgba(255, 255, 255, 0.1);
  border-top: 1px solid transparent;
  border-right: 1px solid #2b9daa;
  border-bottom: 1px solid #2b9daa;
  overflow: hidden;
}

.model_content_item_value {
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid #2b9daa;
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow: hidden;
}

.model_content_realtime {
  width: 100%;
  height: 100%;
  border: 1px solid #2b9daa;
  border-radius: 10px;
  overflow: hidden;
}

.realtime-title {
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid #2b9daa;
  color: #71f3ff;
  font-size: 12px;
}

.realtime-content {
  height: calc(100% - 30px);
  overflow: auto;
  color: #71f3ff;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

p {
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

/* 隐藏 Webkit 浏览器的滚动条 */
.realtime-content::-webkit-scrollbar {
  display: none;
}

.video-container {
  height: calc(100% - 30px);
  overflow: hidden;
  /* 修改视频的宽高比 */
  aspect-ratio: 16/9;
  margin: 0 auto;
}

.full-width {
  width: max-content !important;
  margin: 0 auto;
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style> 