<template>
  <AspectRatioContainer>
    <Top />
    <Transition name="fade">
      <div v-if="isShow">
        <div class="bg_left"></div>
        <div
          class="parking"
          v-if="parkingShow"
        >
          <div class="parking_title">
            <span>{{ paringTitle }}</span>
          </div>
          <div class="parking_content">
            <div
              class="parking_content_item"
              v-for="(value, key) in parkingData"
              :key="key"
              @click="handleJujiaoLouceng(value)"
            >
              <div class="parking_content_item_bg">
                <div class="parking_content_item_value">
                  <span>{{ key }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg_right"></div>
        <slot></slot>
        <div
          class="close_word_btn"
          @click="close"
        >
          <span>关闭</span>
        </div>
        <div
          class="close_btn"
          @click="close"
        ></div>
      </div>
    </Transition>

    <ErrorDetail
      :item="errorDetail"
      :title="'安防'"
      v-if="showErrorDetail"
    />

    <DeviceDetail
      :item="deviceDetail"
      :title="'设备详情'"
      v-if="showDeviceDetail"
    />

    <Transition name="fade">
      <div v-if="!isShow">
        <div
          class="open_btn"
          @click="open"
        >
          <span>开启</span>
        </div>
        <div
          class="close_btn_open"
          @click="open"
        ></div>
      </div>
    </Transition>
  </AspectRatioContainer>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import Top from "./top.vue";
  import AspectRatioContainer from "@/components/aspectRatioContainer.vue";
  import ErrorDetail from "@/components/errorDetail.vue";
  import { errorAlertSubject } from "@/utils/errorAlertSubject";
  import { deviceSelectSubject } from "@/utils/deviceSelectSubject";
  import DeviceDetail from "@/components/deviceDetail.vue";
  import { parkingSubject } from "@/event";
  const isShow = ref(true);
  const parkingShow = ref(true);
  const cheJianList = {
    "1A": "1号车间A座",
    "1B": "1号车间B座",
    "1C": "1号车间C座",
    "1D": "1号车间D座",
    "1E": "1号车间E座",
    "1F": "1号车间F座",
    "1G": "1号车间G座",
    "1H": "1号车间H座",
    "2A": "2号车间A座",
    "2B": "2号车间B座",
    "2C": "2号车间C座",
    "2D": "2号车间D座",
    "2E": "2号车间E座",
    "2F": "2号车间F座",
    "2G": "2号车间G座",
    "2H": "2号车间H座",
  };
  const cheJianLouCengList = {
    "1号车间A座": { "5F": 3, "4F": 2, "3F": 1, "2F": 0, "1F": 0, B1: 0 },
    "1号车间B座": { "5F": 3, "4F": 2, "3F": 1, "2F": 0, "1F": 1, B1: 1 },
    "1号车间C座": { "5F": 3, "4F": 2, "3F": 1, "2F": 0, "1F": 2, B1: 2 },
    "1号车间D座": { "5F": 3, "4F": 2, "3F": 1, "2F": 0, "1F": 3, B1: 3 },
    "1号车间E座": { "5F": 3, "4F": 2, "3F": 1, "2F": 0, "1F": 4, B1: 4 },
    "1号车间F座": { "5F": 3, "4F": 2, "3F": 1, "2F": 0, "1F": 5, B1: 5 },
    "1号车间G座": { "5F": 3, "4F": 2, "3F": 1, "2F": 0, "1F": 6, B1: 6 },
    "1号车间H座": { "5F": 3, "4F": 2, "3F": 1, "2F": 0, "1F": 7, B1: 7 },
    "2号车间A座": { "5F": 3, "4F": 2, "3F": 1, "2F": 0, "1F": 0, B1: 0 },
    "2号车间B座": { "5F": 3, "4F": 2, "3F": 1, "2F": 0, "1F": 1, B1: 1 },
    "2号车间C座": { "5F": 3, "4F": 2, "3F": 1, "2F": 0, "1F": 2, B1: 2 },
    "2号车间D座": { "5F": 3, "4F": 2, "3F": 1, "2F": 0, "1F": 3, B1: 3 },
    "2号车间E座": { "5F": 3, "4F": 2, "3F": 1, "2F": 0, "1F": 4, B1: 4 },
    "2号车间F座": { "5F": 3, "4F": 2, "3F": 1, "2F": 0, "1F": 5, B1: 5 },
    "2号车间G座": { "5F": 3, "4F": 2, "3F": 1, "2F": 0, "1F": 6, B1: 6 },
    "2号车间H座": { "5F": 3, "4F": 2, "3F": 1, "2F": 0, "1F": 7, B1: 7 },
  };

  // 默认使用的当前楼层
  let buildingName = ref("1A");
  let paringTitle = ref(
    cheJianList[buildingName.value as keyof typeof cheJianList]
  );
  let parkingData = ref(
    cheJianLouCengList[paringTitle.value as keyof typeof cheJianLouCengList]
  ); // 初始化为楼层列表

  // 点击楼层的操作
  function handleJujiaoLouceng(floorId: number) {
    // 触发 UE 调用
    window.ue.call(
      "kanlouceng",
      {
        BuildingName: buildingName,
        FloorID: floorId,
      },
      function (rv) {
        console.log("ue callback:" + rv);
      }
    );
  }
  function jujiao() {
    window.ue.call(
      "jujiao",
      {
        BuildingName: buildingName,
      },
      function (rv) {
        console.log("ue callback:" + rv);
      }
    );
  }
  function close() {
    isShow.value = false;
  }

  function open() {
    isShow.value = true;
  }

  const errorDetail = ref<any>({});

  const showErrorDetail = ref(false);

  const deviceDetail = ref<any>({});

  const showDeviceDetail = ref(false);

  errorAlertSubject.subscribe((data) => {
    if (data !== null) {
      errorDetail.value = data;
      showDeviceDetail.value = false;
      showErrorDetail.value = true;
      console.log(errorDetail.value);
    } else {
      showErrorDetail.value = false;
    }
  });

  deviceSelectSubject.subscribe((data) => {
    if (data !== null) {
      deviceDetail.value = data;
      showErrorDetail.value = false;
      showDeviceDetail.value = true;
      console.log(deviceDetail.value);
    } else {
      showDeviceDetail.value = false;
    }
  });

  parkingSubject.subscribe((data) => {
    if (data == true) {
      parkingShow.value = true;
    } else {
      parkingShow.value = false;
    }
  });
  // 在 `onMounted` 中绑定 `window.ue.interface.getInfoByName`
  onMounted(() => {
    // 确保 ue 和 interface 存在
    if (window.ue && window.ue.interface) {
      window.ue.interface.getlouzuo = (building) => {
        console.log(building);
        // kanlouceng(msg.name)
        buildingName = building.name;
        paringTitle.value =
          cheJianList[building.name as keyof typeof cheJianList];
        parkingData.value =
          cheJianLouCengList[
            paringTitle.value as keyof typeof cheJianLouCengList
          ];
        jujiao();
      };
      window.ue.interface.getchuanganqi = (msg) => {
        console.log(msg);
        jujiao();
      };
    } else {
      console.error("window.ue 或 window.ue.interface 未定义");
    }
  });
</script>

<style scoped>
  .bg_left {
    background-image: url("@/assets/bg_left.png");
    width: 377px;
    height: 579px;
    background-size: 100%;
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
  }

  .bg_right {
    background-image: url("@/assets/bg_right.png");
    width: 377px;
    height: 579px;
    background-size: 100%;
    z-index: 0;
    position: absolute;
    top: 0;
    right: 0;
  }

  .close_word_btn {
    z-index: 999;
    background-image: url("@/assets/close_word_btn.png");
    background-size: 100%;
    position: absolute;
    top: 54px;
    right: 44px;
    width: 48px;
    height: 14px;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 9px;
    color: #ffffff;
    line-height: 10px;
    letter-spacing: 0px;
    text-align: right;
    font-style: normal;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close_btn {
    background-image: url("@/assets/close_btn.png");
    background-size: 100%;
    width: 14px;
    height: 14px;
    position: absolute;
    top: 55px;
    right: 20px;
    z-index: 999;
  }

  .close_btn_open {
    background-image: url("@/assets/close_btn.png");
    background-size: 100%;
    width: 14px;
    height: 14px;
    position: absolute;
    top: 55px;
    right: 20px;
    z-index: 999;
    transform: scaleX(-1);
  }

  /* 添加淡入淡出过渡效果 */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }

  /* 添加开启按钮样式 */
  .open_btn {
    z-index: 999;
    background-image: url("@/assets/close_word_btn.png");
    /* 你可能需要替换成对应的开启按钮图片 */
    background-size: 100%;
    position: absolute;
    top: 54px;
    right: 44px;
    width: 48px;
    height: 14px;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 9px;
    color: #ffffff;
    line-height: 10px;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .model {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .defense_deployment_success {
    background-image: url("@/assets/弹窗背景.png");
    background-size: 100%;
    width: 587px;
    height: 141px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .defense_deployment_success_close_btn {
    background-image: url("@/assets/关闭按钮.png");
    background-size: 100%;
    width: 14px;
    height: 14px;
  }

  .defense_deployment_success_content {
    font-family: YouSheBiaoTiHei;
    font-size: 18px;
    color: #71f3ff;
    line-height: 18px;
    letter-spacing: 3px;
    text-align: left;
    font-style: normal;
  }

  .parking {
    position: absolute;
    top: 77px;
    right: 244px;
    width: 51px;
    height: max-content;
    z-index: 1000;
    display: flex;
    flex-direction: column;
  }

  .parking_title {
    background-image: url("@/assets/园区_背景.png");
    background-size: 100%;
    width: 51px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 6px;
    color: #ffffff;
    line-height: 8px;
    text-align: center;
    font-style: normal;
    margin-bottom: 9px;
  }

  .parking_content {
    display: flex;
    flex-direction: column;
    gap: 4.5px;
    position: relative;
  }

  .parking_content::before {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    height: 100%;
    opacity: 0.3;
    background: linear-gradient(
      to bottom,
      #ffffff 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  .parking_content::after {
    content: "";
    position: absolute;
    right: -1px;
    top: 0;
    width: 3px;
    height: 3px;
    background: #ffffff;
    border-radius: 50%;
  }

  .parking_content_item {
    width: 100%;
    height: 22px;
    border-left: 18px solid transparent;
    border-right: 9px solid transparent;
  }

  .parking_content_item_bg {
    background-image: url("@/assets/未选中.png");
    background-size: 53px 50px;
    background-position: center;
    background-repeat: no-repeat;
    width: 23px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .parking_content_item_bg:hover {
    background-image: url("@/assets/选中框.png");
    background-size: 53px 50px;
    background-position: center;
    background-repeat: no-repeat;
  }

  .parking_content_item_value {
    display: block;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 6px;
    color: #ffffff;
    line-height: 8px;
    text-align: right;
    font-style: normal;
  }
</style>
