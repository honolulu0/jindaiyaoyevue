<template>
  <div class="park-enterprise-list">
    <TitleComponent titleText="园区企业列表" />
    <div class="list-content">
      <div class="list-header">
        <div class="list-row title-row">
          <div class="row-item">{{ titleMap.row1 }}</div>
          <div class="row-item">{{ titleMap.row2 }}</div>
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
          <div class="row-item">{{ item.row2 }}</div>
          <div class="row-item">{{ item.row3 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TitleComponent from "./titleComponent.vue";
import { ref } from "vue";

const titleMap = ref({
  row1: "序号",
  row2: "企业名称", 
  row3: "企业类型"
});

const list = ref([
  {
    row1: "1",
    row2: "某某科技有限公司",
    row3: "科技类"
  },
  {
    row1: "2", 
    row2: "某某金融股份有限公司",
    row3: "金融类"
  },
  {
    row1: "3",
    row2: "某某服装公司",
    row3: "实业类"
  },
  {
    row1: "4",
    row2: "某某服务有限公司", 
    row3: "服务类"
  },
  {
    row1: "5",
    row2: "某某有限公司",
    row3: "其它"
  },
  {
    row1: "6",
    row2: "某某金融股份有限公司",
    row3: "金融类" 
  }
]);
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
  line-height: 14px;
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