<template>
  <div class="w-full h-full absolute top-0 left-0 z-0">
    <div
      class="w-full h-full absolute top-0 left-0 z-0 bg-[#0A131C] bg-opacity-80"
    ></div>
    <SecondaryTabs :activeIndex="2" />
    <div
      class="content_container"
      @mouseenter="pauseAutoPlay"
      @mouseleave="resumeAutoPlay"
    >
      <div class="tab_container1">
        <div
          v-for="item in tabList"
          :key="item.key"
          :class="activeTab === item.key ? 'tab_item_active' : 'tab_item'"
          @click="handleTabClick(item.key)"
          :style="{ left: `${(item.key - 1) * 64 + 178}px` }"
        >
          {{ item.label }}
        </div>
      </div>
      <div
        class="img"
        :style="{ backgroundImage: `url(${currentPageData.img})` }"
      ></div>
      <div
        style="
          position: absolute;
          top: 262px;
          width: 100%;
          height: max-content;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <Pagination
          :pageSize="1"
          :data="content"
          @currentPageData="handleCurrentPageData"
          ref="paginationRef"
        />
      </div>
      <div class="title">{{ currentPageData.title }}</div>
      <div class="content">{{ currentPageData.content }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import SecondaryTabs from "@/components/secondaryTabs.vue";
  import Pagination from "@/components/pagination.vue";
  import { ref, onMounted, onUnmounted } from "vue";

  const content = ref([
    {
      title: "维修服务",
      content: "维修服务内容1",
      img: "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
    },
    {
      title: "维修服务",
      content: "维修服务内容2",
      img: "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
    },
    {
      title: "维修服务",
      content: "维修服务内容3",
      img: "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
    },
    {
      title: "维修服务",
      content: "维修服务内容4",
      img: "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
    },
    {
      title: "维修服务",
      content: "维修服务内容5",
      img: "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
    },
    {
      title: "维修服务",
      content: "维修服务内容6",
      img: "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
    },
    {
      title: "维修服务",
      content: "维修服务内容7",
      img: "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
    },
    {
      title: "维修服务",
      content: "维修服务内容8",
      img: "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
    },
  ]);

  const paginationRef = ref();

  const currentPageData = ref({
    title: "维修服务",
    content: "维修服务内容1",
    img: "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
  });

  const handleCurrentPageData = (data: any) => {
    currentPageData.value = data[0];
  };

  const tabList = ref([
    { label: "维修服务", key: 1 },
    { label: "家政服务", key: 2 },
    { label: "租赁服务", key: 3 },
    { label: "会议服务", key: 4 },
    { label: "代办服务", key: 5 },
    { label: "其他服务", key: 6 },
  ]);

  const activeTab = ref(1);

  const handleTabClick = (key: number) => {
    activeTab.value = key;
  };

  // 添加自动翻页相关的状态
  const isAutoPlaying = ref(true);
  let autoPlayInterval: NodeJS.Timer | null = null;

  // 自动翻页控制方法
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
        if (paginationRef.value) {
          paginationRef.value.nextPage();
        }
      }
    }, 5000); // 每5秒翻页一次
  };

  // 触摸相关变量和方法
  const touchStartX = ref(0);

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
        paginationRef.value?.prevPage();
      } else {
        paginationRef.value?.nextPage();
      }
    }
  };

  // 生命周期钩子
  onMounted(() => {
    startAutoPlay();
  });

  onUnmounted(() => {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval as any);
    }
  });
</script>

<style scoped>
  .content_container {
    position: absolute;
    left: 165px;
    top: 159px;
    width: 749px;
    height: 359px;
    background-image: url("@/assets/accident_tiltle_bg2备份.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .tab_container1 {
    width: 100%;
    height: 16px;
    position: absolute;
    top: 27px;
  }

  .tab_item {
    position: absolute;
    top: 0;
    width: 75px;
    height: 16px;
    background-image: url("@/assets/parkPolicy/tab2.png");
    background-size: contain;
    background-repeat: no-repeat;
    font-family: SourceHanSansSC-Normal;
    font-weight: 500;
    font-size: 7px;
    color: #ffffff;
    line-height: 11px;
    text-align: left;
    font-style: normal;
    padding-left: 15px;
  }

  .tab_item_active {
    position: absolute;
    top: 0;
    width: 75px;
    height: 16px;
    background-image: url("@/assets/parkPolicy/tab1-选中.png");
    background-size: contain;
    background-repeat: no-repeat;
    font-family: SourceHanSansSC-Normal;
    font-weight: 500;
    padding-left: 15px;
    font-size: 7px;
    color: #84f8fb;
    line-height: 11px;
    text-align: left;
    font-style: normal;
  }

  .img {
    position: absolute;
    top: 72px;
    left: 191px;
    width: 368px;
    height: 179px;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .title {
    position: absolute;
    top: 273px;
    width: 100%;
    height: 13px;
    font-family: YouSheBiaoTiHei;
    font-size: 11px;
    color: #e4f3ff;
    line-height: 13px;
    letter-spacing: 1px;
    text-align: center;
    font-style: normal;
  }

  .content {
    position: absolute;
    top: 295px;
    width: calc(100% - 374px);
    height: calc(100% - 295px);
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 7px;
    color: #e4f3ff;
    line-height: 13px;
    margin-left: 187px;
    margin-right: 187px;
    text-indent: 2em;
  }
</style>
