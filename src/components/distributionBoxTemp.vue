<template>
  <div class="distribution-box-temp">
    <TitleComponent titleText="园区配电箱热力图" />
    <div class="chart-container">
      <div class="chart-container-item">
        <div class="title">电子车间楼栋配电房</div>
        <div class="item-container1">
          <div class="item-container-item"></div>
          <div class="item-container-item"></div>
          <div class="item-container-item"></div>
          <div class="item-container-item"></div>
          <div class="item-container-item"></div>
          <div class="item-container-item"></div>
          <div class="item-container-item"></div>
        </div>
      </div>
      <div class="chart-container-item">
        <div class="title">电子车间楼栋配电房</div>
        <div class="item-container2"></div>
      </div>
      <div class="chart-container-item">
        <div class="title">车间#1</div>
        <div class="item-container3">
          <div
            class="item-container-item"
            v-for="i in 20"
          ></div>
        </div>
      </div>
      <div class="chart-container-item">
        <div class="title">车间#2</div>
        <div class="item-container3">
          <div
            class="item-container-item"
            v-for="i in 20"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TitleComponent from "./titleComponent.vue";
</script>

<style scoped>
  .distribution-box-temp {
    width: 206px;
    height: 159px;
    position: absolute;
    top: 335px;
    right: 21px;
  }

  .chart-container {
    width: 100%;
    margin-top: 10px;
    height: calc(100% - 35px);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 2fr 3fr;
    gap: 3px;
  }

  .chart-container-item {
    background: rgba(126, 231, 255, 0.1);
    border: 0px solid #ffffff;
  }

  .title {
    width: 100%;
    height: 9px;
    font-family: YouSheBiaoTiHei;
    font-size: 7px;
    color: #ffffff;
    line-height: 9px;
    text-align: center;
    font-style: normal;
    margin-top: 3px;
  }

  .item-container1 {
    width: 100%;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 3px;
  }

  .item-container2 {
  }

  .item-container3 {
    /* padding-left: 30px;
    padding-right: 30px; */
    padding-top: 5px;
    padding-bottom: 5px;
    display: grid;
    grid-template-columns: repeat(5, 12fr);
    grid-template-rows: repeat(4, 18fr);
    justify-content: center;
    justify-items: center;
    align-items: center;
    /* gap: 2px; */
  }

  .item-container4 {
    margin-top: 10px;
  }

  .item-container-item {
    height: 18px;
    width: 13px;
    max-width: 13px;
    max-height: 18px;
    display: flex;
    background: #000000;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
</style>
