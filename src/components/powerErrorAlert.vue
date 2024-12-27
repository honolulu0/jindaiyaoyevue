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
      <div class="list_body" @scroll="handleScroll">
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
        <div v-if="loading" class="loading">加载中...</div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <div v-if="!hasMore && list.length > 0 && !errorMessage" class="no-more">没有更多数据</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted, defineProps } from "vue";
  import TitleComponent from "./titleComponent.vue";
  import { getErrorAlert } from "@/apis/errorAlert";
  import type { ErrorAlert } from "@/apis/errorAlert";
  import { errorAlertSubject } from "@/utils/errorAlertSubject";
  import dayjs from "dayjs";
  import { wsService } from '@/utils/websocket'

  const titleMap = ref(["设备", "异常描述", "发生时间", "状态", "操作"]);
  const list = ref<any[]>([]);

  const props = defineProps({
    deviceType: {
      type: Array,
      default: () => ["1", "2", "11"]
    }
  });

  const chartData = ref([
    { titleText: "2#1AW1", value: 100 },
    { titleText: "2#1AW2", value: 20 },
    { titleText: "2#1AW3", value: 10 },
    { titleText: "2#1AW4", value: 63 },
    { titleText: "2#1AW5", value: 270 },
    { titleText: "2#1AW6", value: 270 },
    { titleText: "2#1AW7", value: 270 },
    { titleText: "2#1AW8", value: 270 },
    { titleText: "1#1AW1", value: 270 },
    { titleText: "1#1AW2", value: 270 },
    { titleText: "1#1AW3", value: 270 },
    { titleText: "1#1AW4", value: 270 },
    { titleText: "1#1AW5", value: 270 },
    { titleText: "1#1AW6", value: 270 },
    { titleText: "1#1AW7", value: 270 },
    { titleText: "1#1AW8", value: 270 },
    { titleText: "2#-1ALZ4", value: 270 },
    { titleText: "2#-1ALZ3", value: 270 },
    { titleText: "-1AB2", value: 270 },
    { titleText: "2#-1APZ2", value: 270 },
    { titleText: "2#-1AP2", value: 270 },
    { titleText: "2#-1AB2", value: 270 },
    { titleText: "1#-1AP2", value: 270 },
    { titleText: "1#1AB2", value: 270 },
    { titleText: "1#-1APZ1", value: 270 },
    { titleText: "1#-1APZ2", value: 270 },
    { titleText: "1#-1AZE1", value: 270 },
    { titleText: "1#-1ALE2", value: 270 },
    { titleText: "1#-1APZ2", value: 270 },
    { titleText: "-1AB2", value: 270 },
    { titleText: "-1AB1", value: 270 },
    { titleText: "1#-1ALZ4", value: 270 },
    { titleText: "1#-1ALZ3", value: 270 },
    { titleText: "1#-1ALZ2", value: 270 },
    { titleText: "1#-1ALZ1", value: 270 },
    { titleText: "-1AB1", value: 270 },
    { titleText: "2#-1APZ1", value: 270 },
    { titleText: "2#-1ALZ1", value: 270 },
    { titleText: "2#-1ALE1", value: 270 },
    { titleText: "-1ALG1", value: 270 },
    { titleText: "2#-1ALZ2", value: 270 },
    { titleText: "apxf", value: 270 },
    { titleText: "ALZ2", value: 270 },
    { titleText: "ALZ1", value: 270 },
    { titleText: "APCD", value: 270 },
    { titleText: "-1ALE", value: 270 }
  ]);

  const getDisplayData = (item: any) => {
    const { raw, ...displayData } = item;
    return displayData;
  };

  let timer: number | null = null;

  const pageSize = ref(10);
  const currentPage = ref(1);
  const loading = ref(false);
  const hasMore = ref(true);

  const errorMessage = ref('');
  const retryCountdown = ref(0);

  const unprocessedAlertCount = ref(0);

  const loadData = async (isRefresh = true) => {
    if (loading.value || (!hasMore.value && !isRefresh)) return;
    
    try {
      loading.value = true;
      errorMessage.value = '';
      if (isRefresh) {
        currentPage.value = 1;
        list.value = [];
      }
      
      const data = await getErrorAlert({
        device_type: props.deviceType.join(","),
        page: currentPage.value,
        pageSize: pageSize.value
      });

      const formattedData = data.map((item: any) => ({
        raw: item,
        row1: item.titleText,
        row2: "正常",
        row3: dayjs(Date.now()).format("YYYY/MM/DD HH:mm"),
        row4: '已处理',
        row5: '查看'
      }));

      list.value = isRefresh ? formattedData : [...list.value, ...formattedData];
      
      hasMore.value = formattedData.length === pageSize.value;
      if (hasMore.value) {
        currentPage.value++;
      }
    } catch (error) {
      console.error('加载异常告警数据失败:', error);
      hasMore.value = false;
      list.value = isRefresh ? [] : list.value;
      errorMessage.value = '数据加载失败，30秒后重试';
      
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

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement;
    const scrollHeight = target.scrollHeight;
    const scrollTop = target.scrollTop;
    const clientHeight = target.clientHeight;
    
    if (scrollHeight - scrollTop - clientHeight < 20) {
      loadData(false);
    }
  };

  const subscription = errorAlertSubject.subscribe((item) => {
    if (item === null) {
      loadData();
    }
  });

  onMounted(() => {
    loadData(true);
    
    // 订阅告警消息
    wsService.subscribe('unprocessed_alert_count', (count: number) => {
      console.log('收到未处理告警数:', count);
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
      timer = null;
    }
    // 取消 WebSocket 订阅
    wsService.unsubscribe('unprocessed_alert_count', loadData);
    subscription.unsubscribe();
  });
</script>

<style scoped>
  .error_alert {
    position: absolute;
    bottom: 9px;
    right: 20px;
    z-index: 1000;
    width: 236px;
    height: 134px;
  }

  .list_content {
    width: 236px;
    height: 80%;
  }

  .list_header {
    width: 236px;
  }

  .list_body {
    width: 236px;
    height: 80%;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .list_content_item {
    width: 236px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 12px;
  }

  .title_row {
    width: 236px;
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
</style>
