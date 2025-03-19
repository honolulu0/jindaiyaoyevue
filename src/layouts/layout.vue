<template>
	<AspectRatioContainer>
		<Top />
		<Transition name="fade">
			<div v-if="isShow">
				<div class="bg_left"></div>
				<div class="parking" v-show="parkingShow">
					<div class="parking_title">
						<span>{{ paringTitle }}</span>
					</div>
					<div class="parking_content">
						<div class="parking_content_item" v-for="(value, key) in parkingData" :key="key"
							@click="handleJujiaoLouceng(key, value)">
							<div class="parking_content_item_bg" :class="
                  key === '楼号' && yinchanglouhao === false ? 'active' : ''
                ">
								<div class="parking_content_item_value">
									<span>{{ key }}</span>
								</div>
							</div>
						</div>
					</div>
					<!-- <button @click="yincangxianshisuoyou()">隐藏</button> -->
				</div>
				<div class="bg_right"></div>
				<slot></slot>
				<template v-if="router.currentRoute.value.path !== '/parkEnterpriseDetail'">
					<div class="close_word_btn" @click="close">
						<span>关闭</span>
					</div>
					<div class="close_btn" @click="close"></div>
				</template>
			</div>
		</Transition>

		<ErrorDetailModel :data="errorDetail" v-if="showErrorDetail" />

		<DeviceDetailModel :data="deviceDetail" v-if="showDeviceDetail" />

		<Image fit="fill" :src="housePicUrl" :preview="{
        visible: previewVisible,
        onVisibleChange: handleVisibleChange,
      }" width="0px" />

		<ParkEnterpriseRentInfo :buildingName="paringTitle" v-if='paringTitle.includes("号车间")' />

		<!-- 		<div v-show="isShowHousePic" class="button-house-pic" @click="handleHousePic">
			户型图
		</div> -->

		<Transition name="fade">
			<div v-if="!isShow">
				<div class="open_btn" @click="open">
					<span>开启</span>
				</div>
				<div class="close_btn_open" @click="open"></div>
			</div>
		</Transition>

		<Transition name="fade">
			<div v-if="isShow && deviceType.length > 0" class="device_type_control">
				<div class="device_type_control_item" v-for="(item, index) in deviceType" :key="index"
					@click="handleDeviceTypeClick(item)">
					<img :src="item.isClick ? item.icon_hover : item.icon" alt="设备类型" />
					<span>{{ item.name }}</span>
				</div>
			</div>
		</Transition>
	</AspectRatioContainer>
</template>

<script setup lang="ts">
	import { ref, onMounted, computed } from "vue";
	import { useRouter } from "vue-router";
	import { deviceTypeStates, DeviceType } from "@/event/deviceTypeState";
	import Top from "./top.vue";
	import AspectRatioContainer from "@/components/aspectRatioContainer.vue";
	import ErrorDetail from "@/components/errorDetail.vue";
	import { errorAlertSubject } from "@/utils/errorAlertSubject";
	import { deviceSelectSubject } from "@/utils/deviceSelectSubject";
	import DeviceDetail from "@/components/deviceDetail.vue";
	import { parkingSubject, deviceTypeSubject } from "@/event";
	import ErrorDetailModel from "@/components/errorDetailModel.vue";
	import DeviceDetailModel from "@/components/deviceDetailModel.vue";
	import { getAllSpaceStatus } from "@/apis/getParkingData";
	import { getDeviceInfo } from "@/apis/getDeviceInfo";
	import {
		riqinbaojingChefang,
		dianziweilanChefang,
	} from "@/apis/securityOpMenu";
	import ParkEnterpriseRentInfo from "@/components/parkEnterpriseRentInfo.vue";
	import { getHousePic, HousePic } from "@/apis/getHousePic";
	import { Image } from "ant-design-vue";

	const isShow = ref(true);
	const previewVisible = ref(false);
	const router = useRouter();
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
		"S1": "1号宿舍楼",
		"S2": "2号宿舍楼",
		"S3": "3号宿舍楼",
		请点击楼号: "请点击楼号",
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
			//全部: "DX",
			楼号: "LH",
		},
		"1号车间B座": {
			"5F": 3,
			"4F": 2,
			"3F": 1,
			"2F": 0,
			"1F": 1,
			P: 0,
			主视图: 0,
			//全部: "DX",
			楼号: "LH",
		},
		"1号车间C座": {
			"5F": 3,
			"4F": 2,
			"3F": 1,
			"2F": 0,
			"1F": 2,
			P: 0,
			主视图: 0,
			//全部: "DX",
			楼号: "LH",
		},
		"1号车间D座": {
			"5F": 3,
			"4F": 2,
			"3F": 1,
			"2F": 0,
			"1F": 3,
			P: 0,
			主视图: 0,
			//全部: "DX",
			楼号: "LH",
		},
		"1号车间E座": {
			"5F": 3,
			"4F": 2,
			"3F": 1,
			"2F": 0,
			"1F": 4,
			P: 0,
			主视图: 0,
			//全部: "DX",
			楼号: "LH",
		},
		"1号车间F座": {
			"5F": 3,
			"4F": 2,
			"3F": 1,
			"2F": 0,
			"1F": 5,
			P: 3,
			主视图: 0,
			//全部: "DX",
			楼号: "LH",
		},
		"1号车间G座": {
			"5F": 3,
			"4F": 2,
			"3F": 1,
			"2F": 0,
			"1F": 6,
			P: 3,
			主视图: 0,
			//全部: "DX",
			楼号: "LH",
		},
		"1号车间H座": {
			"5F": 3,
			"4F": 2,
			"3F": 1,
			"2F": 0,
			"1F": 7,
			P: 3,
			主视图: 0,
			//全部: "DX",
			楼号: "LH",
		},
		"2号车间A座": {
			"5F": 3,
			"4F": 2,
			"3F": 1,
			"2F": 0,
			"1F": 0,
			P: 1,
			主视图: 0,
			//全部: "DX",
			楼号: "LH",
		},
		"2号车间B座": {
			"5F": 3,
			"4F": 2,
			"3F": 1,
			"2F": 0,
			"1F": 1,
			P: 2,
			主视图: 0,
			//全部: "DX",
			楼号: "LH",
		},
		"2号车间C座": {
			"5F": 3,
			"4F": 2,
			"3F": 1,
			"2F": 0,
			"1F": 2,
			P: 2,
			主视图: 0,
			//全部: "DX",
			楼号: "LH",
		},
		"2号车间D座": {
			"5F": 3,
			"4F": 2,
			"3F": 1,
			"2F": 0,
			"1F": 3,
			P: 2,
			主视图: 0,
			//全部: "DX",
			楼号: "LH",
		},
		"2号车间E座": {
			"5F": 3,
			"4F": 2,
			"3F": 1,
			"2F": 0,
			"1F": 4,
			P: 2,
			主视图: 0,
			//全部: "DX",
			楼号: "LH",
		},
		"2号车间F座": {
			"5F": 3,
			"4F": 2,
			"3F": 1,
			"2F": 0,
			"1F": 5,
			P: 3,
			主视图: 0,
			//全部: "DX",
			楼号: "LH",
		},
		"2号车间G座": {
			"5F": 3,
			"4F": 2,
			"3F": 1,
			"2F": 0,
			"1F": 6,
			P: 3,
			主视图: 0,
			//全部: "DX",
			楼号: "LH",
		},
		"2号车间H座": {
			"5F": 3,
			"4F": 2,
			"3F": 1,
			"2F": 0,
			"1F": 7,
			P: 1,
			主视图: 0,
			//全部: "DX",
			楼号: "LH",
		},
		"1号宿舍楼": {
			"户型图": 1,
			主视图: 0,
			//全部: "DX",
			楼号: "LH",
		},
		"2号宿舍楼": {
			"户型图": 2,
			主视图: 0,
			//全部: "DX",
			楼号: "LH",
		},
		"3号宿舍楼": {
			"户型图": 3,
			主视图: 0,
			//全部: "DX",
			楼号: "LH",
		},
		请点击楼号: {
			主视图: 0,
			//全部: "DX",
			楼号: "LH",
		},
	};

	let yinchanglouhao = ref(true);

	let housePicUrl = ref("");


	function handleVisibleChange(visible) {
		previewVisible.value = visible;
	}

	// 默认使用的当前楼层 false
	let buildingName = ref("请点击楼号");
	buildingName.value = "1B";
	let paringTitle = ref(
		cheJianList[buildingName.value as keyof typeof cheJianList]
	);
	console.log(paringTitle);
	let parkingData = ref(
		cheJianLouCengList[paringTitle.value as keyof typeof cheJianLouCengList]
	); // 初始化为楼层列表
	// 点击楼层的操作
	async function handleJujiaoLouceng(key : string, floorId : number) {
		// 创建一个临时变量，保存 buildingName 的值

		console.log(buildingName.value, key, floorId);
		let tempName = buildingName.value;
		if (key == "户型图") {
			housePicUrl.value = housePicObj.value[floorId + '号楼'];
			previewVisible.value = true;
			return
		}

		if (key == "P") {
			tempName = key; // 将临时变量 tempName 修改为 'P'
			const allSpaceStatus = await getAllSpaceStatus();

			window.ue.call(
				"shezhiyincangcheliang",
				allSpaceStatus["空闲车位"].map((ccc) => "QC_" + ccc),
				function (rv) {
					console.log("ue callback:" + rv);
				}
			);

			window.ue.call(
				"shezhixianshicheliang",
				allSpaceStatus["占用车位"].map((ccc) => "QC_" + ccc),
				function (rv) {
					console.log("ue callback:" + rv);
				}
			);
		} else if (key == "1F") {
			tempName =
				diCengList[buildingName.value as keyof typeof diCengList] + "1";
		} else if (key == "主视图") {
			buildingName.value = "请点击楼号";
			parkingData.value = cheJianLouCengList[buildingName.value];
			// jujiao("DX");
			window.ue.call("reback", {}, function (rv) {
				console.log("ue callback:" + rv);
			});
			// parkingShow.value = false
			return;
		} else if (key == "楼号") {
			// 取反赋值
			yinchanglouhao.value = !yinchanglouhao.value;

			if (yinchanglouhao.value === true) {
				buildingName.value = "请点击楼号";
			}

			window.ue.call(
				"yincangxianshilouhao",
				{ Hidden: yinchanglouhao.value },
				function (rv) {
					console.log("ue callback:" + rv);
				}
			);
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

	const housePicObj = ref<any>({});

	// function dianziweilanjujiao(alarmName : string) {
	// 	// 点击列表和异常列表的时候调用这个，如果从异常列表切异常没解决点这个需要同时调用下面的异常
	// 	console.log("电子围聚焦" + alarmName);
	// 	window.ue.call(
	// 		"dianziweilanjujiao",
	// 		{
	// 			"AlarmName": alarmName
	// 		},
	// 		function (rv) {
	// 			console.log("ue callback:" + rv);
	// 		}
	// 	);
	// }

	// function dianziweilanbaojing(alarmName : string, State : number) {
	// 	// 电子围栏的异常列表里有异常的时候调用这个传true，如果异常解决了，就传false
	// 	// D:/VueProject/jindaiyaoyevue/src/pages/securitySituation.vue
	// 	console.log("电子围报警" + alarmName + State);
	// 	window.ue.call(
	// 		"dianziweilanbaojing",
	// 		{
	// 			"AlarmName": alarmName,
	// 			"State": State
	// 		},
	// 		function (rv) {
	// 			console.log("ue callback:" + rv);
	// 		}
	// 	);
	// }

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
					id: item.id,
					name: item.text ?? item.icon,
					icon: `${baseUrl}/../assets/${item.icon}.png`,
					icon_hover: `${baseUrl}/../assets/${item.icon}-hover.png`,
					isClick: item.isClick,
				};
			});
		}
	});

	// 点击设备中控操作
	function handleDeviceTypeClick(item : {
		isClick : boolean;
		icon : string;
		name : string;
		id : number;
	}) {
		// 更新当前路由对应的设备类型状态
		const currentRoute = router.currentRoute.value.path.substring(1);
		const currentState = deviceTypeStates[currentRoute];

		if (currentState) {
			const updatedDevices = currentState
				.getValue()
				.map((device) =>
					device.id === item.id
						? { ...device, isClick: !device.isClick }
						: device
				);
			currentState.next(updatedDevices);
			deviceTypeSubject.next(updatedDevices);
		}

		// 调用 UE 接口
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
		// 从异常列表里点击过来的
		if (data == null) {
			showErrorDetail.value = false;
			return;
		}

		getDeviceInfo(data.device_name)
			.then((res) => {
				if (!(res && res.length > 0)) {
					console.log("获取传感器详情失败");
					return;
				}
				var data_info = res[0];
				data_info.lou = data.lou;
				data_info.ceng = data.ceng;
				data_info.id = data.id;
				data_info.msg_content = data.msg_content;
				data_info.is_processed = data.is_processed;
				console.log("设备error信息", data_info);
				chuanganqijujiao_xuanze(data_info, 0);
				errorDetail.value = data_info;
				showDeviceDetail.value = false;
				showErrorDetail.value = true;
				// console.log("显示设备异常");
				// console.log(errorDetail.value);
				// console.log(
				// 	data,
				// 	data.lou,
				// 	data.ceng,
				// 	data.device_name,
				// 	data.is_processed === 0 ? true : false
				// );
			})
			.catch((error) => {
				console.error("Error fetching device info:", error);
			});
	});
	deviceSelectSubject.subscribe((data) => {
		// 从详情或者从3d模型上点击过来的，需要判断状态，异常的情况下，由于异常是对应多条的，没有准确的异常ID，所以无法在这里直接处理异常，只能看到这个设备当前是异常的
		console.log("传入的传感器详情", data);
		if (data == null) {
			showDeviceDetail.value = false;
			return;
		}
		getDeviceInfo(data.device_name)
			.then((res) => {
				if (!(res && res.length > 0)) {
					console.log("获取传感器详情失败");
					return;
				}
				var data_info = res[0];
				// data_info.device_type = data.device_type
				data_info.lou = data.lou;
				data_info.ceng = data.ceng;
				console.log("设备info信息", data_info);

				if (data_info.status !== "正常") {
					data_info.is_processed = 0;
				}

				chuanganqijujiao_xuanze(data_info, data.from_model);
				deviceDetail.value = data_info;
				showErrorDetail.value = false;
				showDeviceDetail.value = true;

				// console.log(deviceDetail.value);
				// console.log(data, data.lou, data.ceng, data.device_name);
				// juJiaoChuanGanQi(data.lou, data.ceng, data.device_name);
			})
			.catch((error) => {
				console.error("Error fetching device info:", error);
			});
	});

	function chuanganqijujiao_xuanze(data_info, from_model) {
		if (
			data_info.device_type_name === "电子围栏" &&
			data_info.realtime_data.Channel
		) {
			console.log("电子围报警" + data_info.realtime_data.Channel);

			if (data_info.status != "正常" && data_info.is_processed == 0) {
				// 如果还是异常状态就报警,异常且未处理
				dainziweilan_zhuangtaigaibian(data_info.realtime_data.Channel, 1);
				dainziweilan_jujiao(data_info.realtime_data.Channel);
			} else {
				dainziweilan_zhuangtaigaibian(data_info.realtime_data.Channel, 0);
				dainziweilan_jujiao(data_info.realtime_data.Channel);
			}
		} else if (
			data_info.device_type_name === "入侵报警" &&
			data_info.device_name
		) {
			console.log("入侵报警报警" + data_info.device_name, data_info);
			if (data_info.status != "正常" && data_info.is_processed == 0) {
				// 如果还是异常状态就报警,异常且未处理
				dainziweilan_zhuangtaigaibian(data_info.device_name, 1);
				// dainziweilan_jujiao(errorData.device_name)
			} else {
				dainziweilan_zhuangtaigaibian(data_info.device_name, 0);
				juJiaoChuanGanQi(data_info.lou, data_info.ceng, data_info.device_name);
			}
		} else {
			console.log("选择其他设备");
			setTimeout(() => {
				if (from_model != 1) {
					console.log("其他设备列表点击走定位");
					//如果从异常列表点击过来的就需要走定位
					juJiaoChuanGanQi(
						data_info.lou,
						data_info.ceng,
						data_info.device_name
					);
				}
				chuanganqibianseyichang(
					data_info.lou,
					data_info.ceng,
					data_info.device_name,
					data_info.is_processed === 0 ? true : false
				);
			}, 500);
		}
	}

	function dainziweilan_jujiao(alarmName : string) {
		// 电子围栏聚焦   errorData.realtime_data.Channel 入侵报警传 res[0].device_name,
		console.log("电子围栏聚焦");
		window.ue.call(
			"dianziweilanjujiao",
			{
				AlarmName: alarmName,
			},
			function (rv) {
				console.log("ue callback:" + rv);
			}
		);
	}

	function dainziweilan_zhuangtaigaibian(alarmName : string, state : number) {
		// 电子围栏传   errorData.realtime_data.Channel 入侵报警传 res[0].device_name,
		// state 0 正常 1 报警,
		console.log("电子围栏状态改变");
		window.ue.call(
			"dianziweilanbaojing",
			{
				AlarmName: alarmName,
				State: state,
			},
			function (rv) {
				console.log("ue callback:" + rv);
			}
		);
	}

	function chuanganqibianseyichang(
		BuildingName : string,
		floorId : number,
		SensorName : string,
		Warning : boolean
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

	function juJiaoChuanGanQi(
		BuildingName : string,
		floorId : number,
		SensorName : string
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


	onMounted(async () => {
		const hpList = await getHousePic();

		hpList.forEach((e) => {
			housePicObj.value[e.name] = e.imgUrl
		})
		// housePicObj.value["1号楼"] = "http://47.120.12.122:13363/uploads/1741330336031-857216341.jpg"

		console.log("户型图列表", housePicObj.value);
		try {
			if (window.ue && window.ue.interface) {
				console.log("电子围栏，入侵报警，初始化隐藏");
				dianziweilanChefang();
				window.ue.call(
					"dianziweilanyincang",
					{
						AlarmType: 1,
						Hidden: true,
					},
					function (rv) {
						console.log("ue callback:" + rv);
					}
				);
				riqinbaojingChefang();
				window.ue.call(
					"dianziweilanyincang",
					{
						AlarmType: 2,
						Hidden: true,
					},
					function (rv) {
						console.log("ue callback:" + rv);
					}
				);

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
						lou: chuanganqi.name,
						ceng: chuanganqi.FloorID,
						device_name: chuanganqi.SensorName,
						from_model: 1,
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
		cursor: pointer;
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
		background: linear-gradient(to bottom,
				#ffffff 0%,
				rgba(255, 255, 255, 0) 100%);
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
		cursor: pointer;
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

	.parking_content_item_bg.active {
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
		cursor: pointer;
	}

	.button-house-pic {
		position: absolute;
		bottom: 50%;
		left: 50%;
		z-index: 999;
		background-image: url("@/assets/close_word_btn.png");
		background-size: 100%;
		position: absolute;
		width: 48px;
		height: 14px;
		font-family: SourceHanSansSC-Normal;
		font-size: 8px;
		color: #ffffff;
		line-height: 10px;
		letter-spacing: 0px;
		text-align: right;
		font-style: normal;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
</style>