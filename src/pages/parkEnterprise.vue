<template>
  <div
    class="w-full h-full absolute top-0 left-0 z-0 flex justify-center items-center"
  >
    <div
      class="w-full h-full absolute top-0 left-0 z-0 bg-[#0A131C] bg-opacity-80"
    ></div>
    <SecondaryTabs :active-index="1" />
    <parkEnterpriseCount
      :data="chartData1"
      :width="14"
      :color="color1"
      :offset="offset1"
    />
    <enterpriseProportion />
    <parkEnterpriseList />
    <parkEnterpriseScale
      :data="chartData2"
      :width="30"
      :color="color2"
      :offset="offset2"
    />
    <enterpriseScaleProportion />
    <parkEnterpriseScaleList />
    <div
      class="star_enterprise"
      @mouseenter="pauseAutoPlay"
      @mouseleave="resumeAutoPlay"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div class="star_enterprise_title">明星企业</div>
      <div
        class="star_enterprise_img"
        :style="{ backgroundImage: `url(${currentStarEnterpriseData.img})` }"
      ></div>
      <Pagination
        ref="paginationRef"
        style="position: absolute; left: 204px; top: 263px"
        :data="starEnterpriseData"
        :page-size="1"
        @current-page-data="getCurrentStarEnterpriseData"
      ></Pagination>
      <div class="star_enterprise_desc">
        <p class="star_enterprise_name">{{ currentStarEnterpriseData.name }}</p>
        <p class="star_enterprise_text">{{ currentStarEnterpriseData.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import parkEnterpriseCount from "@/components/parkEnterpriseCount.vue";
  import enterpriseProportion from "@/components/enterpriseProportion.vue";
  import parkEnterpriseList from "@/components/parkEnterpriseList.vue";
  import parkEnterpriseScale from "@/components/parkEnterpriseScale.vue";
  import enterpriseScaleProportion from "@/components/enterpriseScaleProportion.vue";
  import parkEnterpriseScaleList from "@/components/parkEnterpriseScaleList.vue";
  import { reactive, ref, onUnmounted, onMounted } from "vue";
  import SecondaryTabs from "@/components/secondaryTabs.vue";
  import Pagination from "@/components/pagination.vue";
  import { getEnterpriseData } from "@/apis/getEnterpriseData";

  const chartData1 = reactive({
    xAxisData: [] as string[],
    seriesData: [] as number[],
  });

  const paginationRef = ref();

  const chartData2 = reactive({
    xAxisData: [] as string[],
    seriesData: [] as number[],
  });

  const offset1 = ref(3);
  const offset2 = ref(6);

  const color1 = ref("50, 206, 202");
  const color2 = ref("0, 133, 255");

  const starEnterpriseData = ref([]);
  const currentStarEnterpriseData = ref({
    img: '',
    name: '',
    desc: ''
  });

  const processEnterpriseData = (data: Enterprise[]) => {
    const typeCount = {
      TECHNOLOGY: 0,
      FINANCE: 0,
      INDUSTRY: 0,
      SERVICE: 0,
      OTHER: 0,
    };
    
    const scaleCount = {
      SMALL: 0,
      NORMAL: 0,
      OTHER: 0,
    };

    data.forEach(item => {
      typeCount[item.type]++;
      scaleCount[item.scale]++;
    });

    chartData1.xAxisData = ['科技类', '金融类', '实业类', '服务类', '其他'];
    chartData1.seriesData = [
      typeCount.TECHNOLOGY,
      typeCount.FINANCE,
      typeCount.INDUSTRY,
      typeCount.SERVICE,
      typeCount.OTHER,
    ];

    chartData2.xAxisData = ['小微', '一般纳税', '其他'];
    chartData2.seriesData = [
      scaleCount.SMALL,
      scaleCount.NORMAL,
      scaleCount.OTHER,
    ];
  };

  const fetchEnterpriseData = async () => {
    try {
      const data = await getEnterpriseData();
      
      processEnterpriseData(data);
      
      const starEnterprises = data
        .filter(item => item.isStar)
        .map(item => ({
          img: item.imgUrl,
          name: item.name,
          desc: item.description
        }));
      
      starEnterpriseData.value = starEnterprises;
      if (starEnterprises.length > 0) {
        currentStarEnterpriseData.value = starEnterprises[0];
      }
    } catch (error) {
      console.error('获取企业数据失败:', error);
    }
  };

  const getCurrentStarEnterpriseData = (data: any) => {
    currentStarEnterpriseData.value = data[0];
    console.log(data);
  };

  const currentIndex = ref(1);

  const isAutoPlaying = ref(true);
  let autoPlayInterval: NodeJS.Timer | null = null;

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
        if (currentIndex.value < starEnterpriseData.value.length) {
          paginationRef.value.nextPage();
        } else {
          paginationRef.value.prevPage();
        }
      }
    }, 5000);
  };

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
        if (currentIndex.value > 1) {
          currentIndex.value--;
        }
      } else {
        if (currentIndex.value < starEnterpriseData.value.length) {
          currentIndex.value++;
        }
      }
    }
  };

  let refreshInterval: NodeJS.Timer | null = null;

  onMounted(async () => {
    await fetchEnterpriseData();
    startAutoPlay();
    
    refreshInterval = setInterval(async () => {
      await fetchEnterpriseData();
    }, 5 * 60 * 1000);
  });

  onUnmounted(() => {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval as any);
    }
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }
  });
</script>

<style scoped>
  .star_enterprise {
    width: 449px;
    height: 359px;
    background-image: url("@/assets/enterprises/accident_tiltle_bg2备份.png");
    background-size: 100% 100%;
    position: absolute;
    left: 317px;
    top: 159px;
  }
  .star_enterprise_title {
    position: absolute;
    left: 110px;
    top: 23px;
    width: 226px;
    height: 16px;
    background-image: url("@/assets/enterprises/星星icon.png");
    background-size: 100% 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: YouSheBiaoTiHei;
    font-size: 18px;
    color: #ffd677;
    line-height: 13px;
    letter-spacing: 1px;
    text-align: left;
    font-style: normal;
  }

  .star_enterprise_img {
    position: absolute;
    left: 31px;
    top: 58px;
    width: 386px;
    height: 193px;
    background-size: 100% 100%;
  }

  .star_enterprise_name {
  }

  .star_enterprise_desc {
    position: absolute;
    left: 31px;
    bottom: 26px;
    width: 387px;
    height: 54px;
    font-family: SourceHanSansCS-Normal;
    font-weight: 600;
    font-size: 7px;
    color: #e4f3ff;
    line-height: 13px;
    text-align: left;
    font-style: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
