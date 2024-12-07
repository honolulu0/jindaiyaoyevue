<template>
  <AspectRatioContainer>
    <Top />
    <div class="bg_left"></div>
    <slot></slot>
    <div
      class="close_word_btn"
      @click="close"
    >
      <span>关闭</span>
    </div>
    <div class="close_btn"></div>
    <div class="bg_right"></div>
  </AspectRatioContainer>
</template>

<script setup lang="ts">
  import Top from "./top.vue";
  import AspectRatioContainer from "@/components/AspectRatioContainer.vue";

  const close = () => {};
</script>

<style scoped>
  .bg_left {
    background-image: url("@/assets/bg_left.png");
    width: 377px;
    height: 579px;
    background-size: 100%;
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
  }

  .bg_right {
    background-image: url("@/assets/bg_right.png");
    width: 377px;
    height: 579px;
    background-size: 100%;
    z-index: 0;
    position: absolute;
    top: 0;
    right: 0;
  }

  .close_word_btn {
    z-index: 999;
    background-image: url("@/assets/close_word_btn.png");
    background-size: 100%;
    position: absolute;
    top: 54px;
    right: 44px;
    width: 48px;
    height: 14px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 9px;
    color: #ffffff;
    line-height: 10px;
    letter-spacing: 0px;
    text-align: right;
    font-style: normal;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close_btn {
    background-image: url("@/assets/close_btn.png");
    background-size: 100%;
    width: 14px;
    height: 14px;
    position: absolute;
    top: 55px;
    right: 20px;
    z-index: 999;
  }
</style>
