<template>
  <div class="park_error">
    <titleComponent title-text="年度异常事件分析" />
    <div class="tag_container">
<!--      <div class="tag_item">
        <div class="tag_item_icon equipment"></div>
        <div class="tag_item_bg"></div>
        <div class="tag_item_title">智能设备数量</div>
        <div class="tag_item_data">148</div>
        <div class="tag_item_unit">个</div>
      </div> -->
      <div class="tag_item">
        <div class="tag_item_icon warning"></div>
        <div class="tag_item_bg"></div>
        <div class="tag_item_title">异常事件处置率</div>
        <div class="tag_item_data">{{ handleData }}</div>
        <div class="tag_item_unit">%</div>
      </div>
    </div>
    <div class="distribution-box-warning-content">
      <div
        ref="chartRef"
        style="width: 100%; height: 100%"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import titleComponent from "./titleComponent.vue";
  import { ref, onMounted, watch, computed, onUnmounted } from "vue";
  import * as echarts from "echarts";
  import { getAlertSummary } from "@/apis/alertSummary";

  const chartInstance = ref<echarts.ECharts | null>(null);

  onMounted(async () => {
    const { thisYear, lastYear } = await getAlertSummary();
    console.log(thisYear, lastYear);
    currentYearData.value = thisYear.stats.map((item: any) => item.total_count);
    lastYearData.value = lastYear.stats.map((item: any) => item.total_count);
    console.log(thisYear.totals.total_processed, lastYear.totals.total_count);
    handleData.value = (
      (thisYear.totals.total_processed / thisYear.totals.total_count) *
      100
    ).toFixed(0);

    chartInstance.value = echarts.init(chartRef.value, undefined, {
      renderer: "svg",
    });
    chartInstance.value.setOption(option.value);

    const handleResize = () => chartInstance.value?.resize();
    window.addEventListener("resize", handleResize);

    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
      chartInstance.value?.dispose();
    });
  });

  const currentYearData = ref([10, 12, 15, 20, 15, 12, 10, 8, 12, 15, 10, 1]);
  const lastYearData = ref([30, 20, 10, 30, 25, 10, 8, 15, 20, 25, 30, 10]);

  const handleData = ref(0);

  const chartRef = ref();

  // 将option改为computed，这样可以响应props的变化
  const option = computed(() => ({
    grid: {
      top: "30%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        return `${params[0].axisValue}月<br/>${params[0].seriesName}: ${params[0].value}次<br/>${params[1].seriesName}: ${params[1].value}次`;
      },
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      top: 0,
      right: 0,
      itemWidth: 10,
      itemHeight: 4,
      borderRadius: 2,
      // backgroundColor: "rgba(0, 0, 0, 0.3)",
      padding: [4, 8],
      textStyle: {
        fontFamily: "SourceHanSansCN-Regular",
        fontWeight: 600,
        fontSize: 5,
        color: "#ACC0D8",
        lineHeight: 8,
        letterSpacing: 0,
      },
      itemStyle: {
        borderRadius: 2,
      },
      data: [
        {
          name: "今年异常",
          icon: "rect",
        },
        {
          name: "去年同期",
          icon: "rect",
        },
      ],
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
      axisLine: {},
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontFamily: "SourceHanSansCN-Regular",
        fontWeight: 600,
        fontSize: 5,
        color: "rgba(172, 192, 216, 0.5)",
        lineHeight: 8,
        letterSpacing: 0,
      },
    },
    yAxis: {
      type: "value",
      name: "异常个数",
      interval: 20,
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: "rgba(255,255,255,0.1)",
          width: 0.5,
        },
      },
      axisLabel: {
        fontFamily: "SourceHanSansCN-Regular",
        fontWeight: 600,
        fontSize: 5,
        color: "rgba(172, 192, 216, 0.5)",
        lineHeight: 8,
        letterSpacing: 0,
      },
      nameTextStyle: {
        fontFamily: "SourceHanSansCN-Regular",
        fontWeight: 600,
        fontSize: 5,
        color: "rgba(172, 192, 216, 0.5)",
        lineHeight: 8,
        letterSpacing: 0,
      },
    },
    series: [
      {
        name: "今年异常",
        type: "line",
        smooth: true,
        symbol: "none",
        lineStyle: {
          width: 1,
        },
        areaStyle: {
          opacity: 1,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(255, 107, 129, 0.3)", // 顶部颜色，粉红色半透明
            },
            {
              offset: 1,
              color: "rgba(255, 107, 129, 0)", // 底部颜色，完全透明
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: "#ff6b81",
        },
        data: currentYearData.value,
      },
      {
        name: "去年同期",
        type: "line",
        smooth: true,
        symbol: "none",
        lineStyle: {
          width: 1,
        },
        areaStyle: {
          opacity: 1,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(222, 184, 135, 0.3)", // 顶部颜色，金色半透明
            },
            {
              offset: 1,
              color: "rgba(222, 184, 135, 0)", // 底部颜色，完全透明
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: "#deb887",
        },
        data: lastYearData.value,
      },
    ],
  }));

  // 监听数据变化，更新图表
  watch(
    () => [currentYearData.value, lastYearData.value],
    () => {
      chartInstance.value?.setOption(option.value);
    },
    { deep: true }
  );
</script>

<style scoped>
  .park_error {
    position: absolute;
    left: 20px;
    top: 304px;
    width: 206px;
    height: 143px;
  }

  .tag_container {
    position: absolute;
    top: 28px;
    left: 0;
    width: 189px;
    height: 127px;
  }

  .tag_item {
    position: absolute;
    width: 87px;
    height: 33px;
  }

  .tag_item:nth-child(1) {
    top: 0;
    left: 0;
  }

  .tag_item:nth-child(2) {
    top: 0;
    left: 101px;
  }

  .tag_item_icon {
    position: absolute;
    top: 4px;
    left: 0;
    width: 25px;
    height: 28px;
    background-size: cover;
  }

  .tag_item_icon.equipment {
    background-image: url("@/assets/智能设备.png");
  }

  .tag_item_icon.warning {
    background-image: url("@/assets/异常事件.png");
  }

  .tag_item_bg {
    position: absolute;
    left: 26px;
    top: 10px;
    width: 62px;
    height: 23px;
    background-image: url("@/assets/park_supporting_item_bg.png");
    background-size: cover;
  }

  .tag_item_title {
    width: max-content;
    height: 8px;
    font-family: YouSheBiaoTiHei;
    font-size: 6px;
    color: #e4f3ff;
    line-height: 8px;
    text-align: left;
    font-style: normal;
    position: absolute;
    top: 0;
    left: 37px;
  }

  .tag_item_data {
    position: absolute;
    top: 10px;
    left: 37px;
    width: max-content;
    height: 13px;
    font-family: YouSheBiaoTiHei;
    font-size: 10px;
    color: #d9f1fd;
    line-height: 13px;
    text-align: left;
    font-style: normal;
  }

  .tag_item_unit {
    position: absolute;
    top: 13px;
    left: 58px;
    width: max-content;
    height: 8px;
    font-family: YouSheBiaoTiHei;
    font-size: 6px;
    color: #e4f3ff;
    line-height: 8px;
    text-align: left;
    font-style: normal;
  }

  .distribution-box-warning-content {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    height: 78px;
  }
</style>
