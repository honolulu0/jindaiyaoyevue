<template>
  <div class="park-enterprise-list">
    <TitleComponent titleText="企业规模列表" />
    <div class="list-content">
      <div class="list-header">
        <div class="list-row title-row">
          <div class="row-item">{{ titleMap.row1 }}</div>
          <div class="row-item min-w-28">{{ titleMap.row2 }}</div>
          <div class="row-item">{{ titleMap.row3 }}</div>
        </div>
      </div>
      <div class="list-body">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="list-row"
        >
          <div class="row-item">{{ item.row1 }}</div>
          <div class="row-item min-w-28">{{ item.row2 }}</div>
          <div class="row-item">{{ item.row3 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TitleComponent from "./titleComponent.vue";
  import { ref, onMounted, onUnmounted } from "vue";
  import {
    getEnterpriseData,
    type Enterprise,
  } from "../apis/getEnterpriseData";

  const titleMap = ref({
    row1: "序号",
    row2: "企业名称",
    row3: "企业规模",
  });

  const list = ref<{ row1: string; row2: string; row3: string }[]>([]);

  // 将企业规模映射为中文
  const scaleMap = {
    SMALL: "小型",
    NORMAL: "中型",
    OTHER: "大型",
  };

  const scaleNumMap = {
    SMALL: 2, // 小型，最后面
    NORMAL: 1, // 中型
    OTHER: 0, // 大型，最前面
  };

  // 获取并处理数据
  const fetchData = async () => {
    try {
      const enterprises = await getEnterpriseData();
      list.value = enterprises
        .map((item, index) => ({
          row1: (index + 1).toString(),
          row2: item.name,
          row3: scaleMap[item.scale],
          row4: scaleNumMap[item.scale],
        }))
        .sort((a, b) => a.row4 - b.row4);
    } catch (error) {
      console.error("获取企业数据失败:", error);
    }
  };

  let timer: number;

  onMounted(() => {
    fetchData();
    // 每5分钟刷新一次数据
    timer = setInterval(fetchData, 5 * 60 * 1000);
  });

  onUnmounted(() => {
    // 组件销毁时清除定时器
    clearInterval(timer);
  });
</script>

<style scoped>
  .park-enterprise-list {
    position: absolute;
    right: 53px;
    top: 408px;
    width: 206px;
    height: 126px;
  }

  .list-content {
    width: 100%;
    height: calc(100% - 20px);
    margin-top: 20px;
  }

  .list-header {
    width: 100%;
  }

  .list-body {
    width: 100%;
    height: calc(100% - 14px);
    overflow-y: auto;
    overflow-x: hidden;
  }

  .list-row {
    width: 100%;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
  }

  .title-row {
    background: rgba(97, 119, 138, 0.4);
  }

  .row-item {
    flex: 1;
    color: #ffffff;
    font-family: "SourceHanSansSC-Normal";
    font-weight: 600;
    font-size: 6px;
    line-height: 6px;
    text-align: center;
  }

  .list-body::-webkit-scrollbar {
    width: 1px;
    background: transparent;
  }

  .list-body::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 1px;
  }

  .list-body::-webkit-scrollbar-track {
    background: transparent;
  }

  .list-body::-webkit-scrollbar-corner {
    display: none;
  }

  .list-body::-webkit-scrollbar-horizontal {
    display: none;
  }
</style>
