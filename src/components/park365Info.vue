<template>
  <div 
    class="park_365_info"
    @mouseenter="pauseAutoPlay"
    @mouseleave="resumeAutoPlay"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <TitleComponent titleText="园区“365”优势" />
    <div
      class="img"
      :style="{
        backgroundImage: `url(${imgurl})`,
      }"
    ></div>
    <div class="pagination">
      <Pagination
        :data="data"
        @currentPageData="handleCurrentPageData"
        :pageSize="1"
        ref="paginationRef"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import TitleComponent from "./titleComponent.vue";
  import Pagination from "./pagination.vue";
  import { computed, ref, onUnmounted } from "vue";
  const baseUrl = import.meta.url.substring(
    0,
    import.meta.url.lastIndexOf("/")
  );
  const data = ref(["三优", "六合", "五谷"]);
  const imgurl = computed(() => {
    return baseUrl + `/../assets/${currentPageData.value}.png`;
  });
  const currentPageData = ref("三优");
  const paginationRef = ref();
  const handleCurrentPageData = (data: string[]) => {
    currentPageData.value = data[0];
  };

  // 添加翻页相关方法
  const nextPage = () => {
    paginationRef.value.nextPage();
  };

  const prevPage = () => {
    paginationRef.value.prevPage();
  };

  // 触摸相关状态和方法
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
  .park_365_info {
    width: 206px;
    height: 181px;
    position: absolute;
    top: 114px;
    left: 20px;
  }

  .img {
    position: absolute;
    top: 29px;
    left: 16px;
    width: 174px;
    height: 149px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .pagination {
    margin-top: 8px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
