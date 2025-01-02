<template>
	<div class="distribution-box-temp">
		<TitleComponent titleText="园区配电柜热力图" />
		<div class="chart-container">
			<div class="chart-container-item">
				<!-- <div class="title">电子车间楼栋配电柜</div> -->
				<!-- <div class="item-container1">
          <Tooltip
            v-for="i of containerThreeData"
            :key="i.location"
            placement="top"
          >
            <template #title>
              <div class="tooltip-content">
                <div>位置: {{ i.location }}</div>
                <div>温度: {{ i.meter_info['温度(℃)'] }}°C</div>
              </div>
            </template>
            <div
              class="item-container-item"
              :class="bgMap(i)"
            >{{ i.meter_info["温度(℃)"] }}</div>
          </Tooltip>
        </div> -->
			</div>
			<div class="chart-container-item">
				<div class="title">温度色块注释</div>
				<div class="item-container2">
					<div class="legend-item">
						<div class="color-block purple"></div>
						<span>30°以上</span>
					</div>
					<div class="legend-item">
						<div class="color-block blue"></div>
						<span>30°</span>
					</div>
					<div class="legend-item">
						<div class="color-block cyan"></div>
						<span>20°</span>
					</div>
					<div class="legend-item">
						<div class="color-block white"></div>
						<span>10°</span>
					</div>
				</div>
			</div>
			<div class="chart-container-item">
				<div class="title">车间#1</div>
				<div class="item-container3">
					<Tooltip v-for="i of containerOneData" :key="i.location" placement="top">
						<template #title>
							<div class="tooltip-content">
								<div>位置: {{ i.location }}</div>
								<div>温度: {{ i.meter_info['温度(℃)'] }}°C</div>
							</div>
						</template>
						<div class="item-container-item" :class="bgMap(i)">{{ i.meter_info["温度(℃)"] }}</div>
					</Tooltip>
				</div>
			</div>
			<div class="chart-container-item">
				<div class="title">车间#2</div>
				<div class="item-container3">
					<Tooltip v-for="i of containerTwoData" :key="i.location" placement="top">
						<template #title>
							<div class="tooltip-content">
								<div>位置: {{ i.location }}</div>
								<div>温度: {{ i.meter_info['温度(℃)'] }}°C</div>
							</div>
						</template>
						<div class="item-container-item" :class="bgMap(i)">{{ i.meter_info["温度(℃)"] }}</div>
					</Tooltip>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import TitleComponent from "./titleComponent.vue";
	import { ref, onMounted } from "vue";
	import { getTempData, ITempResponse } from "@/apis/getTempData";
	import { Tooltip } from 'ant-design-vue';
	const tempData = ref<ITempResponse[]>([]);
	const containerOneData = ref<ITempResponse[]>([]);
	const containerTwoData = ref<ITempResponse[]>([]);
	const containerThreeData = ref<ITempResponse[]>([]);

	const bgMap = (item : ITempResponse) => {
		const temp = Number(item.meter_info["温度(℃)"]);
		if (temp > 30) {
			return "purple";
		} else if (20 < temp && temp <= 30) {
			return "blue";
		} else if (10 < temp && temp <= 20) {
			return "cyan";
		} else {
			return "white";
		}
	};

	onMounted(async () => {
		tempData.value = await getTempData();
		containerOneData.value = tempData.value
			.filter((item) => item.location.includes("1#"))
			.slice(0, 20)
			.map((item) => ({
				...item,
				meter_info: {
					...item.meter_info,
					"温度(℃)": item.meter_info["温度(℃)"]
						? Number(item.meter_info["温度(℃)"]).toFixed(0)
						: Number(item.meter_info["温度（℃）"]).toFixed(0),
				},
			}));
		containerTwoData.value = tempData.value
			.filter((item) => item.location.includes("2#"))
			.slice(0, 20)
			.map((item) => ({
				...item,
				meter_info: {
					...item.meter_info,
					"温度(℃)": item.meter_info["温度(℃)"]
						? Number(item.meter_info["温度(℃)"]).toFixed(0)
						: Number(item.meter_info["温度（℃）"]).toFixed(0),
				},
			}));
		containerThreeData.value = tempData.value
			.filter(
				(item) =>
					!(item.location.includes("2#") || item.location.includes("1#"))
			)
			.slice(0, 7)
			.map((item) => ({
				...item,
				meter_info: {
					...item.meter_info,
					"温度(℃)": item.meter_info["温度(℃)"]
						? Number(item.meter_info["温度(℃)"]).toFixed(0)
						: Number(item.meter_info["温度（℃）"]).toFixed(0),
				},
			}));
	});
</script>

<style scoped>
	.distribution-box-temp {
		width: 206px;
		height: 159px;
		position: absolute;
		top: 335px;
		right: 21px;
	}

	.chart-container {
		width: 100%;
		margin-top: 10px;
		height: calc(100% - 35px);
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 3fr;
		gap: 3px;
	}

	.chart-container-item {
		background: rgba(126, 231, 255, 0.1);
		border: 0px solid #ffffff;
	}

	.title {
		width: 100%;
		height: 9px;
		font-family: YouSheBiaoTiHei;
		font-size: 7px;
		color: #ffffff;
		line-height: 9px;
		text-align: center;
		font-style: normal;
		margin-top: 3px;
	}

	.item-container1 {
		width: 100%;
		height: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 3px;
		padding: 0 3px;
	}

	.item-container2 {
		padding: 2px 5px;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		flex-direction: column;
		justify-content: space-around;
		height: 9px;
		margin-left: 5px;
	}

	.legend-item {
		display: flex;
		align-items: center;
	}

	.color-block {
		width: 6px;
		height: 6px;
		margin-bottom: 4px;
		border: 1px solid rgba(255, 255, 255, 0.3);
	}

	.legend-item span {
		color: #fff;
		font-size: 6px;
		margin-left: 1px;
		margin-bottom: 4px;
		line-height: 6px;
	}

	.purple {
		background: #8b5cf6;
	}

	.blue {
		background: #3b82f6;
	}

	.cyan {
		background: #67e8f9;
	}

	.white {
		background: rgb(185, 246, 185);
	}

	.item-container3 {
		/* padding-left: 30px;
    padding-right: 30px; */
		padding-top: 5px;
		padding-bottom: 5px;
		display: grid;
		height: 80px;
		aspect-ratio: 9/16;
		margin: 0 auto;
		grid-template-columns: repeat(5, 12fr);
		grid-template-rows: repeat(4, 18fr);
		justify-content: center;
		justify-items: center;
		align-items: center;
		/* gap: 2px; */
	}

	.item-container4 {
		margin-top: 10px;
	}

	.item-container-item {
		display: flex;
		min-width: 12px;
		min-height: 18px;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: YouSheBiaoTiHei;
		font-size: 7px;
		border: 0.5px solid rgb(87, 87, 87, 0.3);
		cursor: pointer;
		transition: all 0.3s;
	}

	.item-container-item:hover {
		transform: scale(1.05);
		box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
	}

	.tooltip-content {
		font-size: 12px;
		line-height: 1.5;
		color: #fff;
		text-align: left;
	}

	/* 自定义 Tooltip 样式 */
	:deep(.ant-tooltip) {
		max-width: 250px;
	}

	:deep(.ant-tooltip-inner) {
		background-color: rgba(0, 0, 0, 0.85);
		padding: 8px 12px;
		border-radius: 4px;
	}
</style>