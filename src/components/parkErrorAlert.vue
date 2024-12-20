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
            <div
              :class="{
                list_body_icon: key === 0,
              }"
            ></div>
            {{ item }}
          </div>
        </div>
      </div>
      <div class="list_body">
        <div
          class="list_body_content"
          v-for="(item, index) in list"
          :key="index"
          @click="errorAlertSubject.next(item.raw)"
        >
          <div class="list_content_item data_row">
            <div
              v-for="(value, key) in getDisplayData(item)"
              :key="key"
              class="col"
              :class="{ error: item.row4 === '未处理' && key === 'row2' }"
            >
              <div
                :class="{
                  list_body_icon: key === 'row1',
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
  import { ref, onMounted, onUnmounted } from "vue";
  import TitleComponent from "./titleComponent.vue";
  import { getErrorAlert } from "@/apis/errorAlert";
  import type { ErrorAlert } from "@/apis/errorAlert";
  import { errorAlertSubject } from "@/utils/errorAlertSubject";

  const titleMap = ref(["设备", "异常描述", "发生时间", "状态", "操作"]);
  const list = ref<any[]>([]);

  const getDisplayData = (item: any) => {
    const { raw, ...displayData } = item;
    return displayData;
  };

  let timer: number | null = null;

  const loadData = async () => {
    try {
      const data = await getErrorAlert();
      list.value = data.map(item => ({
        raw: item,
        row1: item.location,
        row2: item.msg_content,
        row3: item.create_time.substring(11, 16),
        row4: item.is_processed ? '已处理' : '未处理',
        row5: '查看'
      }));
    } catch (error) {
      console.error('加载异常告警数据失败:', error);
    }
  };

  onMounted(() => {
    loadData();
    timer = setInterval(loadData, 30000);
  });

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  });
</script>

<style scoped>
  .error_alert {
    position: absolute;
    bottom: 13px;
    left: 20px;
    z-index: 1000;
    width: 207px;
    height: 110px;
  }

  .list_content {
    width: 207px;
    height: 110px;
  }

  .list_header {
    width: 207px;
  }

  .list_body {
    width: 207px;
    height: 69px;
    overflow-y: scroll;
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
    width: 0;
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
