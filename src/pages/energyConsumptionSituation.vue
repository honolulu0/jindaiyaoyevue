<template>
  <div class="w-full h-full absolute top-0 left-0 z-0">
    <AnnualElectricityConsumption
      v-show="isShow"
      :chartData="powerConsumptionData"
      :totalConsumption="powerConsumptionData.reduce((a, b) => a + b, 0)"
    />
    <DeviceList
      :top="356"
      :left="20"
      :height="209"
      :deviceType="['电表','水表']"
      v-show="isShow"
    />
    <AnnualWaterConsumption
      :chartData="waterConsumptionData"
      :totalConsumption="waterConsumptionData.reduce((a, b) => a + b, 0)"
    />
    <PowerErrorAlert :deviceType="['1','2']" />
  </div>
</template>

<script setup lang="ts">
  import AnnualElectricityConsumption from "@/components/annualElectricityConsumption.vue";
  import AnnualWaterConsumption from "@/components/annualWaterConsumption.vue";
  import DeviceList from "@/components/deviceList.vue";
  import PowerErrorAlert from "@/components/powerErrorAlert.vue";
  import { ref, onMounted } from "vue";
  import { getConsumptionData, IConsumptionData } from "@/apis/getConsumption";
  const isShow = ref(true);
  const powerConsumptionData = ref<number[]>([]);
  const waterConsumptionData = ref<number[]>([]);
  onMounted(async () => {
    const data = await getConsumptionData();
    powerConsumptionData.value = Object.values(data["电表"]);
    waterConsumptionData.value = Object.values(data["水表"]);
  });
</script>

<style scoped lang="scss"></style>
