<template>
  <div class="enterprise-proportion">
    <TitleComponent titleText="园区企业占比" />
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
  import { getEnterpriseData, Enterprise } from "../apis/getEnterpriseData";

  const chartRef = ref();
  let myChart: echarts.ECharts;
  let timer: number;

  // 处理企业数据并计算各类型占比
  const calculateProportions = (enterprises: Enterprise[]) => {
    const typeCount = {
      TECHNOLOGY: 0,
      FINANCE: 0,
      INDUSTRY: 0,
      SERVICE: 0,
      OTHER: 0
    };

    enterprises.forEach(enterprise => {
      typeCount[enterprise.type]++;
    });

    const total = enterprises.length;
    return [
      { value: (typeCount.TECHNOLOGY / total * 100).toFixed(1), name: "科技类", itemStyle: { color: "#5FD4D1" } },
      { value: (typeCount.FINANCE / total * 100).toFixed(1), name: "金融类", itemStyle: { color: "#F6C95C" } },
      { value: (typeCount.INDUSTRY / total * 100).toFixed(1), name: "实业类", itemStyle: { color: "#4B7BE9" } },
      { value: (typeCount.SERVICE / total * 100).toFixed(1), name: "服务类", itemStyle: { color: "#9D84F6" } },
      { value: (typeCount.OTHER / total * 100).toFixed(1), name: "其他", itemStyle: { color: "#FFFFFF" } },
    ];
  };

  // 更新图表数据
  const updateChart = async () => {
    try {
      const enterprises = await getEnterpriseData();
      const proportions = calculateProportions(enterprises);
      
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
          data: ["科技类", "金融类", "实业类", "服务类", "其他"],
        },
        title: {
          text: '企业\n类型占比',
          left: '33%',
          top: '30%',
          textAlign: 'center',
          textStyle: {
            color: '#fff',
            fontSize: 8,
            fontFamily: 'SourceHanSansSC-Normal',
            lineHeight: 16
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['58.5%', '59.8%'],
            center: ['35%', '50%'],
            silent: true,
            label: {
              show: false
            },
            data: [{
              value: 100,
              itemStyle: {
                color: '#66A89F'
              }
            }]
          },
          {
            type: 'pie',
            radius: ['65%', '91%'],
            center: ['35%', '50%'],
            silent: true,
            label: {
              show: false
            },
            data: [{
              value: 100,
              itemStyle: {
                color: 'rgba(255,255,255,0.2)'
              }
            }]
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
            data: proportions,
          },
        ],
      };
      
      myChart.setOption(option);
    } catch (error) {
      console.error('获取企业数据失败:', error);
    }
  };

  onMounted(() => {
    myChart = echarts.init(chartRef.value);
    updateChart(); // 初始加载数据

    // 设置5分钟定时刷新
    timer = window.setInterval(updateChart, 5 * 60 * 1000);

    window.addEventListener("resize", () => {
      myChart.resize();
    });
  });

  onUnmounted(() => {
    // 清除定时器
    if (timer) {
      clearInterval(timer);
    }
    // 销毁图表实例
    if (myChart) {
      myChart.dispose();
    }
  });
</script>

<style scoped>
  .enterprise-proportion {
    width: 206px;
    height: 129px;
    position: absolute;
    top: 261px;
    left: 53px;
  }

  .chart-container {
    margin-top: 5px;
    position: absolute;
    left: -30px;
    width: calc(100% + 30px);
    height: calc(100% - 20px);
  }
</style>
