<template>
  <AspectRatioContainer>
    <Top />
    <Transition name="fade">
      <div v-if="isShow">
        <div class="bg_left"></div>
        <div
          class="parking"
          v-show="parkingShow"
        >
          <div class="parking_title">
            <span>{{ paringTitle }}</span>
          </div>
          <div class="parking_content">
            <div
              class="parking_content_item"
              v-for="(value, key) in parkingData"
              :key="key"
              @click="handleJujiaoLouceng(key, value)"
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

    <ErrorDetailModel
      :data="errorDetail"
      v-if="showErrorDetail"
    />

    <DeviceDetailModel
      :data="deviceDetail"
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

    <Transition name="fade">
      <div
        v-if="isShow && deviceType.length > 0"
        class="device_type_control"
      >
        <div
          class="device_type_control_item"
          v-for="(item, index) in deviceType"
          :key="index"
          @click="handleDeviceTypeClick(item)"
        >
          <img
            :src="item.isClick ? item.icon_hover : item.icon"
            alt="设备类型"
          />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </Transition>
  </AspectRatioContainer>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from "vue";
  import Top from "./top.vue";
  import AspectRatioContainer from "@/components/aspectRatioContainer.vue";
  import ErrorDetail from "@/components/errorDetail.vue";
  import { errorAlertSubject } from "@/utils/errorAlertSubject";
  import { deviceSelectSubject } from "@/utils/deviceSelectSubject";
  import DeviceDetail from "@/components/deviceDetail.vue";
  import { parkingSubject, deviceTypeSubject } from "@/event";
  import ErrorDetailModel from "@/components/errorDetailModel.vue";
  import DeviceDetailModel from "@/components/deviceDetailModel.vue";
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

  const diCengList = {
    "1A": "1F",
    "1B": "1F",
    "1C": "1F",
    "1D": "1F",
    "1E": "1F",
    "1F": "1F",
    "1G": "1F",
    "1H": "1F",
    "2A": "2F",
    "2B": "2F",
    "2C": "2F",
    "2D": "2F",
    "2E": "2F",
    "2F": "2F",
    "2G": "2F",
    "2H": "2F",
  };
  const cheJianLouCengList = {
    "1号车间A座": {
      "5F": 3,
      "4F": 2,
      "3F": 1,
      "2F": 0,
      "1F": 0,
      P: 1,
      主视图: 0,
      全部: "DX",
    },
    "1号车间B座": {
      "5F": 3,
      "4F": 2,
      "3F": 1,
      "2F": 0,
      "1F": 1,
      P: 0,
      主视图: 0,
      全部: "DX",
    },
    "1号车间C座": {
      "5F": 3,
      "4F": 2,
      "3F": 1,
      "2F": 0,
      "1F": 2,
      P: 0,
      主视图: 0,
      全部: "DX",
    },
    "1号车间D座": {
      "5F": 3,
      "4F": 2,
      "3F": 1,
      "2F": 0,
      "1F": 3,
      P: 0,
      主视图: 0,
      全部: "DX",
    },
    "1号车间E座": {
      "5F": 3,
      "4F": 2,
      "3F": 1,
      "2F": 0,
      "1F": 4,
      P: 0,
      主视图: 0,
      全部: "DX",
    },
    "1号车间F座": {
      "5F": 3,
      "4F": 2,
      "3F": 1,
      "2F": 0,
      "1F": 5,
      P: 3,
      主视图: 0,
      全部: "DX",
    },
    "1号车间G座": {
      "5F": 3,
      "4F": 2,
      "3F": 1,
      "2F": 0,
      "1F": 6,
      P: 3,
      主视图: 0,
      全部: "DX",
    },
    "1号车间H座": {
      "5F": 3,
      "4F": 2,
      "3F": 1,
      "2F": 0,
      "1F": 7,
      P: 3,
      主视图: 0,
      全部: "DX",
    },
    "2号车间A座": {
      "5F": 3,
      "4F": 2,
      "3F": 1,
      "2F": 0,
      "1F": 0,
      P: 1,
      主视图: 0,
      全部: "DX",
    },
    "2号车间B座": {
      "5F": 3,
      "4F": 2,
      "3F": 1,
      "2F": 0,
      "1F": 1,
      P: 2,
      主视图: 0,
      全部: "DX",
    },
    "2号车间C座": {
      "5F": 3,
      "4F": 2,
      "3F": 1,
      "2F": 0,
      "1F": 2,
      P: 2,
      主视图: 0,
      全部: "DX",
    },
    "2号车间D座": {
      "5F": 3,
      "4F": 2,
      "3F": 1,
      "2F": 0,
      "1F": 3,
      P: 2,
      主视图: 0,
      全部: "DX",
    },
    "2号车间E座": {
      "5F": 3,
      "4F": 2,
      "3F": 1,
      "2F": 0,
      "1F": 4,
      P: 2,
      主视图: 0,
      全部: "DX",
    },
    "2号车间F座": {
      "5F": 3,
      "4F": 2,
      "3F": 1,
      "2F": 0,
      "1F": 5,
      P: 3,
      主视图: 0,
      全部: "DX",
    },
    "2号车间G座": {
      "5F": 3,
      "4F": 2,
      "3F": 1,
      "2F": 0,
      "1F": 6,
      P: 3,
      主视图: 0,
      全部: "DX",
    },
    "2号车间H座": {
      "5F": 3,
      "4F": 2,
      "3F": 1,
      "2F": 0,
      "1F": 7,
      P: 1,
      主视图: 0,
      全部: "DX",
    },
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
  function handleJujiaoLouceng(key: string, floorId: number) {
    // 创建一个临时变量，保存 buildingName 的值

    console.log(buildingName.value, key, floorId);
    let tempName = buildingName.value;

    if (key == "P") {
      tempName = key; // 将临时变量 tempName 修改为 'P'
    } else if (key == "1F") {
      tempName =
        diCengList[buildingName.value as keyof typeof diCengList] + "1";
    } else if (key == "主视图") {
      window.ue.call("reback", {}, function (rv) {
        console.log("ue callback:" + rv);
      });
      // parkingShow.value = false
      return;
    } else if (key == "全部") {
      jujiao("DX");
      return;
    }

    window.ue.call(
      "kanlouceng",
      {
        BuildingName: tempName,
        FloorID: floorId,
      },
      function (rv) {
        console.log("ue callback:" + rv);
      }
    );
  }
  function jujiao(bName) {
    console.log("bName" + bName);
    window.ue.call(
      "jujiao",
      {
        BuildingName: bName,
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

  const deviceType = ref<any[]>([]);

  const baseUrl = import.meta.url.substring(
    0,
    import.meta.url.lastIndexOf("/")
  );

  deviceTypeSubject.subscribe((data) => {
    if (data !== null) {
      deviceType.value = data.map((item) => {
        return {
          name: item.text ?? item.icon,
          icon: `${baseUrl}/../assets/${item.icon}.png`,
          icon_hover: `${baseUrl}/../assets/${item.icon}-hover.png`,
          isClick: item.isClick ? item.isClick : false,
        };
      });
    }
  });

  // 点击设备中控操作
  function handleDeviceTypeClick(item: {
    isClick: boolean;
    icon: string;
    name: string;
    id: number;
  }) {
    item.isClick = !item.isClick;
    window.ue.call(
      "yincangxianshichuanganqibyleibie",
      {
        SensorType: item.id,
        Hidden: !item.isClick,
      },
      function (rv) {
        console.log("ue callback:" + rv);
      }
    );
  }

  errorAlertSubject.subscribe((data) => {
    if (data !== null) {
      errorDetail.value = data;
      showDeviceDetail.value = false;
      showErrorDetail.value = true;
      console.log(errorDetail.value);
      console.log(
        data,
        data.lou,
        data.ceng,
        data.device_name,
        data.is_processed === 0 ? true : false
      );

      if (data.lou == "DX") {
        // 如果传感器位于外部,就先打开外部视角，不然看不到外部的传感器
        jujiao("DX");
      }

      // 先变色
      chuanganqibianseyichang(
        data.lou,
        data.ceng,
        data.device_name,
        data.is_processed === 0 ? true : false
      );
      // 再聚焦
      setTimeout(() => {
        juJiaoChuanGanQi(data.lou, data.ceng, data.device_name);
        chuanganqibianseyichang(
          data.lou,
          data.ceng,
          data.device_name,
          data.is_processed === 0 ? true : false
        );
      }, 2000);
    } else {
      showErrorDetail.value = false;
    }
  });
  function chuanganqibianseyichang(
    BuildingName: string,
    floorId: number,
    SensorName: string,
    Warning: boolean
  ) {
    // 创建一个临时变量，保存 buildingName 的值

    // {
    //     "BuildingName": "1A",
    //     "FloorID": 0,
    //     "SensorName": "CGQ_1A_001",
    //     "Warning": true
    // }
    // warning字段用来控制是否开启报警，或是关闭报警
    console.log(BuildingName, floorId, SensorName, Warning);
    window.ue.call(
      "jujiaoyichangchuanganqi",
      {
        BuildingName: BuildingName,
        FloorID: floorId,
        SensorName: SensorName,
        Warning: Warning,
      },
      function (rv) {
        console.log("ue callback:" + rv);
      }
    );
  }
  deviceSelectSubject.subscribe((data) => {
    if (data !== null) {
      deviceDetail.value = data;
      showErrorDetail.value = false;
      showDeviceDetail.value = true;
      console.log(deviceDetail.value);
      console.log(data, data.lou, data.ceng, data.device_name);
      juJiaoChuanGanQi(data.lou, data.ceng, data.device_name);
    } else {
      showDeviceDetail.value = false;
    }
  });

  function juJiaoChuanGanQi(
    BuildingName: string,
    floorId: number,
    SensorName: string
  ) {
    // 创建一个临时变量，保存 buildingName 的值

    // {
    //     "BuildingName": "1A",
    //     "FloorID": 0,
    //     "SensorName": "CGQ_1A_001"
    // } juJiaoYiChangChuanGanQi
    // yinchangXianshiChuanganqiByLeibie
    console.log(BuildingName, floorId, SensorName);
    window.ue.call(
      "jujiaochuanganqi",
      {
        BuildingName: BuildingName,
        FloorID: floorId,
        SensorName: SensorName,
      },
      function (rv) {
        console.log("ue callback:" + rv);
      }
    );
  }

  parkingSubject.subscribe((data) => {
    if (data == true) {
      parkingShow.value = true;
    } else {
      parkingShow.value = false;
    }
  });
  // 在 `onMounted` 中绑定 `window.ue.interface.getInfoByName`
  onMounted(() => {
    try {
      if (window.ue && window.ue.interface) {
        window.ue.interface.setlouzuo = (building) => {
          console.log("模型传入的建筑", building);
          if (building.name == "P" || building.name.length === 3) {
            return;
          }
          parkingShow.value = true;
          buildingName.value = building.name;
          paringTitle.value =
            cheJianList[building.name as keyof typeof cheJianList];
          parkingData.value =
            cheJianLouCengList[
              paringTitle.value as keyof typeof cheJianLouCengList
            ];
        };

        window.ue.interface.setchuanganqi = (chuanganqi) => {
          console.log("模型传入的传感器", chuanganqi);

          // errorDetail.value = { "device_name": chuanganqi.SensorName };
          // showDeviceDetail.value = false;
          // showErrorDetail.value = true;
          deviceSelectSubject.next({
            device_name: chuanganqi.SensorName,
          });
        };

        // window.ue.interface.jsfunc = (msg) => {
        // 	console.log("jsfunc", msg);
        // }
      } else {
        console.error("window.ue 或 window.ue.interface 未定义");
      }
    } catch (error) {
      console.error("错误:", error);
    }
    // setTimeout(() => {
    // 	jujiao("DX")
    // },3000)
  });
</script>

<style scoped>
  .bg_left {
    background-image: url("@/assets/bg_left.png");
    width: 280px;
    height: 579px;
    background-size: 280px 579px;
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
  }

  .bg_right {
    background-image: url("@/assets/bg_right.png");
    width: 280px;
    height: 579px;
    background-size: 280px 579px;
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

  /* 	.defense_deployment_success {
		background-image: url("@/assets/弹窗背景.png");
		background-size: 100%;
		width: 587px;
		height: 141px;
		display: flex;
		align-items: center;
		justify-content: center;
	} */
  /* 
	.defense_deployment_success_close_btn {
		background-image: url("@/assets/关闭按钮.png");
		background-size: 100%;
		width: 14px;
		height: 14px;
	} */

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

  .device_type_control {
    position: absolute;
    bottom: 18px;
    left: 361px;
    z-index: 100;
    height: 65px;
    width: 359px;
    /* background-image: url("@/assets/中控背景.png"); */
    background-size: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 80px;
    gap: 10px;
  }

  .device_type_control_item {
    display: flex;
    align-items: center;
    width: 30px;
    height: 39px;
    flex-direction: column;
    justify-content: center;

    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 6px;
    color: #ffffff;
    line-height: 9px;
    text-align: left;
    font-style: normal;
  }
</style>
