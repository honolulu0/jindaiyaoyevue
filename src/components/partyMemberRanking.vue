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
  import { getTop5PartyData } from "@/apis/getTop5PartyData";

  const chartRef = ref();
  let chart: echarts.ECharts | null = null;

  // 使用reactive创建响应式数据
  const rankingData = reactive<{
    companies: string[];
    memberCounts: number[];
  }>({
    companies: [],
    memberCounts: [],
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
      const res = await getTop5PartyData();
      rankingData.companies = res.map((item) => item.name);
      rankingData.memberCounts = res.map((item) => item.partyMembers.length);
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
    chart = echarts.init(chartRef.value, null, {
      renderer: "svg",
    });
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
