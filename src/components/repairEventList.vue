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
          @click="handleRowClick(item)"
        >
          <template v-for="(value, key) in getDisplayData(item)">
            <div
              v-if="key !== 'id'"
              :key="key"
              :class="['col', key === 'row5' ? `status-${value}` : '']"
            >
              {{ value }}
            </div>
          </template>
        </div>
      </div>
    </div>
    <TitleComponent title-text="维修事件处置率" />
    <div class="repair_stats">
      <div class="stats_item">
        <div class="stats_icon completed"></div>
        <div class="stats_bg"></div>
        <div class="stats_info">
          <div class="stats_title">处置率</div>
          <div class="stats_value">{{ rate.rate }}</div>
          <div class="stats_unit">%</div>
        </div>
      </div>
      <div class="stats_item">
        <div class="stats_icon processing"></div>
        <div class="stats_bg"></div>
        <div class="stats_info">
          <div class="stats_title">评分</div>
          <div class="stats_value">{{ rate.score }}</div>
          <div class="stats_unit">分</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { getRepairList, RepairListVO } from "@/apis/getRepairList";
  import { getRepairRateData, RepairRateData } from "@/apis/getRepairRateData";
  import TitleComponent from "@/components/titleComponent.vue";
  import { onMounted, ref, computed } from "vue";

  // 定义emit
  const emit = defineEmits(["rowClick"]);

  // 添加获取显示数据的方法
  const getDisplayData = (item: RepairListVO) => {
    const { raw, ...displayData } = item;
    return displayData;
  };

  // 修改点击行的处理函数
  const handleRowClick = (rowData: RepairListVO) => {
    emit("rowClick", rowData.raw);
    console.log(rowData.raw);
  };

  // const titleMap = ref({
  //   row1: "类别",
  //   row2: "所在位置",
  //   row3: "事件描述",
  //   row4: "日期",
  //   row5: "事件进度",
  // });

  // const list = ref([
  //   {
  //     id: 1,
  //     row1: "设备维修",
  //     row2: "12栋394号房间",
  //     row3: "设备异常设备异常",
  //     row4: "12/02",
  //     row5: "完成",
  //   },
  //   {
  //     id: 2,
  //     row1: "设备维修",
  //     row2: "12栋394号房间",
  //     row3: "设备异常设备异常",
  //     row4: "12/02",
  //     row5: "完成",
  //   },
  //   {
  //     id: 3,
  //     row1: "水电维修",
  //     row2: "12栋394号房间",
  //     row3: "设备异常设备异常设备异常设备异常",
  //     row4: "12/02",
  //     row5: "进行中",
  //   },
  //   {
  //     id: 4,
  //     row1: "环境保洁",
  //     row2: "12栋394号房间",
  //     row3: "设备异常设备异常",
  //     row4: "12/02",
  //     row5: "未解决",
  //   },
  //   {
  //     id: 5,
  //     row1: "绿化养护",
  //     row2: "12栋394号房间",
  //     row3: "设备异常设备异常",
  //     row4: "12/02",
  //     row5: "完成",
  //   },
  //   {
  //     id: 6,
  //     row1: "设备维修",
  //     row2: "12栋394号房间",
  //     row3: "设备异常设备异常",
  //     row4: "12/02",
  //     row5: "完成",
  //   },
  //   {
  //     id: 7,
  //     row1: "水电维修",
  //     row2: "12栋394号房间",
  //     row3: "设备异常设备异常设备异常设备异常",
  //     row4: "12/02",
  //     row5: "进行中",
  //   },
  //   {
  //     id: 8,
  //     row1: "环境保洁",
  //     row2: "12栋394号房间",
  //     row3: "设备异常设备异常",
  //     row4: "12/02",
  //     row5: "未解决",
  //   },
  //   {
  //     id: 9,
  //     row1: "绿化养护",
  //     row2: "12栋394号房间",
  //     row3: "设备异常设备异常",
  //     row4: "12/02",
  //     row5: "完成",
  //   },
  //   {
  //     id: 10,
  //     row1: "建筑空间",
  //     row2: "12栋394号房间",
  //     row3: "设备异常设备异常",
  //     row4: "12/02",
  //     row5: "进行中",
  //   },
  //   {
  //     id: 11,
  //     row1: "其他类型",
  //     row2: "12栋394号房间",
  //     row3: "设备异常设备异常",
  //     row4: "12/02",
  //     row5: "未解决",
  //   },
  //   {
  //     id: 12,
  //     row1: "建筑空间",
  //     row2: "12栋394号房间",
  //     row3: "设备异常设备异常",
  //     row4: "12/02",
  //     row5: "进行中",
  //   },
  //   {
  //     id: 13,
  //     row1: "其他类型",
  //     row2: "12栋394号房间",
  //     row3: "设备异常设备异常",
  //     row4: "12/02",
  //     row5: "未解决",
  //   },
  //   {
  //     id: 14,
  //     row1: "水电维修",
  //     row2: "12栋394号房间",
  //     row3: "设备异常设备异常设备异常设备异常",
  //     row4: "12/02",
  //     row5: "进行中",
  //   },
  //   {
  //     id: 15,
  //     row1: "环境保洁",
  //     row2: "12栋394号房间",
  //     row3: "设备异常设备异常",
  //     row4: "12/02",
  //     row5: "未解决",
  //   },
  //   {
  //     id: 16,
  //     row1: "绿化养护",
  //     row2: "12栋394号房间",
  //     row3: "设备异常设备异常",
  //     row4: "12/02",
  //     row5: "完成",
  //   },
  //   {
  //     id: 17,
  //     row1: "建筑空间",
  //     row2: "12栋394号房间",
  //     row3: "设备异常设备异常",
  //     row4: "12/02",
  //     row5: "进行中",
  //   },
  //   {
  //     id: 18,
  //     row1: "其他类型",
  //     row2: "12栋394号房间",
  //     row3: "设备异常设备异常",
  //     row4: "12/02",
  //     row5: "未解决",
  //   },
  // ]);

  const titleMap = ref({
    row1: "类别",
    row2: "所在位置",
    row3: "事件描述",
    row4: "日期",
    row5: "事件进度",
  });

  const list = ref<RepairListVO[]>([]);
  const rate = ref<Pick<RepairRateData, "rate" | "score">>({
    rate: "0%",
    score: "0",
  });

  // 获取数据
  const fetchRepairList = async () => {
    try {
      const data = await getRepairList();
      list.value = data;
    } catch (error) {
      console.error("获取报修列表失败:", error);
    }
  };

  const fetchRepairRateData = async () => {
    const data = await getRepairRateData();
    rate.value = data;
  };

  onMounted(() => {
    fetchRepairList();
    fetchRepairRateData();
  });
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
    height: 107px;
    overflow: hidden;
  }

  .list_header {
    width: 207px;
  }

  .list_body {
    width: 207px;
    height: calc(207px - 30px - 7px - 100px);
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
  .col.status-已完成::before {
    content: "";
    display: inline-block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    margin-right: 4px;
    vertical-align: middle;
    background-color: #4caf50;
  }

  .col.status-处理中::before {
    content: "";
    display: inline-block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    margin-right: 4px;
    vertical-align: middle;
    background-color: #2196f3;
  }

  .col.status-待处理::before {
    content: "";
    display: inline-block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    margin-right: 4px;
    vertical-align: middle;
    background-color: #f44336;
  }

  .repair_stats {
    margin-top: 7px;
    width: 207px;
    display: flex;
    gap: 40px;
    padding: 0 10px;
  }

  .stats_item {
    position: relative;
    width: 55px;
    height: 33px;
  }

  .stats_icon {
    position: absolute;
    top: 4px;
    left: 0;
    width: 25px;
    height: 28px;
    background-size: cover;
    margin-top: 3px;
  }

  .stats_icon.completed {
    background-image: url("@/assets/异常事件.png");
    background-size: 100% 100%;
    background-position: bottom;
  }

  .stats_icon.processing {
    background-image: url("@/assets/异常事件.png");
    background-size: 100% 100%;
    background-position: bottom;
  }

  .stats_icon.pending {
    background-image: url("@/assets/异常事件.png");
    background-size: 100% 100%;
    background-position: bottom;
  }

  .stats_bg {
    position: absolute;
    left: 26px;
    top: 10px;
    width: 62px;
    height: 23px;
    background-image: url("@/assets/park_supporting_item_bg.png");
    background-size: cover;
  }

  .stats_info {
    position: absolute;
    left: 37px;
    top: 0;
  }

  .stats_title {
    height: 8px;
    font-family: YouSheBiaoTiHei;
    font-size: 6px;
    color: #e4f3ff;
    line-height: 8px;
    text-align: left;
    font-style: normal;
  }

  .stats_value {
    margin-top: 2px;
    height: 13px;
    font-family: YouSheBiaoTiHei;
    font-size: 10px;
    color: #d9f1fd;
    line-height: 13px;
    text-align: left;
    font-style: normal;
  }

  .stats_unit {
    position: absolute;
    top: 13px;
    left: 21px;
    height: 8px;
    font-family: YouSheBiaoTiHei;
    font-size: 6px;
    color: #e4f3ff;
    line-height: 8px;
    text-align: left;
    font-style: normal;
  }
</style>
