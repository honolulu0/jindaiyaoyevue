<template>
  <div class="w-full h-full absolute top-0 left-0 z-0">
    <DistributionBoxInfo v-show="isShow" />
    <DistributionBoxWarning
      :currentYearData="currentYearData"
      :lastYearData="lastYearData"
      v-show="isShow"
    />
    <DistributionBoxElectricityCount
      :chartData="chartData"
      v-show="isShow"
    />
    <DistributionBoxVoltage
      :option="voltageOption"
      v-show="isShow"
    />
    <DistributionBoxTempRing :data="tempData" />
    <DistributionBoxTempLineChart :option="voltageOption" />
    <PowerErrorAlert />
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
  import { ref } from "vue";
import { deviceSelectSubject } from "@/utils/deviceSelectSubject";
import { errorAlertSubject } from "@/utils/errorAlertSubject";
  const currentYearData = ref([10, 12, 15, 20, 15, 12, 10, 8, 12, 15, 10, 1]);
  const lastYearData = ref([30, 20, 10, 30, 25, 10, 8, 15, 20, 25, 30, 10]);
  const chartData = ref([
    { titleText: "2#1AW1", value: 100 },
    { titleText: "2#1AW2", value: 20 },
    { titleText: "2#1AW3", value: 10 },
    { titleText: "2#1AW4", value: 63 },
    { titleText: "2#1AW5", value: 270 },
    { titleText: "2#1AW6", value: 270 },
    { titleText: "2#1AW7", value: 270 },
    { titleText: "2#1AW8", value: 270 },
    { titleText: "1#1AW1", value: 270 },
    { titleText: "1#1AW2", value: 270 },
    { titleText: "1#1AW3", value: 270 },
    { titleText: "1#1AW4", value: 270 },
    { titleText: "1#1AW5", value: 270 },
    { titleText: "1#1AW6", value: 270 },
    { titleText: "1#1AW7", value: 270 },
    { titleText: "1#1AW8", value: 270 },
    { titleText: "2#-1ALZ4", value: 270 },
    { titleText: "2#-1ALZ3", value: 270 },
    { titleText: "-1AB2", value: 270 },
    { titleText: "2#-1APZ2", value: 270 },
    { titleText: "2#-1AP2", value: 270 },
    { titleText: "2#-1AB2", value: 270 },
    { titleText: "1#-1AP2", value: 270 },
    { titleText: "1#1AB2", value: 270 },
    { titleText: "1#-1APZ1", value: 270 },
    { titleText: "1#-1APZ2", value: 270 },
    { titleText: "1#-1AZE1", value: 270 },
    { titleText: "1#-1ALE2", value: 270 },
    { titleText: "1#-1APZ2", value: 270 },
    { titleText: "-1AB2", value: 270 },
    { titleText: "-1AB1", value: 270 },
    { titleText: "1#-1ALZ4", value: 270 },
    { titleText: "1#-1ALZ3", value: 270 },
    { titleText: "1#-1ALZ2", value: 270 },
    { titleText: "1#-1ALZ1", value: 270 },
    { titleText: "-1AB1", value: 270 },
    { titleText: "2#-1APZ1", value: 270 },
    { titleText: "2#-1ALZ1", value: 270 },
    { titleText: "2#-1ALE1", value: 270 },
    { titleText: "-1ALG1", value: 270 },
    { titleText: "2#-1ALZ2", value: 270 },
    { titleText: "apxf", value: 270 },
    { titleText: "ALZ2", value: 270 },
    { titleText: "ALZ1", value: 270 },
    { titleText: "APCD", value: 270 },
    { titleText: "-1ALE", value: 270 }
  ]);
  const voltageOption = ref({
    xAxisData: chartData.value.map((item) => item.titleText).slice(0, 12),
    seriesData: chartData.value.map((item) => item.value).slice(0, 12),
  });
  const tempData = ref<{ titleText: string; value: number }[]>([]);
  // 生成随机数据的���数
  const generateRandomData = (length = 12) => {
    return Array.from({ length }, () => Number((14 + Math.random() * 2).toFixed(1)));
  };

  const isShow = ref(true);

  deviceSelectSubject.subscribe((item) => {
    if (item !== null) {
      isShow.value = false;
    } else {
      isShow.value = true;
    }
  });

  errorAlertSubject.subscribe((item) => {
    if (item !== null) {
      isShow.value = false;
    } else {
      isShow.value = true;
    }
  });

  // 生成随机数据
  const randomData = generateRandomData();

  // 设置定时器,每5秒更新一次数据
  setInterval(() => {
    currentYearData.value = generateRandomData();
    lastYearData.value = generateRandomData();
    voltageOption.value.seriesData = generateRandomData(36).map(
      (item) => item * 10
    );
    tempData.value = generateRandomData(36).map((item, index) => ({
      titleText: chartData.value[index].titleText,
      value: item,
    }));
  }, 3000);
</script>

<style scoped></style>
