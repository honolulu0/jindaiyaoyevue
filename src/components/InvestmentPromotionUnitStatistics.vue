<template>
  <div class="investment_promotion_unit_statistics">
    <div class="title_bg"></div>
    <div class="title">招商单元统计</div>
    <div class="content rent">
      <div
        class="statistics_box"
        v-for="item in statisticsBoxPositionRent"
        :style="item.boxStyle"
      >
        <div class="data_title">{{ item.title }}</div>
        <div
          class="data_pre"
          :style="{ backgroundColor: item.color }"
        ></div>
        <div
          class="data_number data_number1"
          :style="{ color: item.color }"
        >
          {{ item.number1 }}
        </div>
        <div class="data_unit data_unit1">{{ item.unit1 }}</div>
        <div
          class="data_number data_number2"
          :style="{ color: item.color }"
        >
          {{ item.number2 }}
        </div>
        <div class="data_unit data_unit2">{{ item.unit2 }}</div>
      </div>
      <div class="circle-progress_bg"></div>
      <CircleProgress :percentage="45" startColor="#a5d8fc" endColor="#a5d8fc" style="position: absolute; top: 3px; right: 19px;" />
    </div>
    <div class="content sell">
      <div
        class="statistics_box"
        v-for="item in statisticsBoxPositionSell"
        :style="item.boxStyle"
      >
        <div class="data_title">{{ item.title }}</div>
        <div
          class="data_pre"
          :style="{ backgroundColor: item.color }"
        ></div>
        <div
          class="data_number data_number1"
          :style="{ color: item.color }"
        >
          {{ item.number1 }}
        </div>
        <div class="data_unit data_unit1">{{ item.unit1 }}</div>
        <div
          class="data_number data_number2"
          :style="{ color: item.color }"
        >
          {{ item.number2 }}
        </div>
        <div class="data_unit data_unit2">{{ item.unit2 }}</div>
      </div>
      <div class="circle-progress_bg"></div>
      <CircleProgress :percentage="45" startColor="#fee186" endColor="#fee186" style="position: absolute; top: 3px; right: 19px;" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from "vue";
  import CircleProgress from "./CircleProgress.vue";

  const statisticsBoxPositionRent = reactive([
    {
      boxStyle: {
        width: "39px",
        height: "33px",
        top: "4px",
        left: "0px",
      },
      title: "已租",
      number1: "2",
      unit1: "栋",
      number2: "1232",
      unit2: "m²",
      color: "#a5d8fc",
    },
    {
      boxStyle: {
        width: "39px",
        height: "33px",
        top: "4px",
        left: "60px",
      },
      title: "未租",
      number1: "2",
      unit1: "栋",
      number2: "1232",
      unit2: "m²",
      color: "#ffffff",
    },
  ]);

  const statisticsBoxPositionSell = reactive([
    {
      boxStyle: {
        width: "39px",
        height: "33px",
        top: "4px",
        left: "0px",
      },
      title: "已售",
      number1: "2",
      unit1: "栋",
      number2: "1232",
      unit2: "m²",
      color: "#fee186",
    },
    {
      boxStyle: {
        width: "39px",
        height: "33px",
        top: "4px",
        left: "60px",
      },
      title: "未售",
      number1: "2",
      unit1: "栋",
      number2: "1232",
      unit2: "m²",
      color: "#ffffff",
    },
  ]);
</script>

<style scoped>
  .investment_promotion_unit_statistics {
    position: absolute;
    bottom: 10px;
    left: 20px;
    width: 206px;
    height: 119px;
  }

  .title {
    position: absolute;
    top: 0px;
    left: 22px;
    width: 60px;
    height: 13px;
    font-family: YouSheBiaoTiHei;
    font-size: 10px;
    color: #a5d8fc;
    line-height: 13px;
    text-align: left;
    font-style: normal;
  }

  .title_bg {
    background-image: url("@/assets/title_bg.png");
    background-size: cover;
    position: absolute;
    left: 0;
    top: 7px;
    width: 206px;
    height: 14px;
  }

  .content {
    width: 196px;
    height: 41px;
    background: rgba(7, 18, 27, 0.4);
    border: 0px solid #154355;
  }

  .rent {
    position: absolute;
    top: 29px;
    left: 4px;
  }

  .sell {
    position: absolute;
    top: 74px;
    left: 4px;
  }

  .data_title {
    width: 12px;
    height: 8px;
    font-family: YouSheBiaoTiHei;
    font-size: 6px;
    color: #e4f3ff;
    line-height: 8px;
    text-align: left;
    font-style: normal;
    position: absolute;
    top: 4px;
    left: 7px;
    opacity: 0.6;
  }

  .data_number1 {
    position: absolute;
    top: 10px;
    left: 7px;
  }

  .data_unit1 {
    position: absolute;
    top: 11px;
    left: 33px;
  }

  .data_number2 {
    position: absolute;
    top: 21px;
    left: 7px;
  }

  .data_unit2 {
    position: absolute;
    top: 22px;
    left: 33px;
  }

  .data_pre {
    width: 1px;
    height: 17px;
    position: absolute;
    top: 14px;
  }

  .data_number {
    width: max-content;
    height: 12px;
    font-family: YouSheBiaoTiHei;
    font-size: 9px;
    line-height: 12px;
    text-align: left;
    font-style: normal;
  }

  .data_unit {
    width: max-content;
    height: 8px;
    font-family: YouSheBiaoTiHei;
    font-size: 6px;
    color: #e4f3ff;
    line-height: 8px;
    text-align: left;
    font-style: normal;
    opacity: 0.6;
  }

  .statistics_box {
    position: absolute;
  }

  .circle-progress_bg {
    position: absolute;
    top: 1px;
    right: 4px;
    width: 65px;
    height: 39px;
    background: #354e66;
    opacity: 0.6;
  }
</style>
