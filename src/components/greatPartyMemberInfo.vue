<template>
  <div class="pmc_employees_info">
    <PartyTitle titleText="优秀党员介绍" />
    <div class="pmc_employees_info_list">
      <div
        class="pmc_employees_info_item"
        v-for="item in list"
        :key="item.name + item.unit"
      >
        <div
          class="employee_img"
          :style="{ backgroundImage: `url(${item.img})` }"
        ></div>
        <div class="employee_info">
          <div class="flex pl-2 gap-3">
            <div class="employee_name">姓名：{{ item.name }}</div>
            <div class="employee_age">单位：{{ item.unit }}</div>
          </div>
          <div class="px-2">{{ truncateDescription(item.description) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    getGreatPartyMember,
    GreatPartyMemberDTO,
  } from "@/apis/greatPartyMenber";
  import PartyTitle from "./partyTitle.vue";
  import { onMounted, ref, onUnmounted } from "vue";

  const truncateDescription = (text: string) => {
    return text.length > 40 ? text.slice(0, 40) + "..." : text;
  };

  const list = ref<GreatPartyMemberDTO[]>([]);

  const getRandomMembers = (data: GreatPartyMemberDTO[]) => {
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  };

  const updateMemberList = async () => {
    try {
      const res = await getGreatPartyMember();
      if (res) {
        list.value = getRandomMembers(res);
      }
    } catch (error) {
      console.error("获取党员数据失败:", error);
    }
  };

  onMounted(() => {
    updateMemberList(); // 初始加载
    // 设置1分钟定时刷新
    const timer = setInterval(updateMemberList, 60 * 1000);

    // 组件卸载时清除定时器
    onUnmounted(() => {
      clearInterval(timer);
    });
  });
</script>

<style scoped>
  .pmc_employees_info {
    width: 206px;
    height: 136px;
    position: absolute;
    left: 53px;
    top: 248px;
  }

  .pmc_employees_info_item {
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .employee_img {
    width: 54px;
    height: 45px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .employee_info {
    flex: 1;
    margin-top: 3px;
    height: 45px;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 6px;
    color: #ffffff;
    line-height: 13px;
    text-align: left;
    font-style: normal;
    background-image: url("@/assets/party/红色渐变背景.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .pmc_employees_info_list {
    display: flex;
    flex-direction: column;
    gap: 3px;
    margin-top: 12px;
  }
</style>
