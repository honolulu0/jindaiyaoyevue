<template>
  <div class="enterprise-proportion">
    <TitleComponent titleText="园区规模占比" />
    <div
      ref="chartRef"
      class="chart-container"
    ></div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import * as echarts from "echarts";
  import TitleComponent from "./titleComponent.vue";

  const chartRef = ref();
  let myChart: echarts.ECharts;

  const initChart = () => {
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
        data: ["大型", "中型", "小微", "一般纳税", "其他"],
      },
      title: {
        text: "企业\n规模占比",
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
            { value: 30, name: "大型", itemStyle: { color: "#5FD4D1" } },
            { value: 30, name: "中型", itemStyle: { color: "#F6C95C" } },
            { value: 20, name: "小微", itemStyle: { color: "#4B7BE9" } },
            { value: 10, name: "一般纳税", itemStyle: { color: "#9D84F6" } },
            { value: 10, name: "其他", itemStyle: { color: "#FFFFFF" } },
          ],
        },
      ],
    };

    option && myChart.setOption(option);
  };

  onMounted(() => {
    myChart = echarts.init(chartRef.value);
    initChart();

    window.addEventListener("resize", () => {
      myChart.resize();
    });
  });
</script>

<style scoped>
  .enterprise-proportion {
    width: 206px;
    height: 129px;
    position: absolute;
    top: 261px;
    right: 53px;
  }

  .chart-container {
    margin-top: 5px;
    position: absolute;
    left: -30px;
    width: calc(100% + 30px);
    height: calc(100% - 20px);
  }
</style>
