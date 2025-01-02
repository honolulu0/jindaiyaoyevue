<template>
  <div class="distribution_box">
    <div class="title_bg"></div>
    <div class="title">配电设施数量统计</div>
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
import { ref, onMounted } from "vue";
import { getDeviceCount } from "@/apis/deviceCount";

const baseUrl = import.meta.url.substring(
  0,
  import.meta.url.lastIndexOf("/")
);

const contentItem = ref([
  {
    key: 1,
    title: "配电柜",
    img: `${encodeURI(`${baseUrl}/../assets/配电柜.png`)}`,
    number: 5,
    unit: "处",
  },
  {
    key: 2,
    title: "配电柜",
    img: `${encodeURI(`${baseUrl}/../assets/parkFacilities/配电柜状态icon.png`)}`,
    number: 47,
    unit: "个",
  },
]);

onMounted(async () => {
  const res = await getDeviceCount()
  console.log(res)
});

</script>

<style scoped>
.distribution_box {
  width: 211px;
  height: 100px;
  position: absolute;
  top: 84px;
  right: 45px;
}

.title {
  width: 80px;
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
  height: 50px;
  position: absolute;
  top: 30px;
  margin-left: 40px;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 81px);
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
