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
    position: absolute;
    left: 24px;
    top: 7px;
    width: max-content;
    height: 13px;
    font-family: YouSheBiaoTiHei;
    font-size: 11px;
    color: transparent;
    line-height: 13px;
    /* text-shadow: 0px 0px 3px rgba(149, 135, 14, 0.37); */
    text-align: left;
    font-style: normal;
    background: linear-gradient(180deg, #ff8831 0%, #ffffff 60%, #ffffff 100%);
    -webkit-background-clip: text;
    background-clip: text;
  }

  .title_bg {
    width: 206px;
    height: 22px;
    background-size: cover;
    background-image: url("@/assets/party/红色小标题.png");
    position: absolute;
    top: 7px;
    left: 0;
  }
</style>
