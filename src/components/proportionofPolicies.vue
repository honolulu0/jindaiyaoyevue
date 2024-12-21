<template>
  <div class="proportion_of_policies">
    <TitleComponent titleText="政策占比" />
    <div class="proportion_of_policies_content_container">
      <div class="proportion_of_policies_content chart_1">
        <div
          style="width: 50px; height: 50px"
          ref="chartRef1"
        ></div>
        <div class="text">市级政策</div>
      </div>
      <div class="proportion_of_policies_content chart_2">
        <div
          style="width: 50px; height: 50px"
          ref="chartRef2"
        ></div>
        <div class="text">省级政策</div>
      </div>
      <div class="proportion_of_policies_content chart_3">
        <div
          style="width: 50px; height: 50px"
          ref="chartRef3"
        ></div>
        <div class="text">其他政策</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TitleComponent from "@/components/titleComponent.vue";
  import { onMounted, ref } from "vue";
  import * as echarts from "echarts";
  import { getPolicy } from "@/apis/getPolicy";

  const chartRef1 = ref();
  const chartRef2 = ref();
  const chartRef3 = ref();

  onMounted(async () => {
    try {
      // 获取政策数据
      const policyData = await getPolicy();
    

      // 确保total不为0
      const total = policyData.total || 1; // 如果total为0，使用1作为默认值
      
      // 确保各项数据存在且为数字
      const cityPercentage = Math.round(((policyData.city?.total || 0) / total) * 100);
      const provincePercentage = Math.round(((policyData.province?.total || 0) / total) * 100);
      const otherPercentage = Math.round(((policyData.other?.total || 0) / total) * 100);

      // 添加日志来检查百分比计算结果
      console.log('百分比:', {
        cityPercentage,
        provincePercentage,
        otherPercentage
      });

      const chart1 = echarts.init(chartRef1.value);
      const chart2 = echarts.init(chartRef2.value);
      const chart3 = echarts.init(chartRef3.value);

      const option1 = {
        series: [
          {
            type: "gauge",
            radius: "65%", // 内层圆环
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false,
            },
            progress: {
              show: true,
              overlap: false,
              // roundCap: true,
              clip: false,
              itemStyle: {
                color: "#F8D075",
              },
            },
            axisLine: {
              lineStyle: {
                width: 5,
                color: [[1, "#1D2F55"]],
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            data: [
              {
                value: cityPercentage,
                name: "",
                detail: {
                  offsetCenter: ["0%", "0%"],
                },
              },
            ],
            detail: {
              width: 50,
              height: 14,
              fontSize: 11,
              color: "#FFFFFF",
              formatter: "{value}%",
              fontFamily: "YouSheBiaoTiHei",
              fontWeight: "normal",
              lineHeight: 15,
              textAlign: "left",
              fontStyle: "normal",
            },
          },
          {
            // 外层装饰环
            type: "gauge",
            radius: "75%",
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                width: 1,
                color: [[1, "rgba(255, 255, 255, 0.7)"]], // 半透明白色
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 0,
              },
            ],
          },
          {
            // 外层装饰环
            type: "gauge",
            radius: "100%",
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                width: 5,
                color: [[1, "rgba(255, 255, 255, 0.2)"]], // 半透明白色
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 0,
              },
            ],
          },
        ],
      };
      const option2 = {
        series: [
          {
            ...option1.series[0],
            data: [
              {
                value: provincePercentage,
                name: "",
                detail: {
                  offsetCenter: ["0%", "0%"],
                },
              },
            ],
            progress: {
              show: true,
              overlap: false,
              // roundCap: true,
              clip: false,
              itemStyle: {
                color: "#00FFFF",
              },
            },
          },
          option1.series[1],
          option1.series[2],
        ],
      };
      const option3 = {
        series: [
          {
            ...option1.series[0],
            data: [
              {
                value: otherPercentage,
                name: "",
                detail: {
                  offsetCenter: ["0%", "0%"],
                },
              },
            ],
            progress: {
              show: true,
              overlap: false,
              // roundCap: true,
              clip: false,
              itemStyle: {
                color: "#75A6F8",
              },
            },
          },
          option1.series[1],
          option1.series[2],
        ],
      };

      chart1.setOption(option1);
      chart2.setOption(option2);
      chart3.setOption(option3);

      // 监听窗口大小变化，重绘图表
      window.addEventListener("resize", () => {
        chart1.resize();
        chart2.resize();
        chart3.resize();
      });
    } catch (error) {
      console.error('获取或处理数据时出错:', error);
    }
  });
</script>

<style scoped>
  .proportion_of_policies {
    position: absolute;
    left: 53px;
    top: 246px;
    width: 206px;
    height: 130px;
  }
  .proportion_of_policies_content_container {
  }
  .proportion_of_policies_content {
    width: 50px;
    height: 68px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .chart_1 {
    position: absolute;
    left: 0;
    top: 61px;
  }

  .chart_2 {
    position: absolute;
    left: 79px;
    top: 33px;
  }

  .chart_3 {
    position: absolute;
    right: 0;
    top: 61px;
  }

  .text {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 8px;
    color: #e4f3ff;
    line-height: 12px;
    text-align: right;
    font-style: normal;
  }
</style>
