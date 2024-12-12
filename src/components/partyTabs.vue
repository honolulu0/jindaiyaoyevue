<template>
  <div class="tab_container">
    <div
      v-for="(tab, index) in tabs"
      :key="index"
      class="tab_item"
      :class="{ active: tab.isActive }"
      :style="{ left: 77 * index + 'px' }"
    >
      <div
        :style="{ backgroundImage: tab.icon }"
        class="tab_icon"
      />
      <span class="tab_text">{{ tab.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from "vue";
  const baseUrl = import.meta.url.substring(
    0,
    import.meta.url.lastIndexOf("/")
  );
  const tabs = reactive([
    {
      name: "园区政策",
      icon: `url(${encodeURI(`${baseUrl}/../assets/party/园区政策icon.png`)})`,
      isActive: false,
    },
    {
      name: "园区企业",
      icon: `url(${encodeURI(`${baseUrl}/../assets/party/园区企业icon.png`)})`,
      isActive: false,
    },
    {
      name: "园区服务",
      icon: `url(${encodeURI(`${baseUrl}/../assets/party/园区服务icon.png`)})`,
      isActive: false,
    },
    {
      name: "园区党建",
      icon: `url(${encodeURI(`${baseUrl}/../assets/party/党徽icon.png`)})`,
      isActive: true,
    },
  ]);

  const handleClick = (index: number) => {
    tabs.forEach((tab, i) => {
      tab.isActive = i === index;
    });
  };
</script>

<style scoped>
  .tab_container {
    width: 323px;
    height: calc(33px - 13px);
    align-items: center;
    position: absolute;
    left: 379px;
    top: 98px;
    background-image: url("@/assets/party/二级标题背景.png");
    background-size: 100% 100%;
  }

  .tab_item {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1px;
    width: 92px;
    height: 20px;
    cursor: pointer;
    background-image: url("@/assets/party/园区政策背景.png");
    background-size: 100% 100%;
  }

  .tab_icon {
    width: 9px;
    height: 9px;
    background-size: 100% 100%;
  }

  .tab_text {
    display: flex;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 8px;
    color: #d4baa4;
    line-height: 9px;
    text-align: left;
    font-style: normal;
  }

  .active {
    background-image: url("@/assets/party/选中样式-背景.png");
    background-size: 100% 100%;
  }
</style>
