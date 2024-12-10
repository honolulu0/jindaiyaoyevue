<template>
  <div
    class="distributionBoxTempRing"
    @mouseenter="pauseAutoPlay"
    @mouseleave="resumeAutoPlay"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <TitleComponent titleText="配电箱温度" />
    <div class="distributionBoxTempRing-content">
      <div
        :class="`distributionBoxTempRing_item ${
          item.value > alarmValue ? 'alarm' : 'normal'
        }`"
        v-for="(item, index) in currentPageValue"
        :key="index"
      >
        <span class="distributionBoxTempRing_item_value"
          >{{ item.value }}度</span
        >
        <span class="distributionBoxTempRing_item_title">{{
          item.titleText
        }}</span>
      </div>
    </div>
    <div class="pagination_container">
      <Pagination
        :pageSize="6"
        :data="data"
        @currentPageData="handlePaginationChange"
        ref="paginationRef"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import TitleComponent from "./titleComponent.vue";
  import Pagination from "./pagination.vue";
  import { onMounted, ref, onUnmounted } from "vue";

  const alarmValue = 100;

  const baseUrl = import.meta.url.substring(
    0,
    import.meta.url.lastIndexOf("/")
  );

  const paginationRef = ref();

  const touchStartX = ref(0);
  const isAutoPlaying = ref(true);
  let autoPlayInterval: NodeJS.Timer | null = null;

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.value = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.value;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        paginationRef.value.prevPage();
      } else {
        paginationRef.value.nextPage();
      }
    }
  };

  const pauseAutoPlay = () => {
    isAutoPlaying.value = false;
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval as any);
      autoPlayInterval = null;
    }
  };

  const resumeAutoPlay = () => {
    isAutoPlaying.value = true;
    startAutoPlay();
  };

  const startAutoPlay = () => {
    autoPlayInterval = setInterval(() => {
      if (isAutoPlaying.value) {
        paginationRef.value.nextPage();
      }
    }, 3000);
  };

  startAutoPlay();

  onUnmounted(() => {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval as any);
    }
  });

  const props = defineProps<{
    data: { titleText: string; value: number }[];
  }>();

  const currentPageValue = ref<{ titleText: string; value: number }[]>([]);
  const handlePaginationChange = (
    data: {
      titleText: string;
      value: number;
    }[]
  ) => {
    currentPageValue.value = data;
  };

  onMounted(() => {
    currentPageValue.value = props.data?.slice(0, 6);
  });
</script>

<style scoped>
  .distributionBoxTempRing {
    position: absolute;
    top: 71px;
    right: 41px;
    width: 214px;
    height: 142px;
  }
  .distributionBoxTempRing-content {
    position: absolute;
    top: 30px;
    width: 214px;
    height: 114px;
    display: flex;
    flex-wrap: wrap;
    margin-left: 20px;
    justify-content: center;
    gap: 10px;
    padding-bottom: 25px;
  }
  .pagination_container {
    position: absolute;
    bottom: -10px;
    width: 100%;
    height: 3px;
    margin-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .distributionBoxTempRing_item {
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url("@/assets/power/温度正常.png");
    background-repeat: no-repeat;
    background-size: contain;

    font-family: YouSheBiaoTiHei;
    font-size: 9px;
    color: #84f8fb;
    line-height: 12px;
    text-align: left;
    font-style: normal;
  }

  .distributionBoxTempRing_item_value {
    font-size: 9px;
  }

  .distributionBoxTempRing_item_title {
    font-size: 6px;
  }

  .distributionBoxTempRing_item.alarm {
    background-image: url("@/assets/power/温度异常.png");
    font-family: YouSheBiaoTiHei;
    font-size: 9px;
    color: #ff8797;
    line-height: 12px;
    text-align: left;
    font-style: normal;
  }
</style>
