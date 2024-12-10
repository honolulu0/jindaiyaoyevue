<template>
  <div class="distribution-box-info">
    <TitleComponent titleText="配电箱信息" />
    <div class="distribution-box-info-content">
      <div class="left-content">
        <div class="left-content-img"></div>
        <div class="left-content-title-text">配电箱数量</div>
      </div>
      <div class="right-content">
        <div class="list_content">
          <div class="list_header">
            <div class="list_content_item title_row">
              <div
                v-for="(item, key) in titleMap"
                :key="key"
                class="col title_col"
              >
                {{ item }}
              </div>
            </div>
          </div>
          <div class="list_body">
            <div
              v-for="(item, index) in list"
              :key="index"
              class="list_content_item data_row"
              :class="{ error: item.row4 === '异常' }"
            >
              <div
                v-for="(value, key) in item"
                :key="key"
                class="col"
              >
                {{ value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TitleComponent from "./titleComponent.vue";
  import { ref } from "vue";

  const titleMap = ref({
    row1: "序号",
    row2: "设备型号",
    row3: "定位",
    row4: "设备状态",
  });

  const list = ref([
    {
      row1: "1",
      row2: "A213-KF",
      row3: "车间（1F）",
      row4: "正常",
    },
    {
      row1: "2",
      row2: "A213-KF",
      row3: "车间（1F）",
      row4: "正常",
    },
    {
      row1: "3",
      row2: "A213-KF",
      row3: "车间（1F）",
      row4: "正常",
    },
    {
      row1: "1",
      row2: "A213-KF",
      row3: "车间（1F）",
      row4: "正常",
    },
    {
      row1: "2",
      row2: "A213-KF",
      row3: "车间（1F）",
      row4: "异常",
    },
    {
      row1: "3",
      row2: "A213-KF",
      row3: "车间（1F）",
      row4: "正常",
    },
  ]);
</script>

<style scoped>
  .distribution-box-info {
    position: absolute;
    top: 64px;
    left: 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 236px;
    height: 124px;
  }

  .distribution-box-info-content {
    margin-top: 20px;
    width: 100%;
    flex: 1;
    display: grid;
    grid-template-columns: 0.8fr 2fr;
    gap: 4px;
  }

  .left-content {
    background-image: url("@/assets/power/配电箱数量及背景.png");
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .left-content-img {
    width: 44px;
    height: 44px;
    background-image: url("@/assets/power/编组97.png");
    background-size: cover;
    background-position: center;
    margin-bottom: 20px;
  }

  .left-content-title-text {
    position: absolute;
    bottom: 0;
    font-family: "SourceHanSansSC-Normal";
    font-weight: 600;
    font-size: 5px;
    color: #ffffff;
    line-height: 13px;
    text-align: left;
    font-style: normal;
  }

  .right-content {
  }

  .list_content {
    width: 100%;
    height: 100;
  }

  .list_header {
    width: 100%;
  }

  .list_body {
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
  }

  .list_content_item {
    width: 100%;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 12px;
  }

  .title_row {
    width: 100%;
    height: 14px;
    background: #61778a;
    opacity: 0.4;
  }

  .title_col {
    width: max-content;
    height: 7px;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 6px;
    color: #94dcef;
    line-height: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: normal;
  }

  .data_row {
    border-bottom: 1px solid rgba(97, 119, 138, 0.4);
  }

  .list_body_content:nth-child(even) {
    background-color: rgba(97, 119, 138, 0.2);
  }

  .list_body_content:nth-child(odd) {
    background-color: transparent;
  }

  .col {
    flex: 1;
    flex-shrink: 1;
    text-align: center;
    width: 13px;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 5px;
    color: #ffffff;
    line-height: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: normal;
  }

  .error {
    color: #ff0000;
  }

  .error .col {
    color: #ff0000 !important;
  }

  .list_body::-webkit-scrollbar {
    width: 4px;
  }

  .list_body::-webkit-scrollbar-thumb {
    background: rgba(165, 216, 252, 0.4);
    border-radius: 2px;
  }

  .list_body::-webkit-scrollbar-track {
    background: transparent;
  }

  .list_body::-webkit-scrollbar-horizontal {
    display: none;
  }

  .list_body_icon {
    width: 14px;
    height: 14px;
    background-size: 100% 100%;
  }

  .list_body_icon_img {
    margin-top: 4px;
    background-image: url("@/assets/parkFacilities/设备异常列表中icon.png");
  }
</style>
