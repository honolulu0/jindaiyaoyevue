<template>
  <div
    class="distributionBoxElectricityCount"
    @mouseenter="pauseAutoPlay"
    @mouseleave="resumeAutoPlay"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <TitleComponent titleText="配电箱电流" />
    <div class="distributionBoxElectricityCountChart_container">
      <DistributionBoxElectricityCountChart
        v-for="item in currentPageData"
        :key="item.titleText"
        :titleText="item.titleText"
        :value="item.value"
        class="item"
      />
    </div>
    <div class="pagination">
      <Pagination
        :data="chartData"
        :page-size="6"
        @currentPageData="handleCurrentPageData"
        ref="paginationRef"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import DistributionBoxElectricityCountChart from "./distributionBoxElectricityCountChart.vue";
  import TitleComponent from "./titleComponent.vue";
  import Pagination from "./pagination.vue";
  import { onUnmounted, ref } from "vue";

  // 定义 props
  const props = defineProps<{
    chartData: {
      titleText: string;
      value: number;
    }[];
  }>();

  const currentPageData = ref<any[]>(props.chartData.slice(0, 6));
  const paginationRef = ref();

  const handleCurrentPageData = (data: any[]) => {
    currentPageData.value = data;
  };

  const nextPage = () => {
    paginationRef.value.nextPage();
  };

  const prevPage = () => {
    paginationRef.value.prevPage();
  };

  const setPage = (page: number) => {
    paginationRef.value.setPage(page);
  };

  // 添加触摸相关的状态
  const touchStartX = ref(0);
  const isAutoPlaying = ref(true);
  let autoPlayInterval: NodeJS.Timer | null = null;

  // 触摸事件处理
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
      // 设置最小滑动距离
      if (diff > 0) {
        prevPage();
      } else {
        nextPage();
      }
    }
  };

  // 自动播放控制
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
        nextPage();
      }
    }, 5000);
  };

  // 初始化自动播放
  startAutoPlay();

  onUnmounted(() => {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval as any);
    }
  });
</script>

<style scoped>
  .distributionBoxElectricityCount {
    position: absolute;
    top: 303px;
    left: 20px;
    width: 226px;
    height: 150px;
  }
  .distributionBoxElectricityCountChart_container {
    position: absolute;
    top: 26px;
    left: 18px;
    width: 209px;
    height: 110px;
    display: flex;
    flex-wrap: wrap;
    gap: calc(27px / 2);
  }
  .item {
    width: 52px;
    height: 37px;
  }
  .pagination {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
