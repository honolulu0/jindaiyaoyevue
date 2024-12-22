<template>
  <div class="distributionBoxElectricityCountChart">
    <div
      class="distributionBoxElectricityCountChart_chart"
      ref="chartRef"
    ></div>
    <div class="distributionBoxElectricityCountChart_title">
      <div class="distributionBoxElectricityCountChart_title_bg">
        {{ titleText }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch, computed } from "vue";
  import * as echarts from "echarts";

  const props = defineProps<{
    titleText: string;
    value: number;
  }>();

  const chartRef = ref();

  const valueData = computed(() => {
    const value = props.value;
    if (value <= 60) {
      return [
        {
          value: value,
          itemStyle: {
            color: "#5470c6",
          },
        },
      ];
    }
    if (value <= 120) {
      return [
        {
          value: 60,
          itemStyle: {
            color: "#5470c6",
          },
        },
        {
          value,
          itemStyle: {
            color: "#fac858",
          },
        },
      ];
    }
    return [
      {
        value: 60,
        itemStyle: {
          color: "#5470c6",
        },
      },
      {
        value: 120,
        itemStyle: {
          color: "#fac858",
        },
      },
      {
        value,
        itemStyle: {
          color: "#ee6666",
        },
      },
    ];
  });

  // 根据数值获取指针颜色
  const getPointerColor = (value: number) => {
    if (value <= 60) return "#5470c6";
    if (value <= 120) return "#fac858";
    return "#ee6666";
  };

  const initChart = () => {
    const chart = echarts.init(chartRef.value, null, {
      renderer: "svg",
    });

    const option = {
      series: [
        {
          type: "gauge",
          center: ["50%", "73%"],
          radius: "140%",
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 300,
          splitNumber: 10,
          axisLine: {
            roundCap: true,
            lineStyle: {
              width: 2,
              opacity: 0.2,
              color: [
                [1, "#5470c6"], // 蓝色 0-60
              ],
            },
          },
          pointer: {
            show: false,
            length: "60%",
            width: 2,
            itemStyle: {
              color: getPointerColor(props.value),
            },
          },
          progress: {
            show: true,
            overlap: true,
            length: 1,
            width: 2,
            distance: 17,
            // itemStyle: {
            //   color: [
            //     [0.2, "#5470c6"], // 蓝色 0-60
            //     [0.4, "#fac858"], // 黄色 61-120
            //     [1, "#ee6666"], // 红色 121-300
            //   ],
            // },
          },
          axisTick: {
            show: false,
            length: 10,
            distance: 0,
            interval: 30,
          },
          splitLine: {
            show: false,
            length: 0,
            distance: 17,
            lineStyle: {
              width: 1,
            },
          },
          axisLabel: {
            color: "#E4F3FF",
            fontSize: 3,
            distance: -12,
            fontFamily: "SourceHanSansSC-Normal",
            fontWeight: 100,
            lineHeight: 1,
            fontStyle: "normal",
          },
          detail: {
            show: false,
          },
          data: valueData.value,
        },
        {
          type: "gauge",
          center: ["50%", "73%"],
          radius: "140%",
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 300,
          splitNumber: 10,
          axisLine: {
            show: false,
          },
          pointer: {
            icon: "path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z",
            show: true,
            length: "50%",
            width: 2,
            itemStyle: {
              color: getPointerColor(props.value),
            },
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 3,
            itemStyle: {
              color: "#FAC858",
            },
          },
          progress: {
            show: false,
            // itemStyle: {
            //   color: [
            //     [0.2, "#5470c6"], // 蓝色 0-60
            //     [0.4, "#fac858"], // 黄色 61-120
            //     [1, "#ee6666"], // 红色 121-300
            //   ],
            // },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          detail: {
            show: false,
          },
          data: [props.value],
        },
      ],
    };

    chart.setOption(option);

    // 监听数值变化，更新图表
    watch(
      () => props.value,
      (newVal) => {
        chart.setOption({
          series: [
            {
              data: [],
            },
            {
              data: [],
              pointer: {
                itemStyle: {
                  color: getPointerColor(newVal),
                },
              },
            },
          ],
        });
        chart.setOption({
          series: [
            {
              data: valueData.value,
            },
            {
              data: [{ value: newVal }],
              pointer: {
                itemStyle: {
                  color: getPointerColor(newVal),
                },
              },
            },
          ],
        });
      }
    );

    // 监听窗口变化，图表自适应
    window.addEventListener("resize", () => {
      chart.resize();
    });

    return chart;
  };

  let chart: echarts.ECharts;

  onMounted(() => {
    chart = initChart();
  });

  // 监听数值变化，更新图表
  watch(
    () => props.value,
    (newVal) => {
      if (chart) {
        chart.setOption({
          series: [
            {
              data: [
                {
                  value: newVal,
                },
              ],
              pointer: {
                itemStyle: {
                  color: getPointerColor(newVal),
                },
              },
            },
          ],
        });
      }
    }
  );
</script>

<style scoped>
  .distributionBoxElectricityCountChart {
    width: 52px;
    height: 53px;
  }
  .distributionBoxElectricityCountChart_chart {
    width: 52px;
    height: 37px;
  }
  .distributionBoxElectricityCountChart_title {
    font-size: 12px;
    font-weight: 400;
    height: 15px;
    color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: end;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 5px;
    color: #e4f3ff;
    line-height: 7px;
    text-align: right;
    font-style: normal;
  }
  .distributionBoxElectricityCountChart_title_bg {
    width: 43px;
    height: 9px;
    background: linear-gradient(90deg, #4171a9 0%, #456182 50%, #497bb5 100%);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
