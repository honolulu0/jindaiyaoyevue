<template>
  <div class="security_equipment">
    <TitleComponent titleText="园区政策" />
    <div class="content">
      <div
        class="content_item"
        v-for="item in contentItem"
        :key="item.title"
      >
        <div
          class="content_item_icon"
          :style="{ backgroundImage: item.url }"
        ></div>
        <div class="content_item_title">{{ item.title }}</div>
        <div class="content_item_number">{{ item.number }}{{ item.unit }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TitleComponent from "./titleComponent.vue";
  import { ref, onMounted } from "vue";
  import { getPolicy } from "@/apis/getPolicy";

  const baseUrl = import.meta.url.substring(
    0,
    import.meta.url.lastIndexOf("/")
  );

  const contentItem = ref([
    {
      title: "省级政策",
      number: 0,
      unit: "条",
      url: `url(${encodeURI(`${baseUrl}/../assets/parkPolicy/政策icon.png`)})`,
    },
    {
      title: "市级政策",
      number: 0,
      unit: "条",
      url: `url(${encodeURI(`${baseUrl}/../assets/parkPolicy/政策icon.png`)})`,
    },
    {
      title: "其他政策",
      number: 0,
      unit: "条",
      url: `url(${encodeURI(`${baseUrl}/../assets/parkPolicy/政策icon.png`)})`,
    },
  ]);

  onMounted(async () => {
    try {
      const policyData = await getPolicy();
      contentItem.value[0].number = policyData.province.total;
      contentItem.value[1].number = policyData.city.total;
      contentItem.value[2].number = policyData.other.total;
    } catch (error) {
      console.error('获取政策数据失败:', error);
    }
  });
</script>

<style scoped>
  .security_equipment {
    position: absolute;
    top: 97px;
    left: 53px;
    width: 206px;
    height: 132px;
  }
  .content {
    width: 100%;
    height: calc(100% - 35px);
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  .content_item {
    width: calc(50% - 10px);
    height: calc(50% - 10px);
    margin: 5px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url("@/assets/parkFacilities/智能设备背景icon.png");
  }
  .content_item_title {
    font-family: "SourceHanSansSC-Normal";
    font-weight: 600;
    font-size: 8px;
    color: #e4f3ff;
    line-height: 12px;
    text-align: left;
    font-style: normal;
    margin-left: 45px;
    margin-top: 2px;
  }
  .content_item_number {
    height: 17px;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 12px;
    color: #00f8f4;
    line-height: 17px;
    text-align: left;
    font-style: normal;
    margin-left: 45px;
  }
  .content_item_icon {
    position: absolute;
    margin-left: 16px;
    margin-top: 9px;
    width: 20px;
    height: 20px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url("@/assets/parkPolicy/政策icon.png");
  }
</style>
