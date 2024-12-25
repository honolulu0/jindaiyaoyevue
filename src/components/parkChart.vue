<template>
  <div class="park_chart">
    <title-component title-text="车位使用情况" />
    <div class="text-container">
      <div
        class="content_item"
        v-for="item in parkingStatus"
        :key="item.key"
      >
        <div
          class="content_item_img"
          :style="{ backgroundImage: `url(${item.img})` }"
        ></div>
        <div class="content_item_title_number">
          <div class="content_item_title">{{ item.title }}</div>
          <div class="content_item_number">{{ item.number + item.unit }}</div>
        </div>
      </div>
    </div>
    <div
      ref="chartRef"
      class="chart"
    ></div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from "vue";
  import titleComponent from "./titleComponent.vue";
  import * as echarts from "echarts";
  import { getParkingData } from "@/apis/getParkingData";

  const chartRef = ref();
  const chart = ref();
  const updateInterval = ref<number>();

  const baseUrl = import.meta.url.substring(
    0,
    import.meta.url.lastIndexOf("/")
  );

  const iconUrl = encodeURI(
    `${baseUrl}/../assets/parkFacilities/车位识别icon.png`
  );

  const parkingStatus = ref([
    {
      key: 1,
      title: "占用车位",
      img: iconUrl,
      number: 0,
      unit: "个",
    },
    {
      key: 2,
      title: "空闲车位",
      img: iconUrl,
      number: 0,
      unit: "个",
    },
    {
      key: 3,
      title: "故障车位",
      img: iconUrl,
      number: 0,
      unit: "个",
    },
  ]);

  // 更新图表数据
  const updateChartData = async () => {
    try {
      const parkData = await getParkingData();
      const total = parkData.占用车位 + parkData.空闲车位 + parkData.故障车位;
      const chartData = [
        {
          value: parkData.占用车位,
          name: "占用车位",
          percentage: ((parkData.占用车位 / total) * 100).toFixed(1),
        },
        {
          value: parkData.空闲车位,
          name: "空闲车位",
          percentage: ((parkData.空闲车位 / total) * 100).toFixed(1),
        },
        {
          value: parkData.故障车位,
          name: "故障车位",
          percentage: ((parkData.故障车位 / total) * 100).toFixed(1),
        },
      ];

      // 更新状态显示
      parkingStatus.value[0].number = parkData.占用车位;
      parkingStatus.value[1].number = parkData.空闲车位;
      parkingStatus.value[2].number = parkData.故障车位;

      chart.value?.setOption({
        series: [
          {
            data: chartData,
          },
        ],
      });
    } catch (error) {
      console.error("获取停车数据失败:", error);
    }
  };

  const initChart = () => {
    chart.value = echarts.init(chartRef.value, null, { renderer: "svg" });
    const option = {
      tooltip: {
        trigger: "item",
        textStyle: {
          fontFamily: "SourceHanSansSC-Normal",
          fontSize: 7,
          fontWeight: 400,
        },
      },
      legend: {
        orient: "vertical",
        right: "10%",
        top: "5%",
        textStyle: {
          fontFamily: "SourceHanSansSC-Normal",
          fontSize: 7,
          fontWeight: 400,
          color: "#FFFFFF",
          lineHeight: 10,
        },
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 10,
      },
      series: [
        {
          name: "车位状态",
          type: "pie",
          radius: ["40%", "90%"],
          center: ["40%", "50%"],
          startAngle: 180,
          endAngle: 0,
          avoidLabelOverlap: false,
          itemStyle: {
            borderColor: "rgba(255, 255, 255, 0.3)",
            borderWidth: 2,
          },
          label: {
            show: false,
            formatter: "{b}: {d}%",
            fontSize: 14,
            color: "#FFFFFF",
            position: "outer",
            distanceToLabelLine: 5,
          },
          labelLine: {
            show: true,
            length: 15,
            length2: 10,
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 10,
              fontWeight: 400,
              fontFamily: "SourceHanSansSC-Normal",
              color: "#FFFFFF",
              lineHeight: 10,
            },
          },
          data: [
            { value: 30, name: "占用车位" },
            { value: 70, name: "空闲车位" },
            { value: 0, name: "故障车位" },
          ],
        },
      ],
    };

    chart.value.setOption(option);
    updateChartData();
  };

  onMounted(() => {
    initChart();
    updateInterval.value = setInterval(() => {
      updateChartData();
    }, 30000);
  });

  onUnmounted(() => {
    if (updateInterval.value) {
      clearInterval(updateInterval.value);
    }
    chart.value?.dispose();
  });
</script>

<style scoped>
  .park_chart {
    width: 206px;
    height: 180px;
    position: absolute;
    right: 20px;
    bottom: 20px;
    overflow: visible;
  }

  .chart {
    position: absolute;
    left: -40px;
    width: 130%;
    height: calc(100% - 60px);
    margin-top: 0px;
  }

  .text-container {
    width: 100%;
    height: 40px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    gap: 4px;
  }

  .content_item {
    flex: 1;
    height: 36px;
    background-size: cover;
    background-image: url("@/assets/parkFacilities/智能设备背景icon.png");
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    align-items: center;
    justify-content: center;
  }

  .content_item_img {
    width: 18px;
    height: 18px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    align-self: center;
    justify-self: center;
  }

  .content_item_title {
    width: 40px;
    height: 12px;
    font-family: SourceHanSansSC-Normal;
    font-weight: 400;
    font-size: 8px;
    color: #e4f3ff;
    line-height: 12px;
    text-align: left;
    font-style: normal;
  }

  .content_item_number {
    width: max-content;
    height: 16px;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 12px;
    color: #00f8f4;
    line-height: 16px;
    text-align: left;
    font-style: normal;
  }
</style>
