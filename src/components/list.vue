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

</style> 