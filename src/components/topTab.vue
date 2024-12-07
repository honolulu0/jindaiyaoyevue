<template>
  <div
    class="tab"
    :style="{
      backgroundImage: getBackgroundUrl,
    }"
  >
    <div
      class="_icon"
      :style="{
        backgroundImage: `url(${getIconUrl})`,
        top: iconTop,
        left: iconLeft,
        width: iconWidth,
        height: iconHeight,
      }"
    />
    <span class="_text">{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  const { name, icon, iconTop, iconLeft, iconWidth, iconHeight, isClick } =
    defineProps<{
      name: string;
      icon: string;
      iconTop: string;
      iconLeft: string;
      iconWidth: string;
      iconHeight: string;
      isClick: boolean;
    }>();
  const getIconUrl = computed(() => {
    return new URL(`../assets/${icon}`, import.meta.url).href;
  });
  const getBackgroundUrl = computed(() => {
  try {
    const baseUrl = import.meta.url.substring(0, import.meta.url.lastIndexOf('/'));
    return isClick
      ? `url(${encodeURI(`${baseUrl}/../assets/主题背景-选中.png`)})`
      : `url(${encodeURI(`${baseUrl}/../assets/主题背景-默认.png`)})`;
  } catch (error) {
    console.error('加载背景失败:', error);
    return '';
    }
  });
</script>

<style scoped>
  .tab {
    position: absolute;
    width: 102px;
    height: 22px;
    background-size: 100%;
  }

  ._text {
    position: absolute;
    top: 5px;
    left: 40px;
    width: max-content;
    height: 12px;
    font-family: YouSheBiaoTiHei;
    font-size: 9px;
    color: #a0b5c1;
    line-height: 12px;
    text-align: left;
    font-style: normal;
  }

  ._icon {
    position: absolute;
    background-size: 100%;
  }
</style>
