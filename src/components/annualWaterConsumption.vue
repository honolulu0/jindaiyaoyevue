<template>
  <div class="annualWaterConsumption">
    <TitleComponent titleText="年度用水量" />
    <div class="annualWaterConsumption-content">
      <div class="annualWaterConsumption-content-total">

        <span class="annualWaterConsumption-content-total-title">
          <WaterPath />
          年度用水总量
          <WaterPath style="left: -20px;" />
        </span>
        <span class="annualWaterConsumption-content-total-value">
          {{ formattedWaterConsumption }}m³
        </span>
      </div>
      <div class="annualWaterConsumption-content-history">
        <div class="annualWaterConsumption-content-history-text">
          <div class="annualWaterConsumption-content-history-text-title">
            历史趋势
          </div>
          <div class="flex-1"></div>

          <div class="annualWaterConsumption-content-history-text-value">
            历史记录
          </div>
        </div>
        <div
          ref="chartRef"
          class="chart-container"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TitleComponent from "@/components/titleComponent.vue";
  import WaterPath from "@/components/waterPath.vue";
  import { ref, computed, onMounted, watch, onUnmounted } from "vue";
  import * as echarts from "echarts";

  const chartRef = ref();
  const chart = ref();

  interface Props {
    totalConsumption: number
    chartData: number[]
  }

  const props = withDefaults(defineProps<Props>(), {
    totalConsumption: 0,
    chartData: () => [10, 15, 18, 23, 23, 25, 20, 28, 30, 35, 38, 40]
  })

  const formattedWaterConsumption = computed(() => {
    return Math.floor(props.totalConsumption).toLocaleString();
  });

  const activeUnit = ref("month");

  const updateChart = () => {
    if (!chart.value) return;
    
    const option = {
      grid: {
        top: "30%",
        left: "20%",
        right: "12%",
        bottom: "23%",
      },
      xAxis: {
        type: "category",
        name: "(月)",
        nameLocation: "end",
        nameGap: 5,
        nameTextStyle: {
          fontFamily: "SourceHanSansSC-Normal",
          fontSize: 6,
          color: "#E4F3FF",
          verticalAlign: "bottom",
          lineHeight: -18,
        },
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
        axisLabel: {
          fontFamily: "SourceHanSansSC-Normal",
          fontSize: 6,
          color: "#E4F3FF",
        },
        axisLine: {
          lineStyle: {
            color: "rgba(228, 243, 255, 0.1)",
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: "value",
        // interval: 10,
        axisLabel: {
          fontFamily: "SourceHanSansSC-Normal",
          fontSize: 6,
          color: "#E4F3FF",
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(228, 243, 255, 0.05)",
            type: "dashed",
            dashOffset: 100,
            width: 1,
          },
        },
      },
      series: [
        {
          data: props.chartData,
          type: "line",
          smooth: true,
          symbol: "none",
          itemStyle: {
            color: "#00FFFF",
          },
          lineStyle: {
            color: "#00FFFF",
            width: 1,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(0, 255, 255, 0.3)",
              },
              {
                offset: 1,
                color: "rgba(0, 255, 255, 0)",
              },
            ]),
          },
        },
      ],
    };
    
    chart.value.setOption(option);
  };

  onMounted(() => {
    chart.value = echarts.init(chartRef.value, null, {
      renderer: "svg",
    });
    updateChart();
    
    window.addEventListener("resize", () => {
      chart.value?.resize();
    });
  });

  // 监听数据变化
  watch(() => props.chartData, () => {
    updateChart();
  }, { deep: true });

  // 组件卸载时清理
  onUnmounted(() => {
    chart.value?.dispose();
    window.removeEventListener("resize", () => {
      chart.value?.resize();
    });
  });
</script>

<style scoped>
  .annualWaterConsumption {
    width: 236px;
    height: calc(115px + 217px + 30px);
    position: absolute;
    top: 82px;
    right: 20px;
  }
  .annualWaterConsumption-content {
    width: 100%;
    height: calc(100% - 30px);
    display: flex;
    flex-direction: column;
  }
  .annualWaterConsumption-content-total {
    width: 100%;
    height: 74px;
    margin-top: 30px;
    background-image: url("@/assets/powerConsumption/年度用水总能耗背景.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    font-family: YouSheBiaoTiHei;
    font-weight: 600;
    font-size: 14px;
    color: #ffffff;
    line-height: 20px;
    text-align: left;
    font-style: normal;
  }

  .annualWaterConsumption-content-total-title {
    margin-bottom: 7px;
    font-size: 13px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: start;
    margin-left: 5px;
    margin-top: 10px;
    font-family: YouSheBiaoTiHei;
    font-size: 13px;
    color: #b8fbfd;
    line-height: 20px;
    text-shadow: 2px 2px 0px rgba(19, 52, 42, 0.5);
    text-align: left;
    font-style: normal;
  }

  .annualWaterConsumption-content-total-value {
    display: flex;
    align-items: center;
    justify-content: start;
    margin-top: 7px;
    margin-bottom: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    font-family: YouSheBiaoTiHei;
    font-size: 13px;
    color: #b8fbfd;
    line-height: 20px;
    text-shadow: 2px 2px 0px rgba(19, 52, 42, 0.5);
    text-align: left;
    font-style: normal;
  }

  .annualWaterConsumption-content-history {
    margin-top: 26px;
    width: 100%;
    height: 115px;
    background-image: url("@/assets/powerConsumption/历史趋势-右侧.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .chart-container {
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .annualWaterConsumption-content-history-text {
    position: absolute;
    top: 156px;
    left: 0px;
    font-family: YouSheBiaoTiHei;
    font-weight: 600;
    font-size: 6px;
    color: #e4f3ff;
    line-height: 11px;
    text-align: center;
    font-style: normal;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 5px;
    z-index: 2;
  }

  .time-unit {
    position: relative;
    cursor: pointer;
    padding: 2px 8px;
    border-radius: 4px;
  }

  .time-unit.active::after {
    content: "▲";
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    color: #e4f3ff;
    font-size: 4px;
  }

  .time-unit:hover {
    background: rgba(228, 243, 255, 0.1);
  }
</style>
