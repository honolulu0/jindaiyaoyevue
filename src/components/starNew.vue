<template>
  <div
    class="star-new"
    @mouseenter="pauseAutoPlay"
    @mouseleave="resumeAutoPlay"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <TitleComponent titleText="明星企业" />
    <div class="star-new-content">
      <div
        class="star-new-content-item"
        :style="{ backgroundImage: `url(${currentData.img})` }"
      ></div>
      <div class="star-new-content-item">
        <p>{{ currentData.value }}</p>
      </div>
    </div>
    <div class="star-new-pagination">
      <Pagination
        :data="data"
        :pageSize="1"
        @currentPageData="currentPageData"
        ref="paginationRef"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import TitleComponent from "./titleComponent.vue";
  import Pagination from "./pagination.vue";
  import { reactive, ref, onUnmounted, onMounted } from "vue";
  import { getEnterpriseData, type Enterprise } from "@/apis/getEnterpriseData";

  // 添加 props 定义
  interface Props {
    bottom?: string | number
    right?: string | number
  }

  const props = withDefaults(defineProps<Props>(), {
    bottom: '6px',
    right: '20px'
  })

  // 替换静态数据为接口数据
  const data = reactive<Enterprise[]>([]);
  const currentData = ref<Enterprise>({} as Enterprise);

  // 获取数据的方法
  const fetchData = async () => {
    try {
      const enterprises = await getEnterpriseData();
      // 只获取 isStar 为 true 的企业
      const starEnterprises = enterprises.filter((e) => e.isStar);
      data.splice(
        0,
        data.length,
        ...starEnterprises.map((e) => ({
          img: e.imgUrl,
          value: e.name + "\n" + e.description,
        }))
      );

      if (data.length > 0) {
        currentData.value = data[0];
      }
    } catch (error) {
      console.error("获取企业数据失败:", error);
    }
  };

  const paginationRef = ref();

  // 添加触摸相关的状态
  const touchStartX = ref(0);
  const isAutoPlaying = ref(true);
  let autoPlayInterval: NodeJS.Timer | null = null;

  const currentPageData = (data: any[]) => {
    currentData.value = data[0];
  };

  // 翻页控制方法
  const nextPage = () => {
    paginationRef.value.nextPage();
  };

  const prevPage = () => {
    paginationRef.value.prevPage();
  };

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
    }, 5000); // 每5秒自动翻页
  };

  // 初始化自动播放
  startAutoPlay();

  // 初始化数据和定时刷新
  onMounted(() => {
    fetchData();
    // 每5分钟刷新一次数据
    const refreshInterval = setInterval(fetchData, 5 * 60 * 1000);

    onUnmounted(() => {
      clearInterval(refreshInterval);
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval as any);
      }
    });
  });
</script>

<style scoped>
  .star-new {
    position: absolute;
    width: 206px;
    height: 80px;
  }

  .star-new-content {
    width: 100%;
    height: 50px;
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }

  .star-new-content-item {
    background-image: url("@/assets/红色渐变背景.png");
    background-size: 100% 100%;
    width: 103px;
    height: 50px;
    overflow: hidden;
  }

  p {
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 6px;
    color: #ffffff;
    line-height: 9px;
    white-space: pre-wrap; /* 保留空白符和换行符 */
    word-wrap: break-word; /* 允许长单词换行 */
    padding: 5px; /* 添加一些内边距使文字不贴边 */
  }

  .star-new-pagination {
    margin-top: 5px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
