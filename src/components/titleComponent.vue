<template>
  <div class="title-wrapper">
    <div class="title_bg"></div>
    <div class="title">{{ titleText }}</div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    titleText: string;
  }>();
</script>

<style scoped>
  .title-wrapper {
    position: relative;
    height: 20px;
  }

  .title {
    width: max-content;
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
</style>
