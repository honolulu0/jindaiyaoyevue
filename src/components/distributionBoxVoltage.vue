<template>
  <div class="distribution-box-voltage">
    <TitleComponent titleText="配电柜电压" />
    <div class="distribution-box-voltage-content">
      <div
        ref="chartRef"
        style="width: 100%; height: 100%"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from "vue";
  import * as echarts from "echarts";
  import TitleComponent from "./titleComponent.vue";

  // 定义props
  const props = defineProps({
    option: {
      type: Object,
      default: () => ({
        xAxisData: [],
        seriesData: [],
      }),
    },
  });

  const chartRef = ref();
  let chart: any = null;

  // 图表配置
  const getChartOption = () => ({
    grid: {
      top: 10,
      bottom: 20,
      left: 30,
      right: 10,
    },
    xAxis: {
      type: "category",
      data: props.option.xAxisData,
      axisLabel: {
        color: "#E4F3FF",
        fontSize: 4,
        rotate: 45,
        fontFamily: "SourceHanSansSC-Normal",
        fontWeight: 600,
        lineHeight: 6,
      },
    },
    yAxis: {
      type: "value",
      max: 300,
      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,0.1)",
          type: "dashed",
        },
      },
      axisLabel: {
        color: "#E4F3FF",
        fontSize: 5,
        fontFamily: "DIN",
        fontWeight: 900,
        lineHeight: 11,
      },
    },
    series: [
      {
        data: props.option.seriesData,
        type: "bar",
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#00ffff",
              },
              {
                offset: 1,
                color: "rgba(0,255,255,0.1)",
              },
            ],
          },
        },
        barWidth: 5,
        markPoint: {
          symbol: "rect",
          symbolSize: [10, 10],
          data: [
            {
              type: "max",
              label: {
                show: true,
                formatter: "{c}V",
                color: "#00ffff",
                fontSize: 5,
                fontWeight: "bold",
                position: "top",
                offset: [0, 5],
              },
            },
          ],
          itemStyle: {
            color: "transparent",
          },
        },
      },
      {
        name: "警戒线",
        type: "line",
        markLine: {
          symbol: "none",
          silent: true,
          data: [
            {
              yAxis: 250,
              label: {
                formatter: "警戒线",
                color: "#E4F3FF",
                fontSize: 4,
                fontFamily: "SourceHanSansSC-Normal",
                fontWeight: 600,
                lineHeight: 6,
                align: "left",
                position: "end",
                distance: -10,
                offset: [0, -10],
                width: 16,
                height: 6,
              },
              lineStyle: {
                color: "#ff4d4f",
                type: "dashed",
              },
            },
          ],
        },
      },
    ],
  });

  onMounted(() => {
    chart = echarts.init(chartRef.value, null, {
      renderer: "svg",
    });
    chart.setOption(getChartOption());
  });

  // 监听option变化，更新图表
  watch(
    () => props.option,
    () => {
      if (chart) {
        chart.setOption(getChartOption());
      }
    },
    { deep: true }
  );
</script>

<style scoped>
  .distribution-box-voltage {
    position: absolute;
    bottom: 0px;
    left: 20px;
    width: 236px;
    height: 123px;
  }

  .distribution-box-voltage-content {
    width: 100%;
    height: calc(100% - 30px);
  }
</style>
