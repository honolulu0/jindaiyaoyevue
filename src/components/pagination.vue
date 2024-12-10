<template>
  <div class="pagination-container">
    <div class="page-numbers">
      <div
        v-for="page in displayPages"
        :key="page"
        class="page-btn"
        :class="{ active: page === currentPage }"
        @click="setPage(page)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from "vue";

  interface Props {
    data: any[];
    pageSize?: number;
    maxDisplayPages?: number;
    interval?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    data: () => [],
    pageSize: 10,
    maxDisplayPages: 30,
  });

  const total = computed(() => props.data.length);
  const currentPage = ref(1);

  const emit = defineEmits(["currentPageData"]);

  const totalPages = computed(() => Math.ceil(total.value / props.pageSize));

  const displayPages = computed(() => {
    const pages: number[] = [];

    let start = Math.max(1, currentPage.value - 2);
    let end = Math.min(totalPages.value, start + props.maxDisplayPages - 1);

    if (end - start + 1 < props.maxDisplayPages) {
      start = Math.max(1, end - props.maxDisplayPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  });

  // setInterval(() => {
  //   currentPage.value++;
  //   if (currentPage.value > totalPages.value) {
  //     currentPage.value = 1;
  //   }
  // }, props.interval);

  watch(currentPage, () => {
    emit(
      "currentPageData",
      props.data.slice(
        (currentPage.value - 1) * props.pageSize,
        currentPage.value * props.pageSize
      )
    );
    console.log(currentPage.value);
  });

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    } else {
      currentPage.value = 1;
    }
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    } else {
      currentPage.value = totalPages.value;
    }
  };

  const setPage = (page: number) => {
    currentPage.value = page;
  };

  // 暴露方法供父组件使用
  defineExpose({
    nextPage,
    prevPage,
    setPage,
  });
</script>

<style scoped>
  .pagination-container {
    display: flex;
    align-items: center;
    width: max-content;
    height: 3px;
  }

  .page-numbers {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 4px;
  }

  .page-btn {
    width: 3px;
    height: 3px;
    background: #4c747c;
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  .page-btn.active {
    background: #72e5ff;
    width: 9px;
    height: 3px;
  }
</style>
