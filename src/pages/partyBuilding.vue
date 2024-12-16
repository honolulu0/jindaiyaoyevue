<template>
  <div class="w-full h-full absolute top-0 left-0 z-2">
    <div
      class="w-full h-full absolute top-0 left-0 z-0 bg-[#0A131C] bg-opacity-80"
    >
      <PartyTabs />
      <div class="absolute top-[227px] left-[357px]">
        <div class="center_bg"></div>
      </div>
      <div class="tag1">党层宣言</div>
      <div class="tag2">党层基建</div>
      <div class="tag3">党层组织</div>
    </div>
    <PartyBuildingAdv />
    <GreatPartyMemberInfo />
    <PartyMemberRanking />
    <PartyBuildData />
    <PartyBuildActivity />
    <ProportionOfParty />
  </div>
</template>

<script setup lang="ts">
  import PartyBuildingAdv from "@/components/partyBuildingAdv.vue";
  import GreatPartyMemberInfo from "@/components/greatPartyMemberInfo.vue";
  import PartyMemberRanking from "@/components/partyMemberRanking.vue";
  import PartyBuildData from "@/components/partyBuildData.vue";
  import PartyBuildActivity from "@/components/partyBuildActivity.vue";
  import ProportionOfParty from "@/components/proportionOfParty.vue";
  import PartyTabs from "@/components/partyTabs.vue";
</script>

<style scoped>
  .center_bg {
    background-image: url("@/assets/party/中心图.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 367px;
    height: 303px;
  }

  .tag1 {
    position: absolute;
    top: 204px;
    left: 315px;
    width: 113px;
    height: 28px;
    background-image: url("@/assets/party/中间标签.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "SourceHanSansSC-Normal";
    font-weight: 600;
    font-size: 7px;
    color: #ffffff;
    line-height: 7px;
    text-shadow: 2px 3px 3px rgba(34, 11, 11, 0.4);
    text-align: left;
    font-style: normal;
  }

  .tag2 {
    position: absolute;
    top: 161px;
    left: 467px;
    width: 113px;
    height: 28px;
    background-image: url("@/assets/party/中间标签.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "SourceHanSansSC-Normal";
    font-weight: 600;
    font-size: 7px;
    color: #ffffff;
    line-height: 7px;
    text-shadow: 2px 3px 3px rgba(34, 11, 11, 0.4);
    text-align: left;
    font-style: normal;
  }

  .tag3 {
    position: absolute;
    top: 204px;
    left: 644px;
    width: 113px;
    height: 28px;
    background-image: url("@/assets/party/中间标签.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "SourceHanSansSC-Normal";
    font-weight: 600;
    font-size: 7px;
    color: #ffffff;
    line-height: 7px;
    text-shadow: 2px 3px 3px rgba(34, 11, 11, 0.4);
    text-align: left;
    font-style: normal;
  }
</style>
