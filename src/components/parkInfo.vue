<template>
  <div class="park_profile">
    <div class="title_bg"></div>
    <div class="title">园区信息</div>
    <div class="text_container">
      <div
        class="absolute h-8"
        v-for="item in textList"
        :key="item.key"
        :style="item.position"
      >
        <span class="text_label">{{ item.label }}</span>
        <span
          class="text_content"
          :style="{ width: 'max-content' }"
          >{{ item.content }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { getParkInfo, type ParkInfoType } from '@/apis/getParkInfo'

const parkInfo = ref<ParkInfoType>()

onMounted(async () => {
  parkInfo.value = await getParkInfo()
})

const textList = computed(() => [
  {
    key: 2,
    label: "园区名称：",
    content: parkInfo.value?.name || '-',
    position: { top: "0px", left: "0px" },
  },
  {
    key: 3,
    label: "总建筑面积：",
    content: (parkInfo.value?.totalBuildingArea || '-') + '万m²',
    position: { top: "0px", left: "125px" },
  },
])
</script>

<style scoped>
  .title_bg {
    background-image: url("@/assets/title_bg.png");
    background-size: cover;
    position: absolute;
    left: 0;
    top: 6px;
    width: 206px;
    height: 14px;
  }

  .park_profile {
    position: absolute;
    top: 64px;
    left: 20px;
    width: 210px;
    height: 217px;
  }

  .title {
    position: absolute;
    top: 0px;
    left: 22px;
    width: max-content;
    height: 13px;
    font-family: YouSheBiaoTiHei;
    font-size: 10px;
    color: #a5d8fc;
    line-height: 13px;
    text-align: left;
    font-style: normal;
  }

  .park_img {
    background-image: url("@/assets/park_img.png");
    background-size: cover;
    width: 205px;
    height: 88px;
    position: absolute;
    left: 0;
    top: 29px;
  }

  .text_container {
    width: 240px;
    height: 93px;
    position: absolute;
    left: 0;
    top: 20px;
  }

  .text_label {
    width: 13px;
    height: 13px;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 6px;
    color: #e4f3ff;
    line-height: 13px;
    text-align: left;
    font-style: normal;
  }

  .text_content {
    width: max-content;
    height: 13px;
    font-family: YouSheBiaoTiHei;
    font-size: 8px;
    color: #d9f1fd;
    line-height: 13px;
    text-align: left;
    font-style: normal;
  }

  .text_area {
    position: absolute;
    top: 50px;
    left: 0;
    width: 205px;
    height: 26px;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 6px;
    color: #e4f3ff;
    line-height: 13px;
    text-align: left;
    font-style: normal;
    text-indent: 12px;
  }


</style>
