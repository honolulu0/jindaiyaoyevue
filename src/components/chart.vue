<template>
  <div
    ref="chartRef"
    class="w-full h-full"
  ></div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, reactive, watch } from "vue";
  import * as echarts from "echarts";
  import type { EChartsOption } from "echarts";
  import { v4 as uuidv4 } from "uuid";

  const chartRef = ref<HTMLElement>();
  let myChart: echarts.ECharts;

  const props = defineProps<{
    data: {
      xAxisData: string[];
      seriesData: number[];
    };
    width: number;
    color: string;
    offset: number;
  }>();

  const chartData = reactive(props.data);

  // 定义左侧面
  const leftShape = echarts.graphic.extendShape({
    buildPath(ctx: any, shape: any) {
      const { topBasicsYAxis, bottomYAxis, basicsXAxis } = shape;
      const WIDTH = props.width / 2;
      const OBLIQUE_ANGLE_HEIGHT = 3;

      const p1 = [basicsXAxis - WIDTH, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT];
      const p2 = [basicsXAxis - WIDTH, bottomYAxis];
      const p3 = [basicsXAxis, bottomYAxis];
      const p4 = [basicsXAxis, topBasicsYAxis];

      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
      ctx.lineTo(p3[0], p3[1]);
      ctx.lineTo(p4[0], p4[1]);
      ctx.closePath();
    },
  });

  // 定义右侧面
  const rightShape = echarts.graphic.extendShape({
    buildPath(ctx: any, shape: any) {
      const { topBasicsYAxis, bottomYAxis, basicsXAxis } = shape;
      const WIDTH = props.width / 2;
      const OBLIQUE_ANGLE_HEIGHT = 3;

      const p1 = [basicsXAxis, topBasicsYAxis];
      const p2 = [basicsXAxis, bottomYAxis];
      const p3 = [basicsXAxis + WIDTH, bottomYAxis];
      const p4 = [basicsXAxis + WIDTH, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT];

      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
      ctx.lineTo(p3[0], p3[1]);
      ctx.lineTo(p4[0], p4[1]);
      ctx.closePath();
    },
  });

  // 定义顶面
  const topShape = echarts.graphic.extendShape({
    buildPath(ctx: any, shape: any) {
      const { topBasicsYAxis, basicsXAxis } = shape;
      const WIDTH = props.width / 2;
      const OBLIQUE_ANGLE_HEIGHT = 3;

      const p1 = [basicsXAxis, topBasicsYAxis];
      const p2 = [basicsXAxis + WIDTH, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT];
      const p3 = [basicsXAxis, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT * 2];
      const p4 = [basicsXAxis - WIDTH, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT];

      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
      ctx.lineTo(p3[0], p3[1]);
      ctx.lineTo(p4[0], p4[1]);
      ctx.closePath();
    },
  });

  // 注册图形
  const uuid = uuidv4();
  echarts.graphic.registerShape("leftShape" + uuid, leftShape);
  echarts.graphic.registerShape("rightShape" + uuid, rightShape);
  echarts.graphic.registerShape("topShape" + uuid, topShape);

  function getDarkerColor(color: string, darkenAmount: number = 35) {
    // 假设 color 格式为 "r,g,b"
    const rgb = color.split(',').map(Number);
    const darkerRgb = rgb.map(c => Math.max(0, c - darkenAmount)).join(',');
    return darkerRgb;
  }

  function renderItem(params: any, api: any) {
    const basicsCoord = api.coord([api.value(0), api.value(1)]);
    const topBasicsYAxis = basicsCoord[1];
    const basicsXAxis = basicsCoord[0];
    const bottomYAxis = api.coord([api.value(0), 0])[1];

    return {
      type: "group",
      children: [
        {
          type: "leftShape" + uuid,
          shape: { topBasicsYAxis, basicsXAxis, bottomYAxis },
          style: {
            ...api.style(),
            fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: `rgba(${props.color}, 1)` },
              { offset: 1, color: `rgba(${props.color}, 0)` },
            ]),
            stroke: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: `rgba(${getDarkerColor(props.color)}, 0.3)` },
              { offset: 1, color: `rgba(${getDarkerColor(props.color)}, 0)` },
            ]),
            lineWidth: 1
          },
        },
        {
          type: "rightShape" + uuid,
          shape: { topBasicsYAxis, basicsXAxis, bottomYAxis },
          style: {
            ...api.style(),
            fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: `rgba(${props.color}, 1)` },
              { offset: 1, color: `rgba(${props.color}, 0)` },
            ]),
            stroke: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: `rgba(${getDarkerColor(props.color)}, 0.3)` },
              { offset: 1, color: `rgba(${getDarkerColor(props.color)}, 0)` },
            ]),
            lineWidth: 1
          },
        },
        {
          type: "topShape" + uuid,
          shape: { topBasicsYAxis, basicsXAxis, bottomYAxis },
          style: {
            ...api.style(),
            fill: `rgba(${props.color}, 1)`,
            stroke: `rgba(${getDarkerColor(props.color)}, 0.3)`,
            lineWidth: 1
          },
        },
      ],
    };
  }

  // 封装初始化图表的方法
  const initChart = () => {
    const dataIndexMap = new Map<number, boolean>();

    const option: EChartsOption = {
      tooltip: {
        trigger: "axis",
      },
      grid: {
        top: "20%",
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: chartData.xAxisData,
        axisLine: {
          lineStyle: { color: "rgba(255,255,255,1)" },
        },
        axisLabel: {
          fontFamily: "DINPro, DINPro",
          fontWeight: "bold",
          fontSize: 5,
          color: "#FFFFFF",
          lineHeight: 7,
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        name: "单位：个",
        nameTextStyle: {
          fontFamily: "DINPro, DINPro",
          fontWeight: "bold",
          fontSize: 5,
          color: "#FFFFFF",
          lineHeight: 7,
          align: "right",
          verticalAlign: "top",
        },
        max: 50,
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "rgba(255,255,255,0.2)",
          },
        },
        axisLabel: {
          fontFamily: "DINPro, DINPro",
          fontWeight: "bold",
          fontSize: 5,
          color: "#FFFFFF",
          lineHeight: 7,
          letterSpacing: 0,
        },
      },
      series: [
        {
          type: "custom",
          renderItem: renderItem,
          data: chartData.seriesData,
          label: {
            show: true,
            position: "top",
            offset: [props.offset, -props.offset],
            color: `rgba(${props.color}, 1)`,
            fontFamily: "DINPro, DINPro",
            fontWeight: "bold",
            fontSize: 5,
            lineHeight: 7,
            formatter: (params: any) => {
              if (dataIndexMap.get(params.dataIndex)) {
                return "";
              }
              dataIndexMap.set(params.dataIndex, true);
              return params.data;
            },
          },
        },
      ],
    };

    option && myChart.setOption(option);
  };

  // 监听数据变化
  watch(
    chartData,
    () => {
      if (myChart) {
        initChart();
      }
    },
    { deep: true }
  );

  onMounted(() => {
    myChart = echarts.init(chartRef.value as HTMLElement);
    initChart();

    window.addEventListener("resize", () => {
      myChart.resize();
    });
  });
</script>
