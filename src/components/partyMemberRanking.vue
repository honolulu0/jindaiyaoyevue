<template>
  <div class="party-member-ranking">
    <PartyTitle titleText="园区企业党员排名" />
    <div
      class="party-member-ranking-content"
      ref="chartRef"
    ></div>
  </div>
</template>

<script setup lang="ts">
  import PartyTitle from "./partyTitle.vue";
  import { onMounted, ref, reactive, computed } from "vue";
  import * as echarts from "echarts";

  const chartRef = ref();
  let chart: echarts.ECharts | null = null;

  // 使用reactive创建响应式数据
  const rankingData = reactive({
    companies: [
      "比亚迪汽车",
      "啊吧汽车",
      "郑州信息科技有限公司",
      "郑州金岱圈方物业管理有限公司",
      "郑州金岱圈方物业管理有限公司",
    ],
    memberCounts: [123, 112, 89, 69, 69],
  });

  // 添加计算属性
  const chartData = computed(() => {
    const actualData = rankingData.memberCounts;
    const maxValue = Math.max(...actualData) + 30;
    const backgroundData = new Array(actualData.length).fill(maxValue);

    return {
      actualData,
      maxValue,
      backgroundData,
    };
  });

  // 模拟获取数据的方法
  const fetchRankingData = async () => {
    try {
      // 这里后续替换为实际的API调用
      // const response = await api.getRankingData();
      // rankingData.companies = response.companies;
      // rankingData.memberCounts = response.memberCounts;

      // 数据更新后重新渲染图表
      updateChart();
    } catch (error) {
      console.error("获取排名数据失败:", error);
    }
  };

  const updateChart = () => {
    if (!chart) return;

    const option = {
      grid: {
        left: "5%",
        right: "-10%",
        top: "5%",
        bottom: "0%",
        // containLabel: true,
      },
      xAxis: {
        type: "value",
        show: false,
      },
      yAxis: {
        type: "category",
        inverse: true,
        show: false,
        data: rankingData.companies,
      },
      series: [
        {
          type: "bar",
          data: chartData.value.backgroundData,
          barWidth: 4,
          itemStyle: {
            color: "rgba(255, 255, 255, 0.1)",
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 1,
          },
          z: 1,
        },
        {
          type: "bar",
          data: chartData.value.actualData,
          barWidth: 4,
          barGap: "-100%",
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: "#FF8B3D" },
              { offset: 1, color: "#FFD66C" },
            ]),
          },
          z: 2,
          label: {
            show: true,
            position: ["0%", "-100+%"],
            formatter: function (params: any) {
              const index = params.dataIndex;
              return [
                "{nameText|TOP " + (index + 1) + "  " + params.name + "}",
                "{valueText|" + params.value + "人}",
              ].join("");
            },
            rich: {
              nameText: {
                color: "#fff",
                fontSize: 8,
                fontFamily: "SourceHanSansSC-Normal",
                fontWeight: 600,
                padding: [0, -10, 0, 0],
                width: 160, // 根据实际需要调整宽度
                align: "left",
              },
              valueText: {
                color: "#fff",
                fontSize: 7,
                fontFamily: "SourceHanSansSC-Normal",
                fontWeight: 600,
                padding: [0, 0, 0, 0],
                width: 40, // 根据实际需要调整宽度
                align: "right",
              },
            },
            color: "#fff",
            fontSize: 6,
            fontFamily: "SourceHanSansSC-Normal",
            fontWeight: 600,
            lineHeight: 10,
            align: "left",
            verticalAlign: "bottom",
            fontStyle: "normal",
          },
        },
      ],
    };

    chart.setOption(option);
  };

  const initChart = () => {
    chart = echarts.init(chartRef.value);
    updateChart();

    window.addEventListener("resize", () => {
      chart?.resize();
    });
  };

  onMounted(() => {
    initChart();
    // 初始化时获取数据
    fetchRankingData();
  });
</script>

<style scoped>
  .party-member-ranking {
    width: 206px;
    height: 159px;
    position: absolute;
    top: 398px;
    left: 53px;
  }

  .party-member-ranking-content {
    margin-top: 13px;
    width: 100%;
    height: calc(100% - 40px);
  }
</style>
