<template>
  <div
    class="circle-progress"
    ref="chartRef"
  >
    <v-chart
      :option="option"
      autoresize
    />
  </div>
</template>

<script setup lang="ts">
  import { use } from "echarts/core";
  import { CanvasRenderer } from "echarts/renderers";
  import { GaugeChart } from "echarts/charts";
  import VChart from "vue-echarts";
  import { computed } from "vue";

  // 注册必须的组件
  use([CanvasRenderer, GaugeChart]);

  const props = defineProps({
    percentage: {
      type: Number,
      default: 45,
    },
    startColor: {
      type: String,
      default: "#a5d8fc",
    },
    endColor: {
      type: String,
      default: "#7ac6ff",
    },
  });

  const option = computed(() => ({
    series: [
      {
        type: "gauge",
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false,
        },
        progress: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            width: 3,
            color: [[1, "rgba(255, 255, 255, 0.3)"]],
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        radius: "100%",
        data: [{ value: 100 }],
        detail: {
          show: false,
        },
      },
      {
        type: "gauge",
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false,
        },
        progress: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            width: 1,
            color: [[1, "rgba(255, 255, 255, 0.5)"]],
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        radius: "80%",
        data: [{ value: 100 }],
        detail: {
          show: false,
        },
      },
      {
        type: "gauge",
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          clip: false,
          roundCap: false,
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: props.startColor,
                },
                {
                  offset: 1,
                  color: props.endColor,
                },
              ],
            },
            opacity: 1,
          },
          backgroundColor: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: props.startColor + "33",
              },
              {
                offset: 1,
                color: props.endColor + "33",
              },
            ],
          },
        },
        axisLine: {
          lineStyle: {
            width: 3,
            color: [[1, "rgba(25, 46, 68, 0.3)"]],
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        data: [
          {
            value: props.percentage,
            detail: {
              valueAnimation: true,
              offsetCenter: ["0%", "0%"],
            },
          },
        ],
        detail: {
          width: 16,
          height: 10,
          fontSize: 8,
          color: "#fff",
          formatter: "{value}%",
          valueAnimation: true,
          fontFamily: "YouSheBiaoTiHei",
        },
        radius: "65%",
      },
    ],
  }));
</script>

<style scoped>
  .circle-progress {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
