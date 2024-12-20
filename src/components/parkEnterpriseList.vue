<template>
  <div class="park-enterprise-list">
    <TitleComponent titleText="园区企业列表" />
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
import { getEnterpriseData, type Enterprise } from "../apis/getEnterpriseData";

const titleMap = ref({
  row1: "序号",
  row2: "企业名称", 
  row3: "企业类型"
});

// 企业类型映射表
const typeMap: Record<Enterprise['type'], string> = {
  FINANCE: "金融类",
  TECHNOLOGY: "科技类",
  INDUSTRY: "实业类",
  SERVICE: "服务类",
  OTHER: "其它"
};

const list = ref<Array<{row1: string, row2: string, row3: string}>>([]);

// 获取并处理数据
const fetchData = async () => {
  try {
    const enterprises = await getEnterpriseData();
    list.value = enterprises.map((item, index) => ({
      row1: String(index + 1),
      row2: item.name,
      row3: typeMap[item.type]
    }));
  } catch (error) {
    console.error('获取企业数据失败:', error);
  }
};

let timer: NodeJS.Timer;

onMounted(() => {
  fetchData(); // 初始加载
  timer = setInterval(fetchData, 5 * 60 * 1000); // 每5分钟刷新一次
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer); // 组件销毁时清除定时器
  }
});
</script>

<style scoped>
.park-enterprise-list {
  position: absolute;
  left: 53px;
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