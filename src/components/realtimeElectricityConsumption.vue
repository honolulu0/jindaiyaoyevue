<template>
  <div class="realtimeElectricityConsumption">
    <TitleComponent titleText="实时能耗" />
    <div class="realtimeElectricityConsumption-content">
      <div
        ref="chartRef"
        style="width: 100%; height: 100%"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TitleComponent from "./titleComponent.vue";
  import * as echarts from "echarts";
  import { computed, onMounted, onUnmounted, reactive, ref, watch } from "vue";

  const data = reactive({
    powerData: [10, 20, 30, 10, 0, 24, 70, 80, 90, 100, 110, 120],
    waterData: [5, 15, 25, 35, 45, 24, 65, 75, 85, 95, 105, 115],
  });

  const chartRef = ref<HTMLDivElement | null>();

  const option = computed(() => ({
    grid: {
      top: "35%",
      left: "5%",
      right: "5%",
      bottom: "3%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params: any) {
        return `${params[0].axisValue}<br/>
              电能耗: ${params[0].value} kwh<br/>
              水能耗: ${params[1].value} 吨`;
      },
    },
    legend: {
      top: 0,
      right: 0,
      itemWidth: 10,
      itemHeight: 4,
      textStyle: {
        fontSize: 5,
        color: "#ACC0D8",
      },
      data: [
        { name: "电能耗", icon: "rect" },
        { name: "水能耗", icon: "rect" },
      ],
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "1:00",
        "2:00",
        "3:00",
        "4:00",
        "5:00",
        "6:00",
        "7:00",
        "8:00",
        "9:00",
        "10:00",
        "11:00",
        "12:00",
      ],
      axisLabel: {
        fontSize: 5,
        color: "rgba(172, 192, 216, 0.5)",
      },
    },
    yAxis: [
      {
        type: "value",
        name: "kwh",
        nameTextStyle: {
          fontSize: 5,
          color: "rgba(172, 192, 216, 0.5)",
          align: "center",
          lineHeight: -10,
          verticalAlign: "bottom",
        },
        interval: 20,
        axisLabel: {
          fontSize: 5,
          color: "rgba(172, 192, 216, 0.5)",
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "rgba(255,255,255,0.1)",
          },
        },
      },
      {
        type: "value",
        name: "吨",
        nameTextStyle: {
          fontSize: 5,
          color: "rgba(172, 192, 216, 0.5)",
          lineHeight: -10,
          verticalAlign: "bottom",
        },
        interval: 20,
        axisLabel: {
          fontSize: 5,
          color: "rgba(172, 192, 216, 0.5)",
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "电能耗",
        yAxisIndex: 0,
        type: "line",
        smooth: true,
        symbol: "none",
        lineStyle: { width: 1 },
        itemStyle: { color: "#FEE186" },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(254, 225, 134, 0.4)" },
            { offset: 1, color: "rgba(254, 225, 134, 0)" },
          ]),
        },
        data: data.powerData,
      },
      {
        name: "水能耗",
        yAxisIndex: 1,
        type: "line",
        smooth: true,
        symbol: "none",
        lineStyle: { width: 1 },
        itemStyle: { color: "#14FFFD" },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(140, 255, 253, 0.4)" },
            { offset: 1, color: "rgba(140, 255, 253, 0)" },
          ]),
        },
        data: data.waterData,
      },
    ],
  }));

  onMounted(() => {
    if (chartRef.value) {
      const chart = echarts.init(chartRef.value);
      chart.setOption(option.value);
      window.addEventListener("resize", () => {
        chart.resize();
      });
    }
  });

  // 监听数据变化，更新图表
  watch(
    () => [data.powerData, data.waterData],
    () => {
      const chart = echarts.init(chartRef.value);
      chart.setOption(option.value);
    }
  );

  onUnmounted(() => {
    if (chartRef.value) {
      echarts.dispose(chartRef.value);
    }
  });
</script>

<style scoped>
  .realtimeElectricityConsumption {
    width: 206px;
    height: 108px;
    position: absolute;
    top: 84px;
    right: 26px;
  }

  .realtimeElectricityConsumption-content {
    width: 100%;
    height: calc(100% - 30px);
  }
</style>
