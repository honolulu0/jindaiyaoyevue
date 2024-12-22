<template>
  <Transition name="fade">
    <div
      class="bg_left"
      v-show="isShow"
    ></div>
  </Transition>
  <Transition name="fade">
    <div
      class="bg_right"
      v-show="isShow"
    ></div>
  </Transition>
  <Transition name="fade">
    <div
      class="bg_all_black"
      v-show="isShowAllBlack && isShow"
    ></div>
  </Transition>
  <Layout>
    <RouterView></RouterView>
  </Layout>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import Layout from "./layouts/layout.vue";
  import { isShowSubject, isShowAllBlackSubject } from "./utils/isShowSubject";

  const isShow = ref(true);
  const isShowAllBlack = ref(false);

  isShowSubject.subscribe((v) => {
    isShow.value = v;
  });

  isShowAllBlackSubject.subscribe((v) => {
    isShowAllBlack.value = v;
  });
</script>

<style scoped>
  .bg_all_black {
    position: absolute;
    z-index: 0;
    background-color: rgba(10, 19, 28, 0.8);
    width: 100vw;
    height: 100vh;
  }
  .bg_left {
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.9),
      rgba(0, 0, 0, 0)
    );
    width: 40vw;
    height: 100vh;
    background-size: 100%;
    z-index: 0;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
  }

  .bg_right {
    background-image: linear-gradient(
      to left,
      rgba(0, 0, 0, 0.9),
      rgba(0, 0, 0, 0)
    );
    width: 40vw;
    height: 100vh;
    background-size: 100%;
    background-size: cover;
    z-index: 0;
    position: absolute;
    top: 0;
    right: 0;
  }

  /* 添加过渡效果 */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }
</style>
