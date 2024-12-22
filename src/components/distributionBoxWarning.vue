<template>
  <div class="distribution-box-warning">
    <TitleComponent titleText="配电箱月度告警分析" />
    <div class="distribution-box-warning-content">
      <div
        ref="chartRef"
        style="width: 100%; height: 100%"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TitleComponent from "./titleComponent.vue";
  import { ref, onMounted, watch, computed } from "vue";
  import * as echarts from "echarts";

  // 定义props
  const props = defineProps<{
    currentYearData: number[];
    lastYearData: number[];
  }>();

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
        data: props.currentYearData,
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
        data: props.lastYearData,
      },
    ],
  }));

  // 监听数据变化，更新图表
  watch(
    () => [props.currentYearData, props.lastYearData],
    () => {
      const chart = echarts.init(chartRef.value, null, {
        renderer: 'svg'  // 使用SVG渲染器
      });
      chart.setOption(option.value);
    }
  );

  onMounted(() => {
    const chart = echarts.init(chartRef.value, null, {
      renderer: 'svg'  // 使用SVG渲染器
    });
    chart.setOption(option.value);

    window.addEventListener("resize", () => {
      chart.resize();
    });
  });
</script>

<style scoped>
  .distribution-box-warning {
    position: absolute;
    top: 195px;
    left: 20px;
    z-index: 1000;
    width: 236px;
    height: 102px;
    display: flex;
    flex-direction: column;
  }

  .distribution-box-warning-content {
    margin-top: 5px;
    flex: 1;
  }
</style>
