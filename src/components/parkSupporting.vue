<template>
  <div class="park_supporting">
    <div class="title_bg" @click="showImagePreview"></div>
    <div class="title" @click="showImagePreview">园区配套</div>
    <div class="park_supporting_content">
      <div
        class="park_supporting_item"
        v-for="item in parkSupporting"
        :key="item.key"
        :style="{ top: item.position.top + 'px', left: item.position.left + 'px' }"
      >
        <div
          class="park_supporting_item_icon"
          :style="{ backgroundImage: `url(${item.icon})` }"
        ></div>
        <div class="park_supporting_item_bg"></div>
        <div class="park_supporting_item_title">{{ item.title }}</div>
        <div class="park_supporting_item_data">{{ item.value }}</div>
        <div class="park_supporting_item_unit">{{ item.unit }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import {
  getParkSupportingData,
  getParkSupportingUrls,
} from "@/apis/getParkSupportingData";
import { ParkSupportingSubject } from "@/utils/ParkSupportingSubject";

const baseUrl = import.meta.url.substring(0, import.meta.url.lastIndexOf("/"));

let timer: ReturnType<typeof setInterval> | null = null;
const previewImageList = ref<string[]>([]);

const fetchData = async () => {
  const res = await getParkSupportingData();
  const urlList = await getParkSupportingUrls();
  previewImageList.value = urlList;
  console.log('预览图片列表:', previewImageList.value);
  parkSupporting.value = res.map((item) => ({
    ...item,
    icon: `${encodeURI(`${baseUrl}/../assets/${item.icon}`)}`,
  }));
};

const showImagePreview = () => {
  console.log('点击展示图片预览', previewImageList.value);
  if (previewImageList.value.length > 0) {
    // 传递图片列表到 layout
    ParkSupportingSubject.next(previewImageList.value);
  } else {
    console.error('没有可预览的图片');
  }
};

onMounted(async () => {
  await fetchData();
  timer = setInterval(fetchData, 5 * 60 * 1000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  // 清空图片列表
  ParkSupportingSubject.next([]);
});

const parkSupporting = ref([
  {
    key: 1,
    icon: `${encodeURI(`${baseUrl}/../assets/公寓icon.png`)}`,
    title: "公寓",
    value: "100",
    unit: "家",
    position: { top: 0, left: 0 },
  },
  {
    key: 2,
    icon: `${encodeURI(`${baseUrl}/../assets/停车位icon.png`)}`,
    title: "停车位",
    value: "100",
    unit: "个",
    position: { top: 0, left: 101 },
  },
  {
    key: 3,
    icon: `${encodeURI(`${baseUrl}/../assets/多功能会议厅icon.png`)}`,
    title: "多功能会议厅",
    value: "100",
    unit: "处",
    position: { top: 31, left: 0 },
  },
  {
    key: 4,
    icon: `${encodeURI(`${baseUrl}/../assets/会议室icon.png`)}`,
    title: "共享智慧化会议室",
    value: "100",
    unit: "处",
    position: { top: 31, left: 101 },
  },
  {
    key: 5,
    icon: `${encodeURI(`${baseUrl}/../assets/餐厅icon.png`)}`,
    title: "餐厅",
    value: "100",
    unit: "家",
    position: { top: 62, left: 0 },
  },
  {
    key: 6,
    icon: `${encodeURI(`${baseUrl}/../assets/24小时便利店icon.png`)}`,
    title: "24小时便利店",
    value: "100",
    unit: "个",
    position: { top: 62, left: 101 },
  },
  {
    key: 7,
    icon: `${encodeURI(`${baseUrl}/../assets/休闲区icon.png`)}`,
    title: "休闲区",
    value: "100",
    unit: "处",
    position: { top: 93, left: 0 },
  },
  {
    key: 8,
    icon: `${encodeURI(`${baseUrl}/../assets/健身区icon.png`)}`,
    title: "健身区",
    value: "100",
    unit: "处",
    position: { top: 93, left: 101 },
  },
]);
</script>

<style scoped lang="scss">
.park_supporting {
  position: absolute;
  top: 287px;
  left: 20px;
  width: 206px;
  height: 155px;
}

.title {
  position: absolute;
  top: 0px;
  left: 22px;
  width: 40px;
  height: 13px;
  font-family: YouSheBiaoTiHei;
  font-size: 10px;
  color: #a5d8fc;
  line-height: 13px;
  text-align: left;
  font-style: normal;
  cursor: pointer;
}

.title_bg {
  background-image: url("@/assets/title_bg.png");
  background-size: cover;
  position: absolute;
  left: 0;
  top: 7px;
  width: 206px;
  height: 14px;
  cursor: pointer;
}

.park_supporting_content {
  position: absolute;
  top: 28px;
  left: 0;
  width: 189px;
  height: 127px;
}

.park_supporting_item {
  position: absolute;
  width: 87px;
  height: 33px;
}

.park_supporting_item_icon {
  position: absolute;
  top: 4px;
  left: 0;
  width: 25px;
  height: 28px;
  background-size: cover;
}

.park_supporting_item_bg {
  position: absolute;
  left: 26px;
  top: 10px;
  width: 62px;
  height: 23px;
  background-image: url("@/assets/park_supporting_item_bg.png");
  background-size: cover;
}

.park_supporting_item_title {
  width: max-content;
  height: 8px;
  font-family: YouSheBiaoTiHei;
  font-size: 6px;
  color: #e4f3ff;
  line-height: 8px;
  text-align: left;
  font-style: normal;
  position: absolute;
  top: 0;
  left: 37px;
}

.park_supporting_item_data {
  position: absolute;
  top: 10px;
  left: 37px;
  width: max-content;
  height: 13px;
  font-family: YouSheBiaoTiHei;
  font-size: 10px;
  color: #d9f1fd;
  line-height: 13px;
  text-align: left;
  font-style: normal;
}

.park_supporting_item_unit {
  position: absolute;
  top: 13px;
  left: 68px;
  width: max-content;
  width: 6px;
  height: 8px;
  font-family: YouSheBiaoTiHei;
  font-size: 6px;
  color: #e4f3ff;
  line-height: 8px;
  text-align: left;
  font-style: normal;
}
</style>
