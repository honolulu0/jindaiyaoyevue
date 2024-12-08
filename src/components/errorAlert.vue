<template>
  <div class="error_alert">
    <TitleComponent titleText="异常告警" />
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
          class="list_body_content"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="list_content_item data_row">
            <div
              v-for="(value, key) in item"
              :key="key"
              class="col"
              :class="{ error: item.row4 === '未处理' && key === 'row2' }"
            >
              <div
                :class="{
                  list_body_icon: true,
                  list_body_icon_img: item.row4 === '未处理' && key === 'row1',
                }"
              ></div>
              {{ value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import TitleComponent from "./titleComponent.vue";

  const titleMap = ref(["设备", "异常描述", "发生时间", "状态", "操作"]);

  const list = ref([
    {
      row1: "设备1",
      row2: "异常描述",
      row3: "12:00",
      row4: "未处理",
      row5: "查看",
    },
    {
      row1: "设备1",
      row2: "异常描述",
      row3: "12:00",
      row4: "未处理",
      row5: "查看",
    },
    {
      row1: "设备1",
      row2: "异常描述",
      row3: "12:00",
      row4: "未处理",
      row5: "查看",
    },
    {
      row1: "设备1",
      row2: "异常描述",
      row3: "12:00",
      row4: "已处理",
      row5: "查看",
    },
    {
      row1: "设备1",
      row2: "异常描述",
      row3: "12:00",
      row4: "未处理",
      row5: "查看",
    },
    {
      row1: "设备1",
      row2: "异常描述",
      row3: "12:00",
      row4: "已处理",
      row5: "查看",
    },
    {
      row1: "设备1",
      row2: "异常描述",
      row3: "12:00",
      row4: "未处理",
      row5: "查看",
    },
    {
      row1: "设备1",
      row2: "异常描述",
      row3: "12:00",
      row4: "已处理",
      row5: "查看",
    },
  ]);
</script>

<style scoped>
  .error_alert {
    position: absolute;
    top: 232px;
    right: 20px;
    z-index: 1000;
    width: 207px;
    height: 126px;
  }

  .list_content {
    width: 207px;
    height: 126px;
  }

  .list_header {
    width: 207px;
  }

  .list_body {
    width: 207px;
    height: 87px;
    overflow-y: hidden;
    overflow-x: hidden;
  }

  .list_content_item {
    width: 207px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 12px;
  }

  .title_row {
    width: 207px;
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
