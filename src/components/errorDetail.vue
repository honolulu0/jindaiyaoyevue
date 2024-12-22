<template>
	<div class="error-detail">
		<div class="title">{{ title }}</div>
		<div class="device-info">
			<TitleComponent titleText="设备信息" />
			<div class="device-info-content">
				<div>设备名称:</div>
				<div class="device-name">{{ item.device_name }}</div>
				<div>设备类型:</div>
				<div class="device-type">{{ getDeviceTypeName(item.device_type) }}</div>
			</div>
			<TitleComponent titleText="异常信息" class="mt-3" />
			<div class="device-error-info">
				<div class="device-error-info-title">异常信息:</div>
				<div class="device-error-info-content" style="color: red">
					{{ item.msg_content }}
				</div>
				<div class="device-error-info-time">时间:</div>
				<div class="device-error-info-time-content">
					{{ formatDateTime(item.create_time) }}
				</div>
			</div>
			<div class="device-error-info-btn">
				<div class="device-error-info-btn-processed"
					v-if="item.is_processed === 1 || item.is_processed === '1'">
					已处理
				</div>
				<div class="device-error-info-btn-unprocessed" v-else @click="handleProcessedBtnClick(item.id)">
					未处理
				</div>
			</div>
		</div>
		<div class="back-btn">
			<div class="back-btn-text" @click="handleBackBtnClick">
				返回
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { errorAlertSubject } from "@/utils/errorAlertSubject";
	import TitleComponent from "./titleComponent.vue";
	import axiosInstance from "../apis/axios";
	import { processError } from "@/apis/processError";
	const DEVICE_TYPE_MAP = {
		"1": "水表",
		"2": "电表",
		"3": "车位",
		"4": "车辆道闸",
		"5": "智能井盖",
		"6": "电子围栏",
		"7": "视频监控",
		"8": "烟感报警",
		"9": "入侵报警",
		"10": "智能水节点",
		"11": "智能配电柜",
	};

	export interface ErrorDetailType {
		item : {
			id : string;
			device_name : string;
			device_type : string;
			msg_content : string;
			create_time : string;
			is_processed : string;
			rtsp_url : string;
			lou : string;
			ceng : number;
		};
		title : string;
	}

	const props = withDefaults(defineProps<ErrorDetailType>(), {
		item: () => ({
			id: "",
			device_name: "",
			device_type: "",
			msg_content: "",
			create_time: "",
			is_processed: "",
			rtsp_url: "",
			lou: "",
			ceng: 0,
		}),
		title: "安防",
	});

	const handleBackBtnClick = () => {
		errorAlertSubject.next(null);
	};

	const getDeviceTypeName = (type : string) => {
		return DEVICE_TYPE_MAP[type as keyof typeof DEVICE_TYPE_MAP] || type;
	};

	const handleProcessedBtnClick = async (id : string) => {
		const res = await processError(id);
		if (res) {
			props.item.is_processed = "1";
		}
	};

	const formatDateTime = (dateTimeString : string) => {
		if (!dateTimeString) return "";
		const date = new Date(dateTimeString);
		return date.toLocaleString("zh-CN", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: false,
		});
	};
</script>

<style scoped>
	.error-detail {
		width: 271px;
		height: 485px;
		position: absolute;
		left: 20px;
		top: 73px;
		background-color: rgba(65, 108, 145, 1);
		border: 1px solid rgba(255, 255, 255, 0.5);
		border-radius: 10px 0 0 10px;
		overflow: hidden;
	}

	.title {
		position: absolute;
		left: 48px;
		top: 22px;
		width: 176px;
		height: 18px;
		background-image: url("@/assets/小标题背景.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
		font-family: SourceHanSansCN-Normal;
		font-weight: 600;
		font-size: 13px;
		color: #ffffff;
		line-height: 13px;
		letter-spacing: 1px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.device-info {
		position: absolute;
		left: 14px;
		top: 62px;
		width: calc(100% - 14px);
		height: 58px;
		font-family: SourceHanSansCN-Normal;
		font-weight: 500;
		font-size: 7px;
		color: #e4f3ff;
		line-height: 14px;
		text-align: left;
		font-style: normal;
	}

	.device-info-content {
		margin-top: 10px;
		margin-left: 10px;
		display: grid;
		grid-template-columns: 1fr 3fr;
		gap: 10px;
		justify-content: center;
		padding-right: 30px;
	}

	.device-error-info {
		margin-top: 10px;

		margin-bottom: 10px;
		margin-right: 10px;
		display: grid;
		grid-template-columns: 1fr 3fr;
		gap: 10px;
		justify-content: center;
		padding-right: 30px;
		background: radial-gradient(circle at center,
				rgba(255, 0, 0, 0.2) 0%,
				rgba(255, 0, 0, 0.1) 50%,
				rgba(255, 0, 0, 0) 100%);
		padding: 15px;
		border-radius: 8px;
	}

	.device-error-info-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20px;
		margin-right: 30px;
		height: 10px;
		font-family: SourceHanSansCS-Normal;
		font-weight: 600;
		font-size: 9px;
		color: #ffffff;
		line-height: 10px;
		letter-spacing: 0px;
		text-align: right;
		font-style: normal;
	}

	.device-error-info-btn-processed {
		width: 50px;
		height: 20px;
		background-image: url("@/assets/已处理.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.device-error-info-btn-unprocessed {
		width: 50px;
		height: 20px;
		background-image: url("@/assets/未处理.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.back-btn {
		position: absolute;
		bottom: 17px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.back-btn-text {
		width: 72px;
		height: 18px;
		font-family: SourceHanSansCS-Normal;
		font-weight: 600;
		font-size: 9px;
		color: #ffffff;
		line-height: 10px;
		background-image: url("@/assets/返回按钮.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>