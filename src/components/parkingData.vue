<template>
  <div class="enterprise-proportion">
    <TitleComponent titleText="车位监控数据" />
    <div
      ref="chartRef"
      class="chart-container"
    ></div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from "vue";
  import * as echarts from "echarts";
  import TitleComponent from "./titleComponent.vue";
  import { getParkingData } from "@/apis/getParkingData";
  const chartRef = ref();
  let myChart: echarts.ECharts;
  let timer: NodeJS.Timeout;

  const updateChartData = async () => {
    try {
      const parkingData = await getParkingData();
      const total = parkingData["总车位数"];
      const occupied = (parkingData["占用车位"] / total) * 100;
      const free = (parkingData["空闲车位"] / total) * 100;
      const fault = (parkingData["故障车位"] / total) * 100;

      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}%",
        },
        legend: {
          orient: "vertical",
          right: "5%",
          top: "center",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: "#fff",
            fontSize: 7,
            fontFamily: "SourceHanSansSC-Normal",
          },
          data: ["占用车位", "空闲车位", "故障车位"],
        },
        title: {
          text: parkingData["空闲车位"] + "\n" + "空闲车位",
          left: "33%",
          top: "30%",
          textAlign: "center",
          textStyle: {
            color: "#fff",
            fontSize: 8,
            fontFamily: "SourceHanSansSC-Normal",
            lineHeight: 16,
          },
        },
        series: [
          {
            type: "pie",
            radius: ["58.5%", "59.8%"],
            center: ["35%", "50%"],
            silent: true,
            label: {
              show: false,
            },
            data: [
              {
                value: 100,
                itemStyle: {
                  color: "#66A89F",
                },
              },
            ],
          },
          {
            type: "pie",
            radius: ["65%", "91%"],
            center: ["35%", "50%"],
            silent: true,
            label: {
              show: false,
            },
            data: [
              {
                value: 100,
                itemStyle: {
                  color: "rgba(255,255,255,0.2)",
                },
              },
            ],
          },
          {
            type: "pie",
            radius: ["36%", "52%"],
            center: ["35%", "50%"],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: "outside",
              formatter: "{c}%",
              color: "#fff",
              fontSize: 9,
              fontFamily: "YouSheBiaoTiHei",
            },
            labelLine: {
              show: true,
              length: 15,
              length2: 15,
              lineStyle: {
                color: "#fff",
              },
            },
            data: [
              {
                value: occupied.toFixed(1),
                name: "占用车位",
                itemStyle: { color: "#5FD4D1" },
              },
              {
                value: free.toFixed(1),
                name: "空闲车位",
                itemStyle: { color: "#F6C95C" },
              },
              {
                value: fault.toFixed(1),
                name: "故障车位",
                itemStyle: { color: "#FF6B6B" },
              },
            ],
          },
        ],
      };

      myChart.setOption(option);
    } catch (error) {
      console.error("获取停车数据失败:", error);
    }
  };

  onMounted(async () => {
    myChart = echarts.init(chartRef.value, undefined, { renderer: "svg" });
    await updateChartData();

    // 每30秒更新一次数据
    timer = setInterval(updateChartData, 30000);

    window.addEventListener("resize", () => {
      myChart.resize();
    });
  });

  onUnmounted(() => {
    // 清除定时器
    if (timer) {
      clearInterval(timer);
    }
  });
</script>

<style scoped>
  .enterprise-proportion {
    width: 206px;
    height: 129px;
    position: absolute;
    top: 200px;
    right: 20px;
  }

  .chart-container {
    margin-top: 5px;
    position: absolute;
    left: -30px;
    width: calc(100% + 30px);
    height: calc(100% - 20px);
  }
</style>
