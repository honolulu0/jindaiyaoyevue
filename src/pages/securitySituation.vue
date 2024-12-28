<template>
	<div class="w-full h-full absolute top-0 left-0 z-0">
		<SecurityEquipment v-show="!isShowDetail" />
		<AreaMonitoring v-show="!isShowDetail" />
		<SecurityOpMenu @onButtonClick="handleButtonClick" />
		<ErrorAlert @itemClick="handleItemClick" :device_type="['9', '6', '7', '4']" />
		<CarEnterRecord />
	</div>
	<div class="model_container" v-if="isShowModel">
		<div class="model">
			<div class="model_title">
				<span>{{ modelData.title }}</span>
			</div>
			<div class="model_close_btn" @click="isShowModel = false">
				关闭
			</div>
			<div class="model_content">
				<span>一键{{ modelData.content }}成功！</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import SecurityOpMenu from "@/components/securityOpMenu.vue";
	import ErrorAlert from "@/components/errorAlert.vue";
	import CarEnterRecord from "@/components/carEnterRecord.vue";
	import SecurityEquipment from "@/components/securityEquipment.vue";
	import AreaMonitoring from "@/components/areaMonitoring.vue";
	import { ref } from "vue";

	const modelData = ref({
		title: "",
		content: "",
	});

	const isShowModel = ref(false);

	const handleItemClick = (item : any) => {
		// errorDetailData.value = item;
		isShowDetail.value = true;
	};

	const isShowDetail = ref(false);

	const handleButtonClick = (
		value : "布防" | "撤防",
		selectValue : "电子围栏" | "入侵报警"
	) => {
		modelData.value = {
			title: selectValue,
			content: value,
		};
		isShowModel.value = true;
		console.log(modelData.value);
		// 一键布防 显示 ，撤防 隐藏
		const hidden = value === "布防" ? false : true;
		console.log("电子围栏隐藏/显示" + hidden);
		window.ue.call(
			"dianziweilanyincang",
			{
				AlarmType: selectValue == "入侵报警" ? 1 : 2,
				Hidden: hidden,
			},
			function (rv) {
				console.log("ue callback:" + rv);
			}
		);
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