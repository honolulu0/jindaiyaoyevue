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
        </div>
      </div>
      <div class="device_list_body">
        <div
          v-for="(item, index) in deviceList"
          :key="index"
          class="device_list_content_item data_row"
          :class="{ error: hasError(item) }"
          @click="handleItemClick(item.raw)"
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
  defineProps({
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
      type: String,
      default: "",
    },
  });

  const hasError = (item: Record<string, string>) => {
    return item.row3 !== "正常";
  };

  const listTitleMap = ref<Record<string, string>>({});
  const deviceList = ref<Record<string, string>[]>([]);
  const total = ref(0);
  const currentPage = ref(1);
  const pageSize = ref(10000);
  const omit = ref(["device_name"]);

  // 获取设备列表数据
  const fetchDeviceList = async () => {
    try {
      const res = await getDeviceList({
        location: searchValue.value,
        page: currentPage.value,
        page_size: pageSize.value,
      });

      listTitleMap.value = res.headers;
      deviceList.value = res.items.map((item, index) => ({
        ...item,  // 保持原有的所有字段
        raw: res.rawItems[index]  // 添加原始数据
      }));
      total.value = res.total;
    } catch (error) {
      console.error("获取设备列表失败:", error);
    }
  };

  // 监听搜索值变化
  watch(searchValue, () => {
    currentPage.value = 1; // 重置页码
    fetchDeviceList();
  });

  // 初始化加载数据
  onMounted(() => {
    fetchDeviceList();
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
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;     /* Firefox */
  }

  .device_list_body::-webkit-scrollbar {
    display: none;            /* Chrome, Safari and Opera */
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
    cursor: pointer;
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
</style>
