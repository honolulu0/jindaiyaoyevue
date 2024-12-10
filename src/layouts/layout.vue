<template>
  <AspectRatioContainer>
    <Top />
    <Transition name="fade">
      <div v-if="isShow">
        <div class="bg_left"></div>
        <div class="bg_right"></div>
        <slot></slot>
        <div
          class="close_word_btn"
          @click="close"
        >
          <span>关闭</span>
        </div>
        <div
          class="close_btn"
          @click="close"
        ></div>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="!isShow">
        <div
          class="open_btn"
          @click="open"
        >
          <span>开启</span>
        </div>
        <div
          class="close_btn_open"
          @click="open"
        ></div>
      </div>
    </Transition>

    <div
      class="model"
      v-if="modelOpen"
    >
      <div
        v-if="modelContent === 'defenseDeploymentSuccess'"
        class="defense_deployment_success"
      >
        <div class="defense_deployment_success_close_btn"></div>
        <div class="defense_deployment_success_content"></div>
      </div>
    </div>
  </AspectRatioContainer>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import Top from "./top.vue";
  import AspectRatioContainer from "@/components/aspectRatioContainer.vue";
  import { modelSubject } from "@/event";

  const isShow = ref(true);
  const modelOpen = ref(false);
  const modelContent = ref("");

  modelSubject.subscribe((res) => {
    modelOpen.value = res.isShow;
    modelContent.value = res.content;
  });

  function close() {
    isShow.value = false;
  }

  function open() {
    isShow.value = true;
  }
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
    font-family: SourceHanSansSC-Normal;
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

  .close_btn_open {
    background-image: url("@/assets/close_btn.png");
    background-size: 100%;
    width: 14px;
    height: 14px;
    position: absolute;
    top: 55px;
    right: 20px;
    z-index: 999;
    transform: scaleX(-1);
  }

  /* 添加淡入淡出过渡效果 */
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

  /* 添加开启按钮样式 */
  .open_btn {
    z-index: 999;
    background-image: url("@/assets/close_word_btn.png"); /* 你可能需要替换成对应的开启按钮图片 */
    background-size: 100%;
    position: absolute;
    top: 54px;
    right: 44px;
    width: 48px;
    height: 14px;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 9px;
    color: #ffffff;
    line-height: 10px;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .model {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .defense_deployment_success {
    background-image: url("@/assets/弹窗背景.png");
    background-size: 100%;
    width: 587px;
    height: 141px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .defense_deployment_success_close_btn {
    background-image: url("@/assets/关闭按钮.png");
    background-size: 100%;
    width: 14px;
    height: 14px;
  }

  .defense_deployment_success_content {
    font-family: YouSheBiaoTiHei;
    font-size: 18px;
    color: #71f3ff;
    line-height: 18px;
    letter-spacing: 3px;
    text-align: left;
    font-style: normal;
  }
</style>
