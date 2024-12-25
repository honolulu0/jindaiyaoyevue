<template>
  <div class="park_error">
    <titleComponent title-text="月度异常事件分析" />
    <!-- <div class="tag_container">
      <div class="tag_item">
        <div class="tag_item_icon equipment"></div>
        <div class="tag_item_bg"></div>
        <div class="tag_item_title">智能设备数量</div>
        <div class="tag_item_data">148</div>
        <div class="tag_item_unit">个</div>
      </div>
      <div class="tag_item">
        <div class="tag_item_icon warning"></div>
        <div class="tag_item_bg"></div>
        <div class="tag_item_title">异常事件处置率</div>
        <div class="tag_item_data">{{ handleData }}</div>
        <div class="tag_item_unit">%</div>
      </div>
    </div> -->
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
  import { getAlertSummaryMonth } from "@/apis/alertSummary";

  const chartInstance = ref<echarts.ECharts | null>(null);

  // 定义设备类型颜色映射
  const deviceColors = {
    "烟感报警": {
      lineColor: '#ff6b81',
      areaColor: 'rgba(255, 107, 129, 0.3)',
      areaColor2: 'rgba(255, 107, 129, 0)'
    },
    "智能水节点": {
      lineColor: '#4facfe',
      areaColor: 'rgba(79, 172, 254, 0.3)',
      areaColor2: 'rgba(79, 172, 254, 0)'
    },
    "智能井盖": {
      lineColor: '#0acffe',
      areaColor: 'rgba(10, 207, 254, 0.3)',
      areaColor2: 'rgba(10, 207, 254, 0)'
    },
    "车辆道闸": {
      lineColor: '#deb887',
      areaColor: 'rgba(222, 184, 135, 0.3)',
      areaColor2: 'rgba(222, 184, 135, 0)'
    }
  };

  // 修改 option computed
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
        let result = `${params[0].axisValue}月<br/>`;
        params.forEach((param: any) => {
          result += `${param.seriesName}: ${param.value}次<br/>`;
        });
        return result;
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
      data: Object.keys(deviceData.value)
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
    series: Object.entries(deviceData.value).map(([name, data]) => ({
      name,
      type: "line",
      smooth: true,
      symbol: 'circle',
      symbolSize: 4,
      label: {
        show: true,
        position: 'top',
        fontSize: 8,
        color: '#fff',
        formatter: '{c}',
        distance: 5
      },
      lineStyle: {
        width: 1,
      },
      areaStyle: {
        opacity: 1,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: deviceColors[name].areaColor,
          },
          {
            offset: 1,
            color: deviceColors[name].areaColor2,
          },
        ]),
      },
      emphasis: {
        focus: "series",
        itemStyle: {
          borderWidth: 2,
          borderColor: '#fff'
        }
      },
      itemStyle: {
        color: deviceColors[name].lineColor,
      },
      data: data,
    })),
  }));

  // 修改数据处理逻辑
  const deviceData = ref<Record<string, number[]>>({});

  onMounted(async () => {
    const data = await getAlertSummaryMonth();
    
    // 处理每种设备类型的数据
    Object.entries(data).forEach(([deviceType, stats]) => {
      // 初始化12个月的数据
      const monthlyData = Array(12).fill(0);
      
      // 填充实际数据
      stats.forEach(stat => {
        monthlyData[stat.month - 1] = stat.total_count;
      });
      
      deviceData.value[deviceType] = monthlyData;
    });

    // 初始化图表
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

  const chartRef = ref();

  // 监听数据变化
  watch(
    () => deviceData.value,
    () => {
      chartInstance.value?.setOption(option.value);
    },
    { deep: true }
  );
</script>

<style scoped>
  .park_error {
    position: absolute;
    right: 20px;
    top: 84px;
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
    top: 30px;
    left: 0;
    width: 100%;
    height: 120px;
  }
</style>
