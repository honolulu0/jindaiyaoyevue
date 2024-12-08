<template>
  <div class="pmc_employees_info">
    <TitleComponent titleText="物业员工信息" />
    <div class="pmc_employees_info_list">
      <div
        class="pmc_employees_info_item"
        v-for="item in list"
        :key="item.name + item.age + item.job"
      >
        <div
          class="employee_img"
          :style="{ backgroundImage: `url(${item.img})` }"
        ></div>
        <div class="employee_info">
          <div class="flex pl-2 gap-3">
            <div class="employee_job">职业：{{ item.job }}</div>
            <div class="employee_name">姓名：{{ item.name }}</div>
            <div class="employee_age">年龄：{{ item.age }}</div>
          </div>
          <div class="px-2">{{ truncateDescription(item.description) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TitleComponent from "@/components/titleComponent.vue";
  import { ref } from "vue";

  const truncateDescription = (text: string) => {
    return text.length > 20 ? text.slice(0, 20) + "..." : text;
  };

  const list = ref([
    {
      name: "张三",
      age: 20,
      job: "保安",
      img: "https://picsum.photos/200/300",
      description:
        "张三是一名保安，负责小区的安全巡逻。张三是一名保安，负责小区的安全巡逻。张三是一名保安，负责小区的安全巡逻。",
    },
    {
      name: "张三",
      age: 20,
      job: "保安",
      img: "https://picsum.photos/200/300",
      description: "张三是一名保安，负责小区的安全巡逻。",
    },
  ]);
</script>

<style scoped>
  .pmc_employees_info {
    width: 206px;
    height: 136px;
    position: absolute;
    left: 20px;
    bottom: 18px;
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
    margin-bottom: 9px;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 6px;
    color: #ffffff;
    line-height: 13px;
    text-align: left;
    font-style: normal;
    background-image: url("@/assets/enterprises/accident_tiltle_bg2备份.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .pmc_employees_info_list {
    display: flex;
    flex-direction: column;
    gap: 3px;
    margin-top: 7px;
  }
</style>
