<template>
  <div class="pmc_employees_info">
    <TitleComponent titleText="物业员工信息" />
    <div class="pmc_employees_info_list">
      <div
        class="pmc_employees_info_item"
        v-for="item in displayedEmployees"
        :key="item.name + item.age + item.job"
      >
        <div
          class="employee_img"
          :style="{ backgroundImage: `url(${item.img || defaultImg})` }"
        ></div>
        <div class="employee_info">
          <div class="flex pl-2 gap-3">
            <div class="employee_job">职业：{{ item.job }}</div>
            <div class="employee_name">姓名：{{ item.name }}</div>
          </div>
          <div class="px-2">{{ truncateDescription(item.description) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { EmployeeListVO, getEmployeeList } from "@/apis/employeeList";
  import TitleComponent from "@/components/titleComponent.vue";
  import { onMounted, ref, computed, onUnmounted } from "vue";

  const truncateDescription = (text: string) => {
    return text.length > 20 ? text.slice(0, 20) + "..." : text;
  };

  // const list = ref([
  //   {
  //     name: "张三",
  //     age: 20,
  //     job: "保安",
  //     img: "https://picsum.photos/200/300",
  //     description:
  //       "张三是一名保安，负责小区的安全巡逻。张三是一名保安，负责小区的安全巡逻。张三是一名保安，负责小区的安全巡逻。",
  //   },
  //   {
  //     name: "张三",
  //     age: 20,
  //     job: "保安",
  //     img: "https://picsum.photos/200/300",
  //     description: "张三是一名保安，负责小区的安全巡逻。",
  //   },
  // ]);

  const defaultImg = "https://picsum.photos/200/300";
  const list = ref<EmployeeListVO[]>([]);
  const currentIndex = ref(0);
  const displayedEmployees = computed(() => {
    return list.value.slice(currentIndex.value, currentIndex.value + 2);
  });

  const rotateEmployees = () => {
    currentIndex.value = (currentIndex.value + 2) % Math.max(1, list.value.length);
  };

  let timer: NodeJS.Timer;

  const fetchEmployeeList = async () => {
    try {
      const data = await getEmployeeList({
        limit: 100,
      });
      list.value = data;
    } catch (error) {
      console.error("获取员工列表失败:", error);
    }
  };

  onMounted(() => {
    fetchEmployeeList();
    // 设置5秒轮换一次
    timer = setInterval(rotateEmployees, 5000);
  });

  onUnmounted(() => {
    // 清理定时器
    if (timer) {
      clearInterval(timer);
    }
  });
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
    /* background-size: cover; */
	 background-size: 100% 100%; /* 拉伸图片以铺满整个元素 */
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
