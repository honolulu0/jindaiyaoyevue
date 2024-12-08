<template>
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
        :class="{ error: item.row4 === '异常' }"
      >
        <div
          v-for="(value, key) in item"
          :key="key"
          class="col"
        >
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  titleMap: Record<string, string>
  list: Array<Record<string, string>>
}>()
</script>

<style scoped>
.list_content {
  width: 241px;
  height: 243px;
  overflow: hidden;
}

.list_header {
  width: 241px;
}

.list_body {
  width: 241px;
  height: 229px;
  overflow-y: auto;
  overflow-x: hidden;
}

.list_content_item {
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
</style> 