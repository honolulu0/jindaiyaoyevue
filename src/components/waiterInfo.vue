<template>
  <div class="waiter-info">
    <TitleComponent titleText="四保一服人员情况" />
    <div class="list_container">
      <div
        class="list_item"
        v-for="item in list"
        :key="item.title"
      >
        <div
          class="list_item_icon"
          :style="{ backgroundImage: item.icon }"
        ></div>
        <div class="list_item_text_container">
          <span class="list_item_text_title">{{ item.title }}</span>
          <span class="list_item_text_value">
            <span class="list_item_text_value_text">{{ item.value }}</span>
            <span class="list_item_text_unit">{{ item.unit }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TitleComponent from "@/components/titleComponent.vue";
  import { ref } from "vue";

  const baseUrl = import.meta.url.substring(
    0,
    import.meta.url.lastIndexOf("/")
  );

  const list = ref([
    {
      title: "保洁",
      value: "400",
      unit: "处",
      icon: `url(${encodeURI(
        `${baseUrl}/../assets/enterprises/保洁icon.png`
      )})`,
    },
    {
      title: "保安",
      value: "4",
      unit: "处",
      icon: `url(${encodeURI(
        `${baseUrl}/../assets/enterprises/保安icon.png`
      )})`,
    },
    {
      title: "保绿",
      value: "4",
      unit: "处",
      icon: `url(${encodeURI(
        `${baseUrl}/../assets/enterprises/保绿icon.png`
      )})`,
    },
    {
      title: "报修",
      value: "4",
      unit: "处",
      icon: `url(${encodeURI(
        `${baseUrl}/../assets/enterprises/报修icon.png`
      )})`,
    },
    {
      title: "客服",
      value: "4",
      unit: "处",
      icon: `url(${encodeURI(
        `${baseUrl}/../assets/enterprises/客服icon.png`
      )})`,
    },
  ]);
</script>

<style scoped>
  .waiter-info {
    position: absolute;
    top: 260px;
    left: 20px;
    width: 206px;
    height: 130px;
  }
  .list_container {
    position: absolute;
    top: 33px;
    left: 0;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    width: 206px;
    height: 97px;
  }
  .list_item {
    display: grid;
    grid-template-columns: 1fr 2fr;
    width: 87px;
    height: 33px;
  }
  .list_item_icon {
    margin-top: 4px;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .list_item_text_container {
    display: flex;
    flex-direction: column;
  }

  .list_item_text_title {
    margin-left: 12px;
    width: 12px;
    height: 8px;
    font-family: YouSheBiaoTiHei;
    font-size: 6px;
    color: #e4f3ff;
    line-height: 8px;
    text-align: left;
    font-style: normal;
    opacity: 0.6;
  }

  .list_item_text_value {
    flex: 1;
    background-image: url("@/assets/park_supporting_item_bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-left: 12px;
    padding-bottom: 10px;
    padding-right: 10px;
  }

  .list_item_text_value_text {
    width: min-content;
    height: 14px;
    font-family: YouSheBiaoTiHei;
    font-size: 11px;
    color: #d9f1fd;
    line-height: 14px;
    letter-spacing: 0px;
    text-align: left;
    font-style: normal;
  }

  .list_item_text_unit {
    width: max-content;
    height: 8px;
    font-family: YouSheBiaoTiHei;
    font-size: 6px;
    color: #e4f3ff;
    line-height: 8px;
    text-align: left;
    font-style: normal;
    opacity: 0.7;
  }
</style>
