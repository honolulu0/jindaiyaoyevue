<template>
	<Transition name="fade">
		<div class="model_container">
			<Transition name="slide-fade">
				<div class="model">
					<div class="model_title">异常告警详情</div>
					<div class="close_btn" @click="handleClose">
						关闭
					</div>
					<div class="model_content">
						<div class="mr-1">
							<div class="model_content_text"
								:style="['视频监控', '配电柜', '水表'].includes(mappedData['device_type_name'])  ? 'width: 100%;' : 'width: 460px;'">
								<div class="model_content_item" v-for="(item, key) in displayItems" :key="key">
									<div class="model_content_item_title">
										{{ item.label }}
									</div>
									<div class="model_content_item_value"
										:class="{ 'msg-content': (item.key === 'msg_content' && mappedData[item.key] != '正常') }">
										<p>{{ mappedData[item.key] || "无" }}</p>
									</div>
								</div>
							</div>
							<div class="process-btn-container" :class="{
                  'error-bg':
                    mappedData.is_processed === 0 ||
                    mappedData.is_processed === '0',
                  'success-bg':
                    mappedData.is_processed === 1 ||
                    mappedData.is_processed === '1',
                }">
								<div class="device-error-info-btn">
									<div class="device-error-info-btn-processed" v-if="
                      mappedData.is_processed === 1 ||
                      mappedData.is_processed === '1'
                    ">
										已处理
									</div>
									<div class="device-error-info-btn-unprocessed" v-else
										@click="handleProcessedBtnClick(mappedData.id)">
										未处理
									</div>
								</div>
							</div>
						</div>
						<div class="model_content_realtime">
							<!-- 			<template v-if="deviceData?.url">
								<div class="realtime-title">实时监控</div>
								<div class="video-container">
									<WebRTCStream :url="deviceData.url" />
								</div>
							</template> -->
							<div class="realtime-title">实时数据</div>
							<div class="realtime-content">
								<div class="model_content_item" v-for="(value, key) in props.data?.realtime_data"
									:key="key">
									<div class="model_content_item_title" style="min-width: 100px">
										{{ key }}
									</div>
									<div class="model_content_item_value">
										<p>{{ value == "" || value == null ? "无" : value }}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Transition>
		</div>
	</Transition>
</template>

<script setup lang="ts">
	import { processError } from "@/apis/processError";
	import { errorAlertSubject } from "@/utils/errorAlertSubject";
	import dayjs from "dayjs";
	import { computed, onMounted, ref } from "vue";
	import VueJsonPretty from "vue-json-pretty";
	import "vue-json-pretty/lib/styles.css";
	import WebRTCStream from "./WebRTCStream.vue";
	import { getDeviceInfo } from "@/apis/getDeviceInfo";

	const props = defineProps<{
		data : any;
	}>();

	const handleClose = () => {
		errorAlertSubject.next(null);
	};

	const mappedData = computed(() => {
		return {
			...props.data,
			create_time: dayjs(props.data.create_time).format(
				"YYYY年MM月DD日 HH:mm:ss"
			),
		};
	});

	const handleProcessedBtnClick = async (id : string) => {
		const res = await processError(id);
		if (res) {
			// 解除异常
			props.data.is_processed = "1";
			// 电子围栏的异常列表里有异常的时候调用这个传true，如果异常解决了，就传false
			if (
				props.data.device_type_name === "电子围栏" &&
				props.data.realtime_data.Channel
			) {
				window.ue.call(
					"dianziweilanbaojing",
					{
						"AlarmName": props.data.realtime_data.Channel,
						"State": 0
					},
					function (rv) {
						console.log("ue callback:" + rv);
					}
				);
			} else if (props.data.device_type_name === "入侵报警" && props.data.device_name) {
				window.ue.call(
					"dianziweilanbaojing",
					{
						"AlarmName": props.data.device_name,
						"State": 0
					},
					function (rv) {
						console.log("ue callback:" + rv);
					}
				);
			} else {
				window.ue.call(
					"jujiaoyichangchuanganqi",
					{
						BuildingName: props.data.lou,
						FloorID: props.data.ceng,
						SensorName: props.data.device_name,
						Warning: false,
					},
					function (rv) {
						console.log("ue callback:" + rv);
					}
				);
			}
		}
	};

	const displayItems = [
		{ label: "设备名称", key: "location" },
		{ label: "设备类型", key: "device_type_name" },
		// { label: "设备位置", key: "location" },
		{ label: "当前状态", key: "msg_content" },
		{ label: "发生时间", key: "create_time" },
	];

	onMounted(async () => {

	});
</script>

<style scoped>
	.model_container {
		width: 1080px;
		height: 579px;
		position: absolute;
		z-index: 10000;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, 0.5);
	}

	.model {
		position: absolute;
		width: 587px;
		height: 298px;
		background: url("@/assets/enterprises/弹窗背景.png") no-repeat center center;
		background-size: 100% 100%;
	}

	.model_title {
		position: absolute;
		top: 40px;
		left: 232px;
		width: 126px;
		height: 18px;
		font-family: YouSheBiaoTiHei;
		font-size: 18px;
		color: #71f3ff;
		line-height: 18px;
		letter-spacing: 3px;
		text-align: left;
		font-style: normal;
	}

	.msg-content {
		color: red;
	}

	.close_btn {
		position: absolute;
		top: 40px;
		right: 45px;
		cursor: pointer;
		width: 35px;
		height: 14px;
		font-family: YouSheBiaoTiHei;
		font-size: 14px;
		color: #71f3ff;
		line-height: 14px;
		letter-spacing: 3px;
		text-align: left;
		font-style: normal;
	}

	.model_content {
		position: absolute;
		top: 65px;
		left: 60px;
		width: 80%;
		height: 190px;
		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-content: center;
		align-items: center;
	}

	.model_content_text {
		height: max-content;
		border: 1px solid #2b9daa;
		border-radius: 10px;
		overflow: hidden;
	}

	.model_content_item {
		display: grid;
		grid-template-columns: 1.8fr 5fr;
		align-items: center;
		height: 30px;
		font-family: SourceHanSansCS-Normal;
		font-weight: 500;
		font-size: 11px;
		color: #71f3ff;
		line-height: 30px;
		letter-spacing: 1px;
		text-align: left;
		font-style: normal;
	}

	.model_content_item_title {
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(255, 255, 255, 0.1);
		border-top: 1px solid transparent;
		border-right: 1px solid #2b9daa;
		border-bottom: 1px solid #2b9daa;
	}

	.model_content_item_value {
		display: flex;
		justify-content: start;
		align-items: center;
		padding-left: 10px;
		align-items: center;
		background: rgba(255, 255, 255, 0.1);
		border-bottom: 1px solid #2b9daa;
		text-wrap: nowrap;
		overflow: hidden;
	}

	p {
		text-wrap: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}

	.slide-fade-enter-active,
	.slide-fade-leave-active {
		transition: all 0.3s ease;
	}

	.slide-fade-enter-from,
	.slide-fade-leave-to {
		transform: translateY(-20px);
		opacity: 0;
	}

	.model_content_btn {
		width: 100%;
		height: 80%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.error-bg {
		background: radial-gradient(circle at center,
				rgba(255, 0, 0, 0.2) 0%,
				rgba(255, 0, 0, 0.1) 50%,
				rgba(255, 0, 0, 0) 100%);
	}

	.success-bg {
		background: radial-gradient(circle at center,
				rgba(21, 255, 0, 0.2) 0%,
				rgba(21, 255, 0, 0.1) 50%,
				rgba(21, 255, 0, 0) 100%);
	}

	.device-error-info-btn {
		display: flex;
		justify-content: center;
		align-items: center;
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

	.model_content_realtime {
		width: 100%;
		height: 190px;
		border: 1px solid #2b9daa;
		border-radius: 10px;
		overflow: hidden;
	}

	.realtime-title {
		padding: 5px 10px;
		background: rgba(255, 255, 255, 0.1);
		border-bottom: 1px solid #2b9daa;
		color: #71f3ff;
		font-size: 12px;
	}

	.realtime-content {
		height: calc(100% - 30px);
		overflow: auto;
		color: #71f3ff;
		-ms-overflow-style: none;
		/* IE 和 Edge */
		scrollbar-width: none;
		/* Firefox */
	}

	/* 隐藏 Webkit 浏览器的滚动条 */
	.realtime-content::-webkit-scrollbar {
		display: none;
	}

	.video-container {
		height: calc(100% - 30px);
		overflow: hidden;
	}

	.process-btn-container {
		height: 67px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>