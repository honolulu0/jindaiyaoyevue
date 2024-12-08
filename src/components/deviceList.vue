<template>
  <div class="device_list">
    <div class="title_bg"></div>
    <div class="title">设备列表</div>
    <div class="search_box"></div>
    <input
      type="text"
      placeholder="输入对应搜索信息"
      class="search_input"
      v-model="searchValue"
    />
    <div class="device_list_content">
      <div class="device_list_header">
        <div class="device_list_content_item title_row">
          <div
            v-for="(item, key) in listTitleMap"
            :key="key"
            class="col title_col"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="device_list_body">
        <div
          v-for="(item, index) in deviceList"
          :key="index"
          class="device_list_content_item data_row"
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
</template>

<script setup lang="ts">
  import { ref } from "vue";
  const searchValue = ref("");
  const listTitleMap = ref({
    row1: "序号",
    row2: "设备位置",
    row3: "设备类型",
    row4: "设备状态",
  });

  const deviceList = ref([
    { row1: "1", row2: "12栋6层101室", row3: "新风系统", row4: "正常" },
    { row1: "2", row2: "12栋6层101室", row3: "新风系统", row4: "正常" },
    { row1: "3", row2: "12栋6层101室", row3: "新风系统", row4: "正常" },
    { row1: "4", row2: "12栋6层101室", row3: "新风系统", row4: "正常" },
    { row1: "5", row2: "12栋6层101室", row3: "新风系统", row4: "异常" },
    { row1: "6", row2: "12栋6层101室", row3: "新风系统", row4: "正常" },
    { row1: "1", row2: "12栋6层101室", row3: "新风系统", row4: "正常" },
    { row1: "2", row2: "12栋6层101室", row3: "新风系统", row4: "正常" },
    { row1: "3", row2: "12栋6层101室", row3: "新风系统", row4: "正常" },
    { row1: "4", row2: "12栋6层101室", row3: "新风系统", row4: "正常" },
    { row1: "5", row2: "12栋6层101室", row3: "新风系统", row4: "异常" },
    { row1: "6", row2: "12栋6层101室", row3: "新风系统", row4: "正常" },
    { row1: "1", row2: "12栋6���101室", row3: "新风系统", row4: "正常" },
    { row1: "2", row2: "12栋6层101室", row3: "新风系统", row4: "正常" },
    { row1: "3", row2: "12栋6层101室", row3: "新风系统", row4: "正常" },
    { row1: "4", row2: "12栋6层101室", row3: "新风系统", row4: "正常" },
    { row1: "5", row2: "12栋6层101室", row3: "新风系统", row4: "异常" },
    { row1: "6", row2: "12栋6层101室", row3: "新风系统", row4: "正常" },
  ]);
</script>

<style scoped>
  .device_list {
    position: absolute;
    top: 305px;
    left: 20px;
    width: 241px;
    height: 250px;
    overflow: hidden;
  }

  .title {
    width: 39px;
    height: 13px;
    font-family: YouSheBiaoTiHei;
    font-weight: 100;
    font-size: 10px;
    color: #a5d8fc;
    line-height: 13px;
    text-align: left;
    font-style: normal;
    position: absolute;
    top: 0;
    left: 22px;
  }

  .title_bg {
    width: 201px;
    height: 12px;
    background-size: cover;
    background-image: url("@/assets/title_bg.png");
    position: absolute;
    top: 7px;
    left: 0;
  }

  .search_box {
    position: absolute;
    top: 30px;
    left: 0;
    width: 241px;
    height: 18px;
    opacity: 0.4;
    background: #61778a;
    border: 0px solid #ffffff;
  }

  .search_input {
    position: absolute;
    top: 28px;
    left: 0;
    width: 241px;
    height: 18px;
    padding: 10px;
    border: none;
    background: transparent;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 6px;
    color: #ffffff;
    line-height: 9px;
    text-align: left;
    outline: none;
    font-style: normal;
  }

  .device_list_content {
    position: absolute;
    top: 61px;
    left: 0;
    width: 241px;
    height: 243px;
    overflow: hidden;
  }

  .device_list_header {
    width: 241px;
  }

  .device_list_body {
    width: 241px;
    height: 229px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .device_list_content_item {
    width: 241px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 12px;
  }

  .title_row {
    width: 241px;
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

  .data_row:nth-child(even) {
    background-color: rgba(97, 119, 138, 0.2);
  }

  .data_row:nth-child(odd) {
    background-color: transparent;
  }

  .col {
    flex: 1;
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

  .device_list_body::-webkit-scrollbar {
    width: 4px;
  }

  .device_list_body::-webkit-scrollbar-thumb {
    background: rgba(165, 216, 252, 0.4);
    border-radius: 2px;
  }

  .device_list_body::-webkit-scrollbar-track {
    background: transparent;
  }

  .device_list_body::-webkit-scrollbar-horizontal {
    display: none;
  }
</style>
