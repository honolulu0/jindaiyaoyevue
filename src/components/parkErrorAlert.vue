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
        >
          <div class="list_content_item data_row">
            <div
              v-for="(value, key) in getDisplayData(item)"
              :key="key"
              class="col"
              :class="{ error: item.row4 === '未处理' && key === 'row2' }"
              @click="key === 'row5' && errorAlertSubject.next(item.raw)"
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
  import { ref, onMounted, onUnmounted } from "vue";
  import TitleComponent from "./titleComponent.vue";
  import { getErrorAlert } from "@/apis/errorAlert";
  import type { ErrorAlert } from "@/apis/errorAlert";
  import { errorAlertSubject } from "@/utils/errorAlertSubject";
  import dayjs from "dayjs";
  import { wsService } from "@/utils/websocket";

  const titleMap = ref(["设备", "异常描述", "发生时间", "状态", "操作"]);
  const list = ref<any[]>([]);

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

  const loadData = async (isRefresh = true) => {
    if (loading.value || (!hasMore.value && !isRefresh)) return;
    
    try {
      loading.value = true;
      errorMessage.value = '';

      const data = await getErrorAlert({
        page: isRefresh ? 1 : currentPage.value,
        pageSize: pageSize.value,
        device_type: "1,2"
      });
      
      const formattedData = data.map(item => ({
        raw: item,
        row1: item.location,
        row2: item.msg_content,
        row3: dayjs(item.create_time).format("YYYY/MM/DD HH:mm"),
        row4: item.is_processed ? '已处理' : '未处理',
        row5: '查看'
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

  const unprocessedAlertCount = ref(0);

  onMounted(() => {
    loadData(true);
    timer = setInterval(() => loadData(true), 30000);

    wsService.subscribe('unprocessed_alert_count', (count: number) => {
      console.log('收到未处理告警数:', count);
      // 如果未处理告警数发生变化，重新加载数据
      if (unprocessedAlertCount.value !== count) {
        unprocessedAlertCount.value = count;
        loadData(true);
      }
    });
  });

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    subscription.unsubscribe();
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
