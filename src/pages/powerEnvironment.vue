<template>
  <div class="w-full h-full absolute top-0 left-0 z-0">
    <DistributionBoxInfo
      :list="distributionBoxInfoList"
      v-show="isShow"
    />
    <DistributionBoxWarning
      :currentYearData="currentYearData"
      :lastYearData="lastYearData"
      v-show="isShow"
    />
    <!-- 电流 -->
    <DistributionBoxElectricityCount
      :chartData="electricityCountChartData"
      v-show="isShow"
    />

    <!-- 电压 -->
    <DistributionBoxVoltage
      :option="distributionBoxVoltageChartData"
      v-show="isShow"
    />

    <!-- 配电房统计 -->
    <DistributionBoxCount />

    <!-- 湿度饼 -->
    <DistributionBoxTempRing :data="tempData" />
    <!-- 温度线 -->
    <DistributionBoxTempLineChart :option="tempOption" />
    <PowerErrorAlert :deviceType="['2', '11']" />
  </div>
</template>

<script setup lang="ts">
  import DistributionBoxInfo from "@/components/distributionBoxInfo.vue";
  import DistributionBoxWarning from "@/components/distributionBoxWarning.vue";
  import DistributionBoxElectricityCount from "@/components/distributionBoxElectricityCount.vue";
  import DistributionBoxVoltage from "@/components/distributionBoxVoltage.vue";
  import DistributionBoxTempRing from "@/components/distributionBoxTempRing.vue";
  import DistributionBoxTempLineChart from "@/components/distributionBoxTempLineChart.vue";
  import PowerErrorAlert from "@/components/powerErrorAlert.vue";
  import DistributionBoxCount from "@/components/distributionBoxCount.vue";
  import { ref, onMounted, computed, onUnmounted } from "vue";
  import { getDistributionBoxData } from "@/apis/getDistributionBoxData";
  import { getAlertDistributionBoxSummary } from "@/apis/alertSummary";
  import { getTempData } from "@/apis/getTempData";
  const distributionBoxData = ref<any[]>([]);

  onMounted(async () => {
    const data = await getDistributionBoxData();
    const alertSummary = await getAlertDistributionBoxSummary();
    const tempRes = await getTempData();
    distributionBoxData.value = data;
    currentYearData.value = alertSummary.thisYear;
    lastYearData.value = alertSummary.lastYear;
    tempData.value = tempRes.map((item) => ({
      titleText: item.location.length > 7 ? item.location.slice(0, 5) + '...' : item.location,
      tempValue: item.meter_info["温度(℃)"],
      humValue: item.meter_info["湿度(%RH)"] ?? item.meter_info["湿度（%RH）"],
    }));
    tempOption.value.seriesData = tempRes.map((item) =>
      Number(item.meter_info["温度(℃)"])
    ).slice(0, 12);
    tempOption.value.xAxisData = tempRes.map((item) => item.location).slice(0, 12);
  });
  const electricityCountChartData = computed(() => {
    const data = distributionBoxData.value.map((item) => ({
      titleText: item["位置"].split("(")[0],
      value: Number(item["A相电流"]),
    }));
    return data;
  });

  const distributionBoxVoltageChartData = computed(() => {
    return {
      xAxisData: distributionBoxData.value
        .map((item) => item["位置"].split("(")[0])
        .slice(0, 12),
      seriesData: distributionBoxData.value.map((item) =>
        Number(item["A相电压"])
      ),
    };
  });

  const distributionBoxInfoList = computed(() => {
    return distributionBoxData.value.map((item, index) => ({
      row1: item["位置"],
      row2: item["A相电流"],
      row3: item["A相电压"],
    }));
  });

  const currentYearData = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const lastYearData = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  // 电流
  const chartData = ref([
    { titleText: "2#1AW1", value: 13 },
    { titleText: "2#1AW2", value: 22 },
    { titleText: "2#1AW3", value: 10 },
    { titleText: "2#1AW4", value: 63 },
    { titleText: "2#1AW5", value: 30 },
    { titleText: "2#1AW6", value: 30 },
    { titleText: "2#1AW7", value: 30 },
    { titleText: "2#1AW8", value: 30 },
    { titleText: "1#1AW1", value: 30 },
    { titleText: "1#1AW2", value: 30 },
    { titleText: "1#1AW3", value: 30 },
    { titleText: "1#1AW4", value: 30 },
    { titleText: "1#1AW5", value: 30 },
    { titleText: "1#1AW6", value: 30 },
    { titleText: "1#1AW7", value: 30 },
    { titleText: "1#1AW8", value: 30 },
    { titleText: "2#-1ALZ4", value: 30 },
    { titleText: "2#-1ALZ3", value: 30 },
    { titleText: "-1AB2", value: 30 },
    { titleText: "2#-1APZ2", value: 30 },
    { titleText: "2#-1AP2", value: 30 },
    { titleText: "2#-1AB2", value: 30 },
    { titleText: "1#-1AP2", value: 30 },
    { titleText: "1#1AB2", value: 30 },
    { titleText: "1#-1APZ1", value: 30 },
    { titleText: "1#-1APZ2", value: 30 },
    { titleText: "1#-1AZE1", value: 30 },
    { titleText: "1#-1ALE2", value: 30 },
    { titleText: "1#-1APZ2", value: 30 },
    { titleText: "-1AB2", value: 30 },
    { titleText: "-1AB1", value: 30 },
    { titleText: "1#-1ALZ4", value: 30 },
    { titleText: "1#-1ALZ3", value: 30 },
    { titleText: "1#-1ALZ2", value: 30 },
    { titleText: "1#-1ALZ1", value: 30 },
    { titleText: "-1AB1", value: 30 },
    { titleText: "2#-1APZ1", value: 30 },
    { titleText: "2#-1ALZ1", value: 30 },
    { titleText: "2#-1ALE1", value: 30 },
    { titleText: "-1ALG1", value: 30 },
    { titleText: "2#-1ALZ2", value: 30 },
    { titleText: "apxf", value: 30 },
    { titleText: "ALZ2", value: 30 },
    { titleText: "ALZ1", value: 30 },
    { titleText: "APCD", value: 30 },
    { titleText: "-1ALE", value: 270 },
  ]);
  const tempOption = ref<{
    xAxisData: string[];
    seriesData: number[];
  }>({
    xAxisData: [],
    seriesData: [],
  });
  const tempData = ref<
    { titleText: string; tempValue: string; humValue: string }[]
  >([]);

  const isShow = ref(true);

  // 设置定时器,每30秒更新一次数据
  const interval = setInterval(async () => {
    distributionBoxData.value = await getDistributionBoxData();
    const tempRes = await getTempData();
    tempData.value = tempRes.map((item) => ({
      titleText: item.location.length > 7 ? item.location.slice(0, 7) + '...' : item.location,
      tempValue: item.meter_info["温度(℃)"],
      humValue: item.meter_info["湿度(%RH)"] ?? item.meter_info["湿度（%RH）"],
    }));
    tempOption.value.seriesData = tempRes.map((item) =>
      Number(item.meter_info["温度(℃)"])
    ).slice(0, 12);
    tempOption.value.xAxisData = tempRes.map((item) => item.location).slice(0, 12);
  }, 30000);

  onUnmounted(() => {
    clearInterval(interval);
  });
</script>

<style scoped></style>
