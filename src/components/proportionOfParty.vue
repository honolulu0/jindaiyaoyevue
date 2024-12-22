<template>
  <div class="proportion_of_party">
    <PartyTitle titleText="园区企业党员占比" />
    <div class="proportion_of_party_content" ref="chartRef"></div>
  </div>
</template>

<script setup lang="ts">
import PartyTitle from "@/components/partyTitle.vue";
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import { getTop5PartyData } from '@/apis/getTop5PartyData';
import { getPartyBuildingData } from '@/apis/getPartyBuildingData';

const chartRef = ref();

onMounted(async () => {
  // 获取数据
  const [partyData, buildingData] = await Promise.all([
    getTop5PartyData(),
    getPartyBuildingData()
  ]);

  const chart = echarts.init(chartRef.value, null, {
    renderer: "svg",
  });

  const option = {
    legend: {
      data: [`${new Date().getFullYear()}年`],
      right: 0,
      top: 0,
      icon: 'rect',
      textStyle: {
        color: '#FFFFFF',
        fontSize: 6,
        fontFamily: 'SourceHanSansCN, SourceHanSansCN',
        fontWeight: 400
      },
      itemWidth: 10,
      itemHeight: 6,
      itemStyle: {
        color: '#FFC700'
      }
    },
    grid: {
      top: 30,
      bottom: 50,
      left: 30
    },
    xAxis: {
      type: 'category',
      data: partyData.map(item => item.name),
      axisLabel: {
        fontSize: 6,
        fontFamily: 'SourceHanSansCN, SourceHanSansCN',
        fontWeight: 400,
        color: '#FFFFFF',
        lineHeight: 9,
        fontStyle: 'normal',
        interval: 0,
        rotate: 0,
        margin: 15,
        formatter: function (value) {
          // 每行最多显示4个字
          const maxCharsPerLine = 4;
          if (value.length <= maxCharsPerLine) {
            return value;
          } else if (value.length <= maxCharsPerLine * 2) {
            return value.slice(0, maxCharsPerLine) + '\n' + value.slice(maxCharsPerLine);
          } else {
            return value.slice(0, maxCharsPerLine) + '\n' + value.slice(maxCharsPerLine, maxCharsPerLine * 2) + '...';
          }
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      name: '单位：%',
      nameTextStyle: {
        fontSize: 6,
        fontFamily: 'SourceHanSansCN, SourceHanSansCN',
        fontWeight: 400,
        color: '#FFFFFF',
        align: 'right',
        padding: [0, 0, 0, -20]
      },
      max: 80,
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: 'rgba(255,255,255,0.2)'
        }
      },
      axisLabel: {
        fontSize: 6,
        fontFamily: 'SourceHanSansCN, SourceHanSansCN',
        fontWeight: 400,
        color: '#FFFFFF',
        lineHeight: 9,
        fontStyle: 'normal'
      }
    },
    series: [{
      name: `${new Date().getFullYear()}年`,
      type: 'pictorialBar',
      symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
      data: partyData.map(item => {
        const percentage = ((item.partyMembers?.length || 0) / buildingData.totalMember * 100).toFixed(2);
        return Number(percentage);
      }),
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: '#FFC700'
          }, {
            offset: 1,
            color: 'rgba(227, 120, 50, 0.3)'
          }],
        }
      },
      barWidth: '90%',
      symbolSize: ['100%', '100%'],
      symbolOffset: [0, 0]
    }]
  };

  chart.setOption(option);
});
</script>

<style scoped>
  .proportion_of_party {
    position: absolute;
    bottom: 48px;
    right: 53px;
    width: 206px;
    height: 132px;
  }

  .proportion_of_party_content {
    position: absolute;
    top: 33px;
    margin-top: 5px;
    height: 136px;
    width: 100%;
  }
</style>
