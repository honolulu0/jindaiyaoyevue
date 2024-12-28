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
      <div
        class="list_body"
        @scroll="handleScroll"
      >
        <div
          class="list_body_content"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="list_content_item data_row">
            <div
              v-for="(value, key) in getDisplayData(item)"
              :key="key"
              class="col"
              :class="{ error: item.row4 === '未处理' && key === 'row2' }"
              @click="key === 'row5' && handleItemClick(item.raw)"
            >
              <div
                v-if="key === 'row1'"
                :class="{
                  list_body_icon: true,
                  list_body_icon_img: item.row4 === '未处理',
                }"
              ></div>
              {{ key !== "raw" ? value : "" }}
            </div>
          </div>
        </div>
        <div
          v-if="loading"
          class="loading"
        >
          加载中...
        </div>
        <div
          v-if="errorMessage"
          class="error-message"
        >
          {{ errorMessage }}
        </div>
        <div
          v-if="!hasMore && list.length > 0 && !errorMessage"
          class="no-more"
        >
          没有更多数据
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from "vue";
  import TitleComponent from "./titleComponent.vue";
  import { getErrorAlert } from "@/apis/errorAlert";
  import { errorAlertSubject } from "@/utils/errorAlertSubject";
  import dayjs from "dayjs";
  import { wsService } from "@/utils/websocket";
import { getDeviceInfo } from "@/apis/getDeviceInfo";

  const titleMap = ref(["设备", "异常描述", "发生时间", "状态", "操作"]);
  const list = ref<any[]>([]);

  let timer: number;

  const pageSize = ref(10);
  const currentPage = ref(1);
  const loading = ref(false);
  const hasMore = ref(true);

  const props = defineProps<{
    device_type: string[];
  }>();

  const errorMessage = ref("");
  const retryCountdown = ref(0);

  const unprocessedAlertCount = ref(0);

  const getDisplayData = (item: any) => {
    const { raw, ...displayData } = item;
    return displayData;
  };

  const loadData = async (isRefresh = true) => {
    if (loading.value || (!hasMore.value && !isRefresh)) return;

    try {
      loading.value = true;
      errorMessage.value = "";

      const data = await getErrorAlert({
        page: isRefresh ? 1 : currentPage.value,
        pageSize: pageSize.value,
        device_type: props.device_type.join(","),
      });

      const formattedData = data.map((item) => ({
        row1: item.location,
        row2: item.msg_content?.substring(0, 15) || "",
        row3: dayjs(item.create_time).format("YYYY/MM/DD HH:mm"),
        row4: item.is_processed ? "已处理" : "未处理",
        row5: "查看",
        raw: item,
      }));

      if (isRefresh) {
        if (formattedData.length > 0) {
          list.value = formattedData;
          currentPage.value = 2;
        }
      } else {
        list.value = [...list.value, ...formattedData];
        if (formattedData.length === pageSize.value) {
          currentPage.value++;
        }
      }

      hasMore.value = formattedData.length === pageSize.value;

      function dianziweilanbaojing(alarmName: string, warning: boolean) {
        // 电子围栏的异常列表里有异常的时候调用这个传true，如果异常解决了，就传false
        console.log("电子围报警" + warning);
        window.ue.call(
          "dianziweilanbaojing",
          {
            AlarmName: alarmName,
            Warning: warning,
          },
          function (rv) {
            console.log("ue callback:" + rv);
          }
        );
      }

      for (const item of data) {
        if (item.device_type_name === "电子围栏" && item.is_processed === 0) {
          const deviceData = await getDeviceInfo(item.device_name);
          dianziweilanbaojing(deviceData[0].realtime_data.Channel, true);
        }
      }
    } catch (error) {
      console.error("加载异常告警数据失败:", error);
      hasMore.value = false;
      list.value = isRefresh ? [] : list.value;
      errorMessage.value = "数据加载失败，30秒后重试";

      retryCountdown.value = 30;
      const countdownTimer = setInterval(() => {
        retryCountdown.value--;
        errorMessage.value = `数据加载失败，${retryCountdown.value}秒后重试`;
        if (retryCountdown.value <= 0) {
          clearInterval(countdownTimer);
        }
      }, 1000);
    } finally {
      loading.value = false;
    }
  };

  const errorAlertSubjectSub = errorAlertSubject.subscribe((item) => {
    if (item === null) {
      loadData();
    }
  });

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement;
    const scrollHeight = target.scrollHeight;
    const scrollTop = target.scrollTop;
    const clientHeight = target.clientHeight;

    if (scrollHeight - scrollTop - clientHeight < 20) {
      loadData(false);
    }
  };

  onMounted(() => {
    loadData(true);

    // 订阅告警消息
    wsService.subscribe("unprocessed_alert_count", (count: number) => {
      console.log("收到未处理告警数:", count);
      // 如果未处理告警数发生变化，重新加载数据
      if (unprocessedAlertCount.value !== count) {
        unprocessedAlertCount.value = count;
        loadData(true);
      }
    });

    // 保留原有的定时刷新作为备份机制
    timer = setInterval(() => loadData(true), 30000);
  });

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer);
    }
    // 取消 WebSocket 订阅
    wsService.unsubscribe("unprocessed_alert_count", loadData);
    errorAlertSubjectSub.unsubscribe();
  });

  const handleItemClick = (item: any) => {
    errorAlertSubject.next(item);
    console.log(item);
  };
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
    margin-top: 10px;
    width: 207px;
    height: 126px;
  }

  .list_header {
    width: 207px;
  }

  .list_body {
    width: 207px;
    height: 87px;
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

  .loading,
  .no-more {
    text-align: center;
    padding: 5px 0;
    font-size: 12px;
    color: #94dcef;
  }

  .error-message {
    text-align: center;
    padding: 5px 0;
    font-size: 12px;
    color: #ff6b6b;
  }

  .col:last-child {
    cursor: pointer;
  }

  .col:last-child:hover {
    text-decoration: underline;
  }
</style>
