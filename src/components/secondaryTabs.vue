<template>
  <div class="tab_container">
    <div
      v-for="(tab, index) in tabs"
      :key="index"
      class="tab_item"
      :class="{ active: tab.isActive }"
      :style="{ left: tab.isActive ? 77.7 * index + 'px' : 76 * index + 'px' }"
      @click="handleClick(index)"
    >
      <div
        :style="{ backgroundImage: tab.icon, marginRight: 1.5 + 'px' }"
        class="tab_icon"
      />
      <span class="tab_text">{{ tab.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from "vue-router";
  import { reactive } from "vue";
  const router = useRouter();
  const baseUrl = import.meta.url.substring(
    0,
    import.meta.url.lastIndexOf("/")
  );
  const props = defineProps<{
    activeIndex: number;
  }>();
  const tabs = reactive([
    {
      name: "园区政策",
      icon: `url(${encodeURI(
        `${baseUrl}/../assets/parkPolicy/蓝色-园区政策icon.png`
      )})`,
      isActive: props.activeIndex === 0,
    },
    {
      name: "园区企业",
      icon: `url(${encodeURI(
        `${baseUrl}/../assets/parkPolicy/园区企业-默认icon.png`
      )})`,
      isActive: props.activeIndex === 1,
    },
    {
      name: "园区服务",
      icon: `url(${encodeURI(
        `${baseUrl}/../assets/parkPolicy/园区服务icon.png`
      )})`,
      isActive: props.activeIndex === 2,
    },
    {
      name: "园区党建",
      icon: `url(${encodeURI(
        `${baseUrl}/../assets/parkPolicy/园区党建icon.png`
      )})`,
      isActive: props.activeIndex === 3,
    },
  ]);

  const handleClick = (index: number) => {
    tabs.forEach((tab, i) => {
      tab.isActive = i === index;
    });
    if (index === 0) {
      router.push("/parkPolicy");
    } else if (index === 1) {
      router.push("/parkEnterprise");
    } else if (index === 2) {
      router.push("/parkServices");
    } else if (index === 3) {
      router.push("/partyBuilding");
    }
  };
</script>

<style scoped>
  .tab_container {
    width: 323px;
    height: 22px;
    align-items: center;
    position: absolute;
    left: 379px;
    top: 98px;
    background-image: url("@/assets/parkPolicy/蓝色-二级标签背景.png");
    background-size: 100% 100%;
  }

  .tab_item {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 93px;
    height: 20px;
    cursor: pointer;
    background-image: url("@/assets/parkPolicy/蓝色-园区企业背景.png");
    background-size: 100% 100%;
  }

  .tab_icon {
    width: 9px;
    height: 9px;
    background-size: 100% 100%;
  }

  .tab_text {
    width: 33px;
    height: 9px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 8px;
    color: #d9f1fd;
    line-height: 9px;
    text-align: left;
    font-style: normal;
  }

  .active {
    background-image: url("@/assets/parkPolicy/蓝色-选中状态.png");
    background-size: contain;
    z-index: 20;
  }
</style>
