<template>
  <div class="party_build_activity">
    <PartyTitle titleText="党建活动" />
    <div class="party_build_activity_content">
      <div
        class="party_build_activity_content_item"
        v-for="item in partyBuildActivityContentItemList"
        :key="item.title"
      >
        <div class="party_build_activity_content_item_img"></div>
        <div class="party_build_activity_content_item_text">
          <span class="party_build_activity_content_item_text_title">
            {{ item.title }}
          </span>
          <span class="party_build_activity_content_item_text_value">
            <p>{{ item.time }}</p>
            <div>{{ item.value }}</div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import PartyTitle from "@/components/partyTitle.vue";
  import { ref } from "vue";
  const partyBuildActivityContentItemList = ref([
    {
      title: "金岱生物医药产业园2024年度党建活动圆满结束",
      value:
        "金岱生物医药产业园于2024年12月于郑州国际会展中心举行为期一年一度党建活动，活动圆满结束。",
      time: "2024-12-11",
    },
    {
      title: "金岱生物医药产业园2024年度党建活动圆满结束",
      value:
        "金岱生物医药产业园于2024年12月于郑州国际会展中心举行为期一年一度党建活动，活动圆满结束。",
      time: "2024-12-11",
    },
  ]);
</script>

<style scoped>
  .party_build_activity {
    position: absolute;
    top: 222px;
    right: 53px;
    width: 206px;
    height: 159px;
  }

  .party_build_activity_content {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 33px;
    margin-top: 5px;
    height: 136px;
    gap: 10px;
  }

  .party_build_activity_content_item {
    display: flex;
    width: 100%;
    height: 54px;
    overflow: hidden;
    gap: 10px;
  }

  .party_build_activity_content_item_text {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .party_build_activity_content_item_text_title {
    width: 117px;
    font-family: SourceHanSansSC-Normal;
    font-weight: bold;
    font-size: 8px;
    color: #ffd54e;
    line-height: 13px;
    text-align: left;
    font-style: normal;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .party_build_activity_content_item_text_value {
    height: 18px;
    width: 117px;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 6px;
    color: #ffffff;
    line-height: 9px;
    text-align: left;
    font-style: normal;
    flex: 1;
    white-space: normal;
    line-clamp: 2;
    overflow: hidden;
    opacity: 0.8;
  }

  .party_build_activity_content_item_img {
    width: 81px;
    height: 57px;
    background-size: 100% 100%;
    background-image: url("@/assets/party/党建活动图.png");
  }
</style>
