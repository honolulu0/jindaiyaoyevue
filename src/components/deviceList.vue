<template>
  <div
    class="device_list"
    :style="{ top: top + 'px', left: left + 'px', height: height + 'px' }"
  >
    <div class="title_bg"></div>
    <div class="title">设备列表</div>
    <div class="search_box"></div>
    <input
      type="text"
      placeholder="请输入设备名称"
      class="search_input"
      v-model="searchValue"
    />
    <div class="device_list_content">
      <div class="device_list_header">
        <div class="device_list_content_item title_row">
          <template
            v-for="(item, key) in listTitleMap"
            :key="key"
          >
            <div
              v-if="!omit?.includes(key)"
              class="col title_col"
            >
              {{ item }}
            </div>
          </template>
          <div class="col title_col">
            查看
          </div>
        </div>
      </div>
      <div
        class="device_list_body"
        @scroll="handleScroll"
      >
        <div
          v-for="(item, index) in deviceList"
          :key="index"
          class="device_list_content_item data_row"
          :class="{ error: hasError(item) }"
        >
          <template
            v-for="(value, key) in item"
            :key="key"
          >
            <div
              v-if="key !== 'raw'"
              class="col"
            >
              {{ value }}
            </div>
          </template>
          <div 
            class="col action-col"
            @click="handleItemClick(item.raw)"
          >
            查看
          </div>
        </div>
        <div
          v-if="loading"
          class="loading"
        >
          加载中...
        </div>
        <div
          v-if="!hasMore && deviceList.length > 0"
          class="no-more"
        >
          没有更多数据
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch, computed } from "vue";
  import { getDeviceList } from "@/apis/getDeviceList";
  import { deviceSelectSubject } from "@/utils/deviceSelectSubject";

  const searchValue = ref("");
  const props = defineProps({
    top: {
      type: Number,
      default: 305,
    },
    left: {
      type: Number,
      default: 20,
    },
    height: {
      type: Number,
      default: 250,
    },
    deviceType: {
      type: Array,
      default: [],
    },
  });

  const hasError = (item: Record<string, string>) => {
    return item.row3 !== "正常";
  };

  const listTitleMap = ref<Record<string, string>>({});
  const deviceList = ref<Record<string, string>[]>([]);
  const total = ref(0);
  const currentPage = ref(1);
  const pageSize = ref(20);
  const omit = ref(["device_name"]);
  const loading = ref(false);
  const hasMore = ref(true);

  // 获取设备列表数据
  const fetchDeviceList = async (isRefresh = true) => {
    if (loading.value || (!hasMore.value && !isRefresh)) return;

    try {
      loading.value = true;
      if (isRefresh) {
        currentPage.value = 1;
        deviceList.value = [];
      }

      const res = await getDeviceList({
        location: searchValue.value,
        device_type_names: props.deviceType as string[],
        page: currentPage.value,
        page_size: pageSize.value,
      });

      listTitleMap.value = res.headers;
      const formattedData = res.items.map((item, index) => ({
        ...item,
        raw: res.rawItems[index],
      }));

      deviceList.value = isRefresh
        ? formattedData
        : [...deviceList.value, ...formattedData];
      total.value = res.total;

      // 判断是否还有更多数据
      hasMore.value = formattedData.length === pageSize.value;
      if (hasMore.value) {
        currentPage.value++;
      }
    } catch (error) {
      console.error("获取设备列表失败:", error);
    } finally {
      loading.value = false;
    }
  };

  // 添加滚动监听函数
  const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement;
    const scrollHeight = target.scrollHeight;
    const scrollTop = target.scrollTop;
    const clientHeight = target.clientHeight;

    if (scrollHeight - scrollTop - clientHeight < 20) {
      fetchDeviceList(false);
    }
  };

  // 修改搜索监听，使用防抖
  let searchTimer: number | null = null;
  watch(searchValue, () => {
    if (searchTimer) {
      clearTimeout(searchTimer);
    }
    searchTimer = setTimeout(() => {
      fetchDeviceList(true);
    }, 300);
  });

  // 初始化加载数据
  onMounted(() => {
    fetchDeviceList(true);
  });

  // 修改点击处理函数，改为发出事件
  const handleItemClick = (item: Record<string, string>) => {
    deviceSelectSubject.next(item);
  };
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
    position: relative;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }

  .device_list_body::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
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

  .data_row:hover {
    background-color: rgba(97, 119, 138, 0.4);
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

  .loading,
  .no-more {
    text-align: center;
    padding: 5px 0;
    font-size: 12px;
    color: #94dcef;
    width: 100%;
  }

  .action-col {
    cursor: pointer;
  }

  .action-col:hover {
    color: #ffffff;
  }
</style>
