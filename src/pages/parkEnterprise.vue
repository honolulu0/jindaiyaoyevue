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
  const chartData1 = reactive({
    xAxisData: ["科技类", "金融类", "实业类", "服务类", "其他"],
    seriesData: [45, 42, 37, 20, 12],
  });

  const paginationRef = ref();

  const chartData2 = reactive({
    xAxisData: ["小微", "一般纳税", "其他"],
    seriesData: [45, 42, 37],
  });

  const offset1 = ref(3);
  const offset2 = ref(6);

  const color1 = ref("50, 206, 202");
  const color2 = ref("0, 133, 255");

  const starEnterpriseData = ref([
    {
      img: "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
      name: "百度",
      desc: "百度是一家全球领先的人工智能公司，致力于通过技术改变世界。百度是一家全球领先的人工智能公司，致力于通过技术改变世界。百度是一家全球领先的人工智能公司，致力于通过技术改变世界。百度是一家全球领先的人工智能公司，致力于通过技术改变世界。百度是一家全球领先的人工智能公司，致力于通过技术改变世界。百度是一家全球领先的人工智能公司，致力于通过技术改变世界。百度是一家全球领先的人工智能公司，致力于通过技术改变世界。百度是一家全球领先的人工智能公司，致力于通过技术改变世界。百度是一家全球领先的人工智能公司，致力于通过技术改变世界。百度是一家全球领先的人工智能公司，致力于通过技术改变世界。百度是一家全球领先的人工智能公司，致力于通过技术改变世界。百度是一家全球领先的人工智能公司，致力于通过技术改变世界。",
    },
    {
      img: "https://www.tencent.com/img/index/tencent_logo.png",
      name: "腾讯",
      desc: "腾讯是中国领先的互联网增值服务提供商，主要在社交、游戏、数字内容等领域开展业务。",
    },
    {
      img: "https://www.alibabagroup.com/assets/images/logo.png",
      name: "阿里巴巴",
      desc: "阿里巴巴是全球最大的电子商务平台之一，致力于让天下没有难做的生意。",
    },
    {
      img: "https://www.bytedance.com/img/logo.png",
      name: "字节跳动",
      desc: "字节跳动是一家科技公司，旗下拥有抖音、今日头条等多个流行应用产品。",
    },
    {
      img: "https://www.jd.com/img/logo.png",
      name: "京东",
      desc: "京东是中国领先的自营式电商企业，在零售基础设施和技术创新等方面处于行业领先地位。",
    },
  ]);

  const currentStarEnterpriseData = ref(starEnterpriseData.value[0]);

  const getCurrentStarEnterpriseData = (data: any) => {
    currentStarEnterpriseData.value = data[0];
    console.log(data);
  };

  const currentIndex = ref(1);

  // 添加自动翻页相关的状态和方法
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
        // 翻到下一页
        if (currentIndex.value < starEnterpriseData.value.length) {
          paginationRef.value.nextPage();
        } else {
          paginationRef.value.prevPage();
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
        // 上一页
        if (currentIndex.value > 1) {
          currentIndex.value--;
        }
      } else {
        // 下一页
        if (currentIndex.value < starEnterpriseData.value.length) {
          currentIndex.value++;
        }
      }
    }
  };

  onMounted(() => {
    startAutoPlay();
  });

  // 组件卸载时清理定时器
  onUnmounted(() => {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval as any);
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
