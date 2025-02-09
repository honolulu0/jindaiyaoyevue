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
  import { ref, onMounted, onUnmounted } from "vue";
  import * as echarts from "echarts";
  import TitleComponent from "./titleComponent.vue";
  import { getEnterpriseData, type Enterprise } from "@/apis/getEnterpriseData";

  const chartRef = ref();
  let myChart: echarts.ECharts;
  let timer: number;

  // 处理企业数据并计算占比
  const calculateProportions = (enterprises: Enterprise[]) => {
    const total = enterprises.length;
    const scaleCount = {
      SMALL: 0,    // 小微
      NORMAL: 0,   // 一般
      OTHER: 0     // 其他
    };

    enterprises.forEach(enterprise => {
      scaleCount[enterprise.scale]++;
    });

    return [
      { value: (scaleCount.SMALL / total * 100).toFixed(1), name: "小型" },
      { value: (scaleCount.NORMAL / total * 100).toFixed(1), name: "中型" },
      { value: (scaleCount.OTHER / total * 100).toFixed(1), name: "大型" }
    ];
  };

  const initChart = async () => {
    try {
      const enterprises = await getEnterpriseData();
      const proportionData = calculateProportions(enterprises);
      
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
          data: ["大型", "中型", "小型"],
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
            data: proportionData
          },
        ],
      };

      option && myChart.setOption(option);
    } catch (error) {
      console.error('获取企业数据失败:', error);
    }
  };

  onMounted(() => {
    myChart = echarts.init(chartRef.value, null, {
      renderer: "svg",
    });
    initChart();
    
    // 设置5分钟刷新
    timer = window.setInterval(initChart, 5 * 60 * 1000);

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
