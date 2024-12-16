<template>
  <div class="policy_detail">
    <TitleComponent titleText="政策详情" />
    <div class="policy_detail_content">
      <div
        class="policy_detail_content_item"
        v-for="item in policyDetailContent"
        :key="item.label"
      >
        <div class="policy_detail_content_item_label">{{ item.label }}</div>
        <div class="policy_detail_content_item_title">{{ item.title }}</div>
        <div></div>
        <div class="policy_detail_content_item_text">
          <p v-html="item.text"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TitleComponent from "@/components/titleComponent.vue";
  import { ref } from "vue";

  const policyDetailContent = ref([
    {
      label: "01.",
      title: "研发创新支持",
      text: `对获得国家级高新技术企业认定的企业，给予50万元一次性奖励。<br/>对企业年度研发投入超过500万元的，按实际投入的10%给予补助，最高不超过200万元。<br/>支持企业建设研发机构，对新认定的市级重点实验室给予100万元资助。`,
    },
    {
      label: "02.",
      title: "人才引进支持",
      text: `对全职引进的海外高层次人才，给予最高300万元的住房补贴。<br/>支持企业引进博士及以上高层次人才，每引进1名给予企业10万元补助。<br/>对新引进的高层次人才团队项目，最高给予1000万元的项目资助。`,
    },
    {
      label: "03.",
      title: "产业发展支持",
      text: `对新入驻园区的规上工业企业，给予最高200万元的装修补贴。<br/>支持企业开拓市场，对参加境内外展会的企业，给予展位费50%的补贴。<br/>对年度营收首次突破1亿元的企业，给予20万元奖励。`,
    },
  ]);
</script>

<style scoped>
  .policy_detail {
    position: absolute;
    right: 53px;
    top: 97px;
    width: 206px;
    height: 304px;
  }

  .policy_detail_content {
    position: absolute;
    left: 0;
    top: 35px;
    width: 100%;
    height: calc(100% - 35px);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .policy_detail_content_item {
    display: grid;
    grid-template-columns: 1fr 10.76fr;
  }

  .policy_detail_content_item_label {
    font-family: YouSheBiaoTiHei;
    font-size: 9px;
    color: #00f8f4;
    line-height: 12px;
    text-align: left;
    font-style: normal;
    display: flex;
    align-items: center;
  }

  .policy_detail_content_item_title {
    width: 183px;
    height: 21px;
    font-family: YouSheBiaoTiHei;
    font-size: 7px;
    color: #ffffff;
    line-height: 9px;
    text-align: left;
    font-style: normal;
    display: flex;
    align-items: center;
    padding-left: 20px;
    background-image: url("@/assets/parkPolicy/标签背景.png");
    background-size: contain;
    background-repeat: no-repeat;
  }

  .policy_detail_content_item_text {
    height: min-content;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 6px;
    color: #e4f3ff;
    line-height: 13px;
    text-align: left;
    font-style: normal;
    opacity: 0.8;
    word-break: break-all;
  }

  p {
    margin-top: 5px;
  }
</style>
