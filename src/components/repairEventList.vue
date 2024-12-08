<template>
  <div class="repair_event_list">
    <TitleComponent title-text="维修事件列表" />
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
        >
          <div
            v-for="(value, key) in item"
            :key="key"
            :class="['col', key === 'row5' ? `status-${value}` : '']"
          >
            {{ value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TitleComponent from "@/components/titleComponent.vue";
  import { ref } from "vue";

  const titleMap = ref({
    row1: "类别",
    row2: "所在位置",
    row3: "事件描述",
    row4: "日期",
    row5: "事件进度",
  });

  const list = ref([
    {
      row1: "设备维修",
      row2: "12栋394号房间",
      row3: "设备异常设备异常",
      row4: "12/02",
      row5: "完成",
    },
    {
      row1: "设备维修",
      row2: "12栋394号房间",
      row3: "设备异常设备异常",
      row4: "12/02",
      row5: "完成",
    },
    {
      row1: "水电维修",
      row2: "12栋394号房间",
      row3: "设备异常设备异常设备异常设备异常",
      row4: "12/02",
      row5: "进行中",
    },
    {
      row1: "环境保洁",
      row2: "12栋394号房间",
      row3: "设备异常设备异常",
      row4: "12/02",
      row5: "未解决",
    },
    {
      row1: "绿化养护",
      row2: "12栋394号房间",
      row3: "设备异常设备异常",
      row4: "12/02",
      row5: "完成",
    },
    {
      row1: "设备维修",
      row2: "12栋394号房间",
      row3: "设备异常设备异常",
      row4: "12/02",
      row5: "完成",
    },
    {
      row1: "水电维修",
      row2: "12栋394号房间",
      row3: "设备异常设备异常设备异常设备异常",
      row4: "12/02",
      row5: "进行中",
    },
    {
      row1: "环境保洁",
      row2: "12栋394号房间",
      row3: "设备异常设备异常",
      row4: "12/02",
      row5: "未解决",
    },
    {
      row1: "绿化养护",
      row2: "12栋394号房间",
      row3: "设备异常设备异常",
      row4: "12/02",
      row5: "完成",
    },
    {
      row1: "建筑空间",
      row2: "12栋394号房间",
      row3: "设备异常设备异常",
      row4: "12/02",
      row5: "进行中",
    },
    {
      row1: "其他类型",
      row2: "12栋394号房间",
      row3: "设备异常设备异常",
      row4: "12/02",
      row5: "未解决",
    },
    {
      row1: "建筑空间",
      row2: "12栋394号房间",
      row3: "设备异常设备异常",
      row4: "12/02",
      row5: "进行中",
    },
    {
      row1: "其他类型",
      row2: "12栋394号房间",
      row3: "设备异常设备异常",
      row4: "12/02",
      row5: "未解决",
    },
    {
      row1: "水电维修",
      row2: "12栋394号房间",
      row3: "设备异常设备异常设备异常设备异常",
      row4: "12/02",
      row5: "进行中",
    },
    {
      row1: "环境保洁",
      row2: "12栋394号房间",
      row3: "设备异常设备异常",
      row4: "12/02",
      row5: "未解决",
    },
    {
      row1: "绿化养护",
      row2: "12栋394号房间",
      row3: "设备异常设备异常",
      row4: "12/02",
      row5: "完成",
    },
    {
      row1: "建筑空间",
      row2: "12栋394号房间",
      row3: "设备异常设备异常",
      row4: "12/02",
      row5: "进行中",
    },
    {
      row1: "其他类型",
      row2: "12栋394号房间",
      row3: "设备异常设备异常",
      row4: "12/02",
      row5: "未解决",
    },
  ]);
</script>

<style scoped>
  .repair_event_list {
    position: absolute;
    top: 74px;
    right: 20px;
    width: 207px;
    height: 207px;
  }

  .list_content {
    margin-top: 7px;
    width: 207px;
    height: 207px;
    overflow: hidden;
  }

  .list_header {
    width: 207px;
  }

  .list_body {
    width: 207px;
    height: calc(207px - 30px - 7px);
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

  .data_row:nth-child(even) {
    background-color: rgba(97, 119, 138, 0.2);
  }

  .data_row:nth-child(odd) {
    background-color: transparent;
  }

  .col {
    flex: 1;
    text-align: center;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 5px;
    color: #ffffff;
    line-height: 13px;
    /* display: flex;
    align-items: center;
    justify-content: center; */
    font-style: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

  /* 修改状态点的样式 */
  .col.status-完成::before {
    content: "";
    display: inline-block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    margin-right: 4px;
    vertical-align: middle;
    background-color: #4caf50;
  }

  .col.status-进行中::before {
    content: "";
    display: inline-block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    margin-right: 4px;
    vertical-align: middle;
    background-color: #2196f3;
  }

  .col.status-未解决::before {
    content: "";
    display: inline-block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    margin-right: 4px;
    vertical-align: middle;
    background-color: #f44336;
  }
</style>
