<template>
  <div class="parkEnterpriseScale">
    <titleComponent titleText="园区企业规模" />
    <div class="chart">
      <Chart :data="data" :width="width" :color="color" :offset="offset" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import Chart from "@/components/chart.vue";
  import titleComponent from "./titleComponent.vue";

  const props = defineProps<{
    data: {
      xAxisData: string[];
      seriesData: number[];
    };
    width: number;
    color: string;
    offset: number;
  }>();
</script>

<style scoped>
  .parkEnterpriseScale {
    position: absolute;
    top: 98px;
    right: 53px;
    width: 206px;
    height: 146px;
  }
  .chart {
    width: 100%;
    height: calc(100% - 35px);
  }
</style>
