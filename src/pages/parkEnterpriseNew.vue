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
    <div class="star_enterprise">
      <div class="star_enterprise_title">企业画像</div>
      <div class="star_enterprise_content_search">
        <input
          type="text"
          placeholder="请输入企业名称"
          v-model="searchName"
        />
      </div>
      <div class="star_enterprise_content">
        <div
          class="star_enterprise_content_item"
          v-for="item in starEnterpriseData"
          :key="item.id"
        >
          <img
            :src="item.imgUrl"
            alt="企业图片"
          />
          <div class="star_enterprise_content_item_info">
            <div>企业名称:{{ item.name }}</div>
            <div>
              企业规模:{{ scaleMap[item.scale as keyof typeof scaleMap] }}
            </div>
            <div>员工数量:{{ item.employeesCount }} 人</div>
            <div>入驻时间:{{ dayjs(item.createdAt).format("YYYY-MM-DD") }}</div>
          </div>
          <div
            class="star_enterprise_content_item_button"
            @click.prevent="handleDetail(item)"
            style="cursor: pointer;"
          >
            <img
              src="@/assets/detail.png"
              alt="企业图片"
            />
            <p>详情</p>
          </div>
        </div>
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
  import { reactive, ref, onUnmounted, onMounted, watch } from "vue";
  import SecondaryTabs from "@/components/secondaryTabs.vue";
  // import Pagination from "@/components/pagination.vue";
  import {
    Enterprise,
    getEnterpriseData,
    getEnterpriseDataByName,
  } from "@/apis/getEnterpriseData";
  import dayjs from "dayjs";
  import router from "@/router";
  const chartData1 = reactive({
    xAxisData: [] as string[],
    seriesData: [] as number[],
  });

  const searchName = ref("");

  // 添加防抖函数
  const debounce = (fn: Function, delay: number) => {
    let timer: NodeJS.Timeout | null = null;
    return (...args: any[]) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(null, args);
      }, delay);
    };
  };

  // 修改 watch 部分
  watch(
    searchName,
    debounce(async () => {
      await fetchEnterpriseData();
    }, 500)
  );

  // const paginationRef = ref();

  const chartData2 = reactive({
    xAxisData: [] as string[],
    seriesData: [] as number[],
  });

  const offset1 = ref(3);
  const offset2 = ref(6);

  const color1 = ref("50, 206, 202");
  const color2 = ref("0, 133, 255");

  const starEnterpriseData = ref<Partial<Enterprise>[]>([]);

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

    data.forEach((item) => {
      typeCount[item.type]++;
      scaleCount[item.scale]++;
    });

    chartData1.xAxisData = ["科技类", "金融类", "实业类", "服务类", "其他"];
    chartData1.seriesData = [
      typeCount.TECHNOLOGY,
      typeCount.FINANCE,
      typeCount.INDUSTRY,
      typeCount.SERVICE,
      typeCount.OTHER,
    ];

    chartData2.xAxisData = ["小型", "中型", "大型"];
    chartData2.seriesData = [
      scaleCount.SMALL,
      scaleCount.NORMAL,
      scaleCount.OTHER,
    ];
  };

  const fetchEnterpriseData = async () => {
    try {
      const data = await getEnterpriseDataByName(searchName.value);

      starEnterpriseData.value = data.list.map((item) => ({
        id: item.id,
        imgUrl: item.imgUrl,
        name: item.name,
        employeesCount: item.employeesCount ?? "（未录入）",
        years: item.years ?? "（未录入）",
        scale: item.scale,
      }));

      processEnterpriseData(data.list);
    } catch (error) {
      console.error("获取企业数据失败:", error);
    }
  };

  const handleDetail = (item: Partial<Enterprise>) => {
    if (!item?.id) {
      console.error("企业ID不存在");
      return;
    }

    try {
      router
        .push({
          path: "/parkEnterpriseDetail",
          query: { id: item.id },
        })
        .catch((err) => {
          console.error("路由跳转失败:", err);
        });
    } catch (error) {
      console.error("跳转出错:", error);
    }
  };

  // const getCurrentStarEnterpriseData = (data: Partial<Enterprise>) => {
  //   currentStarEnterpriseData.value = data;
  //   console.log(data);
  // };

  // const currentIndex = ref(1);

  // const isAutoPlaying = ref(true);
  // let autoPlayInterval: NodeJS.Timer | null = null;

  // const pauseAutoPlay = () => {
  //   isAutoPlaying.value = false;
  //   if (autoPlayInterval) {
  //     clearInterval(autoPlayInterval as any);
  //     autoPlayInterval = null;
  //   }
  // };

  // const resumeAutoPlay = () => {
  //   isAutoPlaying.value = true;
  //   startAutoPlay();
  // };

  // const startAutoPlay = () => {
  //   autoPlayInterval = setInterval(() => {
  //     if (isAutoPlaying.value) {
  //       if (currentIndex.value < starEnterpriseData.value.length) {
  //         paginationRef.value.nextPage();
  //       } else {
  //         paginationRef.value.prevPage();
  //       }
  //     }
  //   }, 5000);
  // };

  // const touchStartX = ref(0);

  // const handleTouchStart = (e: TouchEvent) => {
  //   touchStartX.value = e.touches[0].clientX;
  // };

  // const handleTouchMove = (e: TouchEvent) => {
  //   e.preventDefault();
  // };

  // const handleTouchEnd = (e: TouchEvent) => {
  //   const touchEndX = e.changedTouches[0].clientX;
  //   const diff = touchEndX - touchStartX.value;

  //   if (Math.abs(diff) > 50) {
  //     if (diff > 0) {
  //       if (currentIndex.value > 1) {
  //         currentIndex.value--;
  //       }
  //     } else {
  //       if (currentIndex.value < starEnterpriseData.value.length) {
  //         currentIndex.value++;
  //       }
  //     }
  //   }
  // };

  let refreshInterval: NodeJS.Timer | null = null;

  onMounted(async () => {
    await fetchEnterpriseData();
    // startAutoPlay();

    // refreshInterval = setInterval(async () => {
    //   await fetchEnterpriseData();
    // }, 5 * 60 * 1000);
  });

  onUnmounted(() => {
    //   if (autoPlayInterval) {
    //     clearInterval(autoPlayInterval as any);
    //   }
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }
  });

  const scaleMap = {
    SMALL: "小型",
    NORMAL: "中型",
    OTHER: "大型",
  };
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

  .star_enterprise_content {
    position: relative;
    top: 88px;
    width: 100%;
    height: 270px;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr; /* 两列 */
    gap: 10px;
    padding: 0px 10px 10px 10px; /* 上 右 下 左 */
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }
  
  .star_enterprise_content::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }

  .star_enterprise_content_item {
    height: 75px;
    border-radius: 10px;
    background-color: rgba(97, 119, 138, 0.5);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .star_enterprise_content_item img {
    width: 76px;
    height: 57px;
    object-fit: cover;
  }

  .star_enterprise_content_item_info {
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 7px;
    color: #ffffff;
    line-height: 9px;
    text-align: left;
    font-style: normal;
    width: 92px;
    height: 54px;
    padding-right: 2px;
    display: flex;
    padding-left: 5px;
    align-items: space-around;
    justify-content: space-around;
    flex-direction: column;
  }

  .star_enterprise_content_item_button {
    width: 17px;
    height: 53px;
    border-radius: 4px;
    border: 1px solid rgba(148, 220, 239, 0.4);
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 9px;
    color: rgba(148, 220, 239, 0.8);
    line-height: 13px;
    text-align: left;
    font-style: normal;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .star_enterprise_content_item_button img {
    width: 10px;
    height: 10px;
    object-fit: cover;
  }

  .star_enterprise_content_item_button p {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 2px 3px;
  }

  .star_enterprise_content_search {
    position: absolute;
    top: 50px;
    width: 100%;
    height: 18px;
    margin: 0 10px;
  }

  .star_enterprise_content_search input {
    width: calc(100% - 20px);
    height: 18px;
    border: 1px solid #ffffff;
    border-radius: 5px;
    padding: 0 10px;
    background-color: rgba(97, 119, 138, 0.5);
    border: none;
    color: #ffffff;

    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 6px;
    color: #ffffff;
    line-height: 9px;
    text-align: left;
    font-style: normal;
  }

  .star_enterprise_content_search input:focus {
    background-color: rgba(97, 119, 138, 0.5);
    border: none;
    outline: none;
  }
</style>
