<template>
	<div class="absolute top-0 left-0" style="z-index: 100">
		<div class="bg_top"></div>
		<span class="title">建中·金岱生物医药产业园</span>
		<span class="sub_title">JINDAI Biomedical Industry Park</span>
		<div class="tab_container">
			<TopTab v-for="tab in filteredTabs" :key="tab.name" :name="tab.name" :icon="tab.icon" :iconTop="tab.iconTop"
				:iconLeft="tab.iconLeft" :iconWidth="tab.iconWidth" :iconHeight="tab.iconHeight" :isClick="tab.isClick"
				@click="tab.onClick" />
		</div>
		<div v-show="currentPage===0" class="mode-switch" @click="toggleMode">
			{{ isFullMode ? '演示模式' : '完整模式' }}
		</div>
		<div class="weather_time_container">
			<div class="weather"></div>
			<div class="weather_content">
				<!-- <div class="weather_icon1"></div> -->
				<div class="weather_icon2"></div>
				<div class="temperature" style="width: 30px;left: 10px;">
					<span>{{ temperatureH }}</span>
				</div>
				<div class="temperature" style="left: 40px;">~</div>
				<div class="temperature" style="width: 30px;left: 48px;">
					<span>{{ temperatureL }}</span>
				</div>
			</div>
			<div class="time"></div>
		</div>
		<div class="time_content">{{ time }}</div>
		<div class="date_content">{{ date }}</div>
	</div>
</template>

<script setup lang="ts">
	import TopTab from "@/components/topTab.vue";
	import { parkingSubject, topTabsSubject } from "@/event";
	import { reactive, ref, onMounted, computed } from "vue";
	import { useRouter } from "vue-router";
	import { errorAlertSubject } from "@/utils/errorAlertSubject";
	import { deviceSelectSubject } from "@/utils/deviceSelectSubject";
	import { getTemperature } from "@/apis/getTemperature";
	const router = useRouter();
	const tabsName = reactive([
		{
			name: "综合态势",
			icon: "综合icon.png",
			iconTop: "8px",
			iconLeft: "23px",
			iconWidth: "12px",
			iconHeight: "7px",
			isClick: false,
			onClick: () => {
				setClick(0);
				router.push("/comprehensiveSituation");
			},
		},
		{
			name: "安防态势",
			icon: "安防态势icon.png",
			iconTop: "7px",
			iconLeft: "23px",
			iconWidth: "11px",
			iconHeight: "9px",
			isClick: false,
			onClick: () => {
				setClick(2);
				router.push("/securitySituation");
				parkingSubject.next(true);
				errorAlertSubject.next(null);
				deviceSelectSubject.next(null);
			},
		},
		{
			name: "园区设施",
			icon: "园区设施icon.png",
			iconTop: "5px",
			iconLeft: "23px",
			iconWidth: "10px",
			iconHeight: "10px",
			isClick: false,
			onClick: () => {
				setClick(3);
				router.push("/parkFacilities");
				parkingSubject.next(true);
				errorAlertSubject.next(null);
				deviceSelectSubject.next(null);
			},
		},
		{
			name: "电力环境",
			icon: "电力环境.png",
			iconTop: "5px",
			iconLeft: "23px",
			iconWidth: "12px",
			iconHeight: "12px",
			isClick: false,
			onClick: () => {
				setClick(4);
				router.push("/powerEnvironment");
				parkingSubject.next(false);
				errorAlertSubject.next(null);
				deviceSelectSubject.next(null);
			},
		},
		{
			name: "能耗态势",
			icon: "能耗态势icon.png",
			iconTop: "5px",
			iconLeft: "24px",
			iconWidth: "10px",
			iconHeight: "12px",
			isClick: false,
			onClick: () => {
				setClick(5);
				router.push("/energyConsumptionSituation");
				parkingSubject.next(false);
				errorAlertSubject.next(null);
				deviceSelectSubject.next(null);
			},
		},
		{
			name: "企业及人员",
			icon: "企业及人员icon.png",
			iconTop: "5px",
			iconLeft: "22px",
			iconWidth: "12px",
			iconHeight: "11px",
			isClick: false,
			onClick: () => {
				setClick(6);
				router.push("/enterprises");
				parkingSubject.next(false);
				errorAlertSubject.next(null);
				deviceSelectSubject.next(null);
			},
		},
		{
			name: "园区招商",
			icon: "招商icon.png",
			iconTop: "6px",
			iconLeft: "27px",
			iconWidth: "10px",
			iconHeight: "9px",
			isClick: false,
			onClick: () => {
				setClick(1);
				router.push("/parkInvestmentPromotion");
				parkingSubject.next(true);
				errorAlertSubject.next(null);
				deviceSelectSubject.next(null);
			},
		},
		{
			name: "成果可视化",
			icon: "成果可视化icon.png",
			iconTop: "6px",
			iconLeft: "23px",
			iconWidth: "10px",
			iconHeight: "9px",
			isClick: false,
			onClick: () => {
				setClick(7);
				// router.push("/achievementVisualization");
				router.push("/parkPolicy");
				// router.push("/partyBuilding");
				parkingSubject.next(false);
				errorAlertSubject.next(null);
				deviceSelectSubject.next(null);
			},
		},
	]);
	const temperatureH = ref("0℃");
	const temperatureL = ref("-9℃");
	const time = ref("");
	const date = ref("");
	const isFullMode = ref(true);
	const currentPage = ref(0);

	const setClick = (index : number) => {
		currentPage.value = index
		yincangxianshisuoyou()
	};

	function yincangxianshisuoyou() {
		// 一键布防 显示 ，撤防 隐藏
		// D:/VueProject/jindaiyaoyevue/src/pages/securitySituation.vue
		console.log("切换tabbar隐藏所有传感器");
		window.ue.call(
			"yincangxianshisuoyou",
			{
				"Hidden": true
			},
			function (rv) {
				console.log("ue callback:" + rv);
			}
		);
	}

	topTabsSubject.subscribe((res) => {
		tabsName.forEach((tab) => {
			tab.isClick = false;
		});
		tabsName[res].isClick = true;
	});

	const updateDateTime = () => {
		const now = new Date();
		// 更新时间
		const hours = now.getHours().toString().padStart(2, "0");
		const minutes = now.getMinutes().toString().padStart(2, "0");
		const seconds = now.getSeconds().toString().padStart(2, "0");
		time.value = `${hours}:${minutes}:${seconds}`;

		// 更新日期
		const year = now.getFullYear();
		const month = (now.getMonth() + 1).toString().padStart(2, "0");
		const day = now.getDate().toString().padStart(2, "0");
		date.value = `${year}.${month}.${day}`;
	};

	onMounted(async () => {
		console.log("temperature");
		const temperature = await getTemperature();
		console.log(temperature);
		temperatureH.value = temperature.temperatureH
		temperatureL.value = temperature.temperatureL
	})

	// 初始化时间和日期
	updateDateTime();

	// 每秒更新一次时间和日期
	setInterval(updateDateTime, 1000);

	// 过滤显示的标签页
	const filteredTabs = computed(() => {
		if (isFullMode.value) {
			return tabsName;
		} else {
			return tabsName.filter((tab, index) => [0, 6, 7].includes(index));
		}
	});

	// 切换显示模式
	const toggleMode = () => {
		isFullMode.value = !isFullMode.value;
	};
</script>

<style scoped>
	.title {
		position: absolute;
		top: 9px;
		left: 57px;
		width: 160px;
		height: 19px;
		font-family: YouSheBiaoTiHei;
		font-size: 14px;
		z-index: 100;
		color: #e9f7ff;
		line-height: 19px;
		text-align: left;
		font-style: normal;
	}

	.sub_title {
		position: absolute;
		top: 25px;
		left: 57px;

		width: 104px;
		height: 8px;
		font-family: DIN;
		font-weight: 600;
		font-size: 6px;
		color: #a5d8fc;
		line-height: 8px;
		text-align: left;
		font-style: normal;
		text-transform: uppercase;
	}

	.bg_top {
		background-image: url("@/assets/top背景.png");
		width: 1080px;
		height: 55px;
		background-size: 100%;
	}

	.tab_container {
		position: absolute;
		width: 699px;
		height: 22px;
		top: 15px;
		left: 232px;
	}

	.tab_container> :nth-child(1) {
		left: 0;
	}

	.tab_container> :nth-child(2) {
		left: 83px;
	}

	.tab_container> :nth-child(3) {
		left: 166px;
	}

	.tab_container> :nth-child(4) {
		left: 249px;
	}

	.tab_container> :nth-child(5) {
		left: 332px;
	}

	.tab_container> :nth-child(6) {
		left: 415px;
	}

	.tab_container> :nth-child(7) {
		left: 498px;
	}

	.tab_container> :nth-child(8) {
		left: 581px;
	}

	.tab_container> :nth-child(9) {
		left: 664px;
	}

	.weather_time_container {
		position: absolute;
		display: flex;
		align-items: center;
		top: 9px;
		left: 931px;
		width: 138px;
		height: 18px;
	}

	.weather {
		border-left: 1px solid #ffffff;
		opacity: 0.5;
		height: 11px;
		width: 0px;
	}

	.time {
		border-left: 1px solid #ffffff;
		opacity: 0.5;
		height: 11px;
		width: 0px;
	}

	.weather_content {
		width: 79px;
		height: 18px;
	}

	.temperature {
		position: absolute;
		top: 3px;
		height: 11px;
		font-family: YouSheBiaoTiHei;
		font-size: 9px;
		color: #ffffff;
		line-height: 11px;
		text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
		font-style: normal;
		text-align: center;
	}

	.weather_icon1 {
		background-image: url("@/assets/天气1.png");
		background-size: contain;
		width: 13px;
		height: 11px;
		position: absolute;
		left: 11px;
		top: 2px;
	}

	.weather_icon2 {
		background-image: url("@/assets/head_sc_tem.png");
		background-size: contain;
		background-position: center;
		width: 15px;
		height: 15px;
		position: absolute;
		left: -2px;
		top: 1px;
	}

	.time_content {
		width: 47px;
		height: 12px;
		font-family: YouSheBiaoTiHei;
		font-size: 9px;
		color: #ffffff;
		line-height: 12px;
		letter-spacing: 1px;
		text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
		text-align: left;
		font-style: normal;
		position: absolute;
		top: 9px;
		right: 12px;
	}

	.date_content {
		width: 30px;
		height: 7px;
		font-family: YouSheBiaoTiHei;
		font-size: 5px;
		color: #cbcbcb;
		line-height: 7px;
		text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
		text-align: left;
		font-style: normal;
		position: absolute;
		top: 21px;
		right: 22px;
	}

	.mode-switch {
		position: absolute;
		top: 50px;
		left: 200px;
		padding: 3px 4px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 3px;
		color: #fff;
		font-size: 6px;
		cursor: pointer;
		z-index: 100;
	}

	.mode-switch:hover {
		background: rgba(255, 255, 255, 0.2);
	}
</style>