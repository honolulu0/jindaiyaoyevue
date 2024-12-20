<template>
  <div class="party_build_data">
    <PartyTitle titleText="党建数据" />
    <div class="party_build_data_content">
      <div
        class="party_build_data_content_item"
        v-for="item in partyBuildDataContentItemList"
        :key="item.title"
      >
        <div class="party_build_data_content_item_icon"></div>
        <div class="party_build_data_content_item_text">
          <span class="party_build_data_content_item_text_title">{{
            item.title
          }}</span>
          <span class="party_build_data_content_item_text_value"
            >{{ item.value }}{{ item.unit }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import PartyTitle from "@/components/partyTitle.vue";
  import { ref, onMounted } from "vue";
  import { getPartyBuildingData } from "@/apis/getPartyBuildingData";

  const partyBuildDataContentItemList = ref([
    {
      title: "园区党组支部",
      value: "0",
      unit: "个",
    },
    {
      title: "园区党员人数",
      value: "0",
      unit: "人",
    },
    {
      title: "正式党员人数",
      value: "0",
      unit: "人",
    },
    {
      title: "预备党员人数",
      value: "0",
      unit: "人",
    },
  ]);

  onMounted(async () => {
    const res = await getPartyBuildingData();
    partyBuildDataContentItemList.value = [
      {
        title: "园区党组支部",
        value: res.totalMemberBranch.toString(),
        unit: "人",
      },
      {
        title: "园区党员人数",
        value: res.totalMember.toString(),
        unit: "人",
      },
      {
        title: "正式党员人数",
        value: res.isOfficial.toString(),
        unit: "人",
      },
      {
        title: "预备党员人数",
        value: res.unOfficial.toString(),
        unit: "人",
      },
    ];
  });
</script>

<style scoped>
  .party_build_data {
    position: absolute;
    top: 95px;
    right: 53px;
    width: 206px;
    height: 109px;
  }

  .party_build_data_content {
    width: 206px;
    height: calc(100% - 35px);
    margin-top: 20px;
    margin-left: 10px;
    padding-right: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 15px;
  }

  .party_build_data_content_item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 77px;
    height: 32px;
  }

  .party_build_data_content_item_icon {
    width: 28px;
    height: 32px;
    background-image: url("@/assets/party/党徽icon.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .party_build_data_content_item_text {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .party_build_data_content_item_text_title {
    width: max-content;
    height: 9px;
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 500;
    font-size: 6px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 9px;
    text-align: left;
    font-style: normal;
  }

  .party_build_data_content_item_text_value {
    width: max-content;
    height: 13px;
    font-family: "SourceHanSansSC-Normal";
    font-weight: bold;
    font-size: 12px;
    color: #ffffff;
    line-height: 13px;
    text-align: left;
    font-style: normal;
  }
</style>
