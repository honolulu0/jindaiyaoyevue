<template>
  <div class="w-full h-full absolute top-0 left-0 z-0">
    <SmartDevice v-show="isShow" />
    <DeviceList v-show="isShow" style="top: 230px" :height="350" :deviceType="['烟感报警','智能井盖','消防管廊']" />
    <!-- <SecurityOpMenu @onButtonClick="handleButtonClick" /> -->
    <DeviceErrorMonthChart />
    <ErrorAlert :device_type="['8', '5', '10', '3']" />
    <ParkChart />
    <!-- <CarEnterRecord /> -->
    <div
      class="model_container"
      v-if="isShowModel"
    >
      <div class="model">
        <div class="model_title">
          <span>{{ modelData.title }}</span>
        </div>
        <div
          class="model_close_btn"
          @click="isShowModel = false"
        >
          关闭
        </div>
        <div class="model_content">
          <span
            >一键{{ modelData.content
            }}{{ modelData.err ? "失败" : "成功" }}！</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import SmartDevice from "@/components/smartDevice.vue";
  import DeviceList from "@/components/deviceList.vue";
  import ErrorAlert from "@/components/errorAlert.vue";
  import ParkChart from "@/components/parkChart.vue";
  import DeviceErrorMonthChart from "@/components/deviceErrorMonthChart.vue";
  import { ref } from "vue";

  const isShowModel = ref(false);
  const modelData = ref({
    title: "",
    content: "",
    err: false,
  });

  const isShow = ref(true);

  const handleButtonClick = (
    value: "布防" | "撤防",
    selectValue: "电子围栏" | "入侵报警",
    err?: boolean
  ) => {
    isShowModel.value = true;
    modelData.value.title = selectValue;
    modelData.value.content = value;
    modelData.value.err = err || false;
  };
</script>

<style scoped>
  .model_container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .model {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 326px;
    height: 187px;
    background-image: url("@/assets/小弹窗.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .model_title {
    position: absolute;
    top: 11px;
    left: 33px;
    width: 74px;
    height: 31px;
    font-family: YouSheBiaoTiHei;
    font-size: 17px;
    color: #71f3ff;
    line-height: 31px;
    letter-spacing: 1px;
    text-align: left;
    font-style: normal;
  }

  .model_close_btn {
	cursor:pointer;
    position: absolute;
    top: 20px;
    right: 21px;
    width: 41px;
    height: 14px;
    font-family: YouSheBiaoTiHei;
    font-size: 17px;
    color: #71f3ff;
    line-height: 14px;
    letter-spacing: 3px;
    text-align: left;
    font-style: normal;
  }

  .model_content {
    position: absolute;
    top: 93px;
    left: 88px;
    width: 167px;
    height: 18px;
    font-family: YouSheBiaoTiHei;
    font-size: 21px;
    color: #71f3ff;
    line-height: 18px;
    letter-spacing: 3px;
    text-align: left;
    font-style: normal;
  }
</style>
