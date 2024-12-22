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
    { titleText: "A102-GB", value: 100 },
    { titleText: "A103-GB", value: 20 },
    { titleText: "A104-GB", value: 10 },
    { titleText: "A105-GB", value: 63 },
    { titleText: "A106-GB", value: 270 },
    { titleText: "A107-GB", value: 270 },
    { titleText: "A108-GB", value: 270 },
    { titleText: "A109-GB", value: 270 },
    { titleText: "A110-GB", value: 270 },
    { titleText: "A111-GB", value: 270 },
    { titleText: "A112-GB", value: 270 },
    { titleText: "A113-GB", value: 270 },
    { titleText: "A114-GB", value: 270 },
    { titleText: "A115-GB", value: 270 },
    { titleText: "A116-GB", value: 270 },
    { titleText: "A117-GB", value: 270 },
    { titleText: "A118-GB", value: 270 },
    { titleText: "A119-GB", value: 270 },
    { titleText: "A120-GB", value: 270 },
  ]);
  const voltageOption = ref({
    xAxisData: chartData.value.map((item) => item.titleText).slice(0, 12),
    seriesData: chartData.value.map((item) => item.value).slice(0, 12),
  });
  const tempData = ref<{ titleText: string; value: number }[]>([]);
  // 生成随机数据的函数
  const generateRandomData = (length = 12) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 30) + 1);
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
      titleText: `A${index + 1}`,
      value: item * 10,
    }));
  }, 3000);
</script>

<style scoped></style>
