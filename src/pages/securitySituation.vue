<template>
  <div class="w-full h-full absolute top-0 left-0 z-0">
    <SecurityEquipment v-show="!isShowDetail" />
    <AreaMonitoring v-show="!isShowDetail" />
    <SecurityOpMenu @onButtonClick="handleButtonClick" />
    <ErrorAlert @itemClick="handleItemClick" />
    <CarEnterRecord />
  </div>
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
        <span>一键{{ modelData.content }}成功！</span>
      </div>
    </div>
  </div>
  <ErrorDetail
    v-if="isShowDetail"
    :item="errorDetailData"
    :title="modelData.title"
  />
</template>

<script setup lang="ts">
  import SecurityOpMenu from "@/components/securityOpMenu.vue";
  import ErrorAlert from "@/components/errorAlert.vue";
  import CarEnterRecord from "@/components/carEnterRecord.vue";
  import SecurityEquipment from "@/components/securityEquipment.vue";
  import AreaMonitoring from "@/components/areaMonitoring.vue";
  import ErrorDetail from "@/components/errorDetail.vue";
  import { ref } from "vue";

  const modelData = ref({
    title: "",
    content: "",
  });

  const isShowModel = ref(false);

  const errorDetailData = ref({
    deviceName: "E04-3001(线路断路器重合闸)",
    deviceType: "类型名称",
    errorInfo: "异常描述",
    errorTime: "2024-12-12 12:12:12",
    errorStatus: "状态",
    rtspUrl:
      "rtsp://admin:admin12345@192.168.4.6:554/cam/realmonitor?channel=1&subtype=0",
  });

  const handleItemClick = (item: any) => {
    // errorDetailData.value = item;
    isShowDetail.value = true;
  };

  const isShowDetail = ref(false);

  const handleButtonClick = (
    value: "布防" | "撤防",
    selectValue: "电子围栏" | "入侵报警"
  ) => {
    modelData.value = {
      title: selectValue,
      content: value,
    };
    isShowModel.value = true;
    console.log(modelData.value);
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
