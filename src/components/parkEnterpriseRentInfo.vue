<template>
	<div class="park-enterprise-rent-info">
		<div class="building-name-container">
			<div style="padding-left: 5px">{{ buildingInfo.buildingName }}</div>
			<div style="
          font-size: 8px;
          width: 10px;
          height: 10px;
          padding-right: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-bottom: 2px;
		      cursor: pointer;" @click="sendClose">
				x
			</div>
		</div>
		<div class="building-info-container">
			<div class="floor-container">
				<div class="floor-name"></div>
				<div class="floor-name"></div>
				<div v-for="floor in floors" style="cursor: pointer;" @click="selectFloor(floor.floorName)"
					:key="floor.floorName" :class="{ 'floor-name-active': selectedFloor === floor.floorName }"
					class="floor-name">
					{{ floor.floorName }}
				</div>
				<div class="floor-name"></div>
				<div class="floor-name"></div>
			</div>
			<div class="room-container">
				<div class="room-select-container">
				</div>
				<div class="rents-container">
					<div v-for="item in rentItems" :key="item.id" class="rent-item">
						<div class="rent-item-img-container">
              <div :style="{ color: item?.parkEnterprise ? 'red' : 'green' }">{{ item.room }}</div>
							<img class="rent-item-img" v-if="item?.parkEnterprise" :src="item?.parkEnterprise?.imgUrl" style="width: 20px; height: 20px" alt="" />
              <HomeOutlined v-else style="font-size: 15px; border-radius: 50%; padding: 2px;" />
						</div>
						<div class="rent-item-info">
							<div class="rent-item-info-name" :title="item.parkEnterprise?.name ?? '房间空置中'">
								{{ item.parkEnterprise?.name ?? '房间空置中' }}
							</div>
							<div class="rent-item-info-pic-btn-container">
								<div class="rent-item-info-pic-btn-container-time">
									<div>
										<span>租赁开始时间：</span>
										<span>{{ item.rentStartAt ? dayjs(item.rentStartAt).format("YYYY-MM-DD") : '-' }}</span>
									</div>
									<div>
										<span>租赁结束时间：</span>
										<span>{{ item.rentEndAt ? dayjs(item.rentEndAt).format("YYYY-MM-DD") : '-' }}</span>
									</div>
								</div>
								<div class="rent-item-info-pic-btn" style="cursor: pointer;"
									@click.stop="showImage(item.imgUrl)">
									户型图
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<a-image :width="0" :height="0" style="width: 100%; height: 100%;" :preview="{
        visible: previewVisible,
        onVisibleChange: handlePreviewVisible,
      }" :src="currentImageUrl" />
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted, computed } from "vue";
	import dayjs from "dayjs";
	import { getParkEnterpriseRentInfo } from "@/apis/getParkEnterpriseRentInfo";
	import { Tooltip as ATooltip, Image as AImage } from "ant-design-vue";

	import emitter from '@/utils/eventBus.js';
	import { HomeOutlined } from "@ant-design/icons-vue";
	const props = defineProps<{
		buildingName : string;
	}>();
	const buildingInfo = ref<any>({});
	const selectedFloor = ref("1F");
	const floors = ref<any[]>([]);
	const rentItems = ref<any[]>([]);

	const sendClose = () => {
		// console.log("发送关闭");
		emitter.emit('set_enterprises_show', false);
	};
	onMounted(async () => {
		const res = await getParkEnterpriseRentInfo(props.buildingName);
		buildingInfo.value = res.data;
		floors.value = buildingInfo.value.floors.sort((a : any, b : any) =>
			a.floorName.localeCompare(b.floorName)
		);
		if (floors.value.length > 0) {
			selectFloor(floors.value[0].floorName);
		}
	});

	const selectFloor = (floorName : string) => {
		selectedFloor.value = floorName;
		const currentFloor = buildingInfo.value.floors.find(
			(floor : any) => floor.floorName === floorName
		);
		rentItems.value = currentFloor.rooms.reduce((acc : any[], room : any) => {
			return acc.concat(room.rents || []);
		}, []);
	};

	const previewVisible = ref(false);
	const currentImageUrl = ref("");

	const showImage = (imgUrl : string) => {
		currentImageUrl.value = imgUrl;
		previewVisible.value = true;
	};
	const handlePreviewVisible = (visible : boolean) => {
		previewVisible.value = visible;
	};
</script>

<style scoped>
	.park-enterprise-rent-info {
		position: absolute;
		z-index: 1000;
		top: 115px;
		right: 285px;
		width: 150px;
		height: 200px;
		display: flex;
		flex-direction: column;
		user-select: none;
	}

	.building-name-container {
		font-size: 8px;
		/* font-weight: bold; */
		color: #fff;
		display: flex;
		justify-content: space-between;
		/* 左右间距，中间留白 */
		align-items: center;
		height: 16px;
		border-radius: 5px;
		background-color: rgba(0, 0, 0, 0.5);
		border: 1px solid rgb(37 116 136 / 42%);
	}

	.building-info-container {
		margin-top: 3px;
		border-radius: 5px;
		font-size: 6px;
		flex: 1;
		/* font-weight: bold; */
		color: #fff;
		display: flex;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		border: 1px solid rgb(37 116 136 / 42%);
	}

	.floor-container {
		/* padding: 5px; */
		/* display: grid; */
		/* grid-template-columns: repeat(2, 1fr); */
		justify-content: center;
		align-items: center;
		gap: 2px;
		position: relative;
		border: 1px solid rgb(37 116 136 / 42%);
		border-top: none;
		border-left: none;
		border-bottom: none;
	}

	.floor-name {
		color: #fff;
		font-size: 8px;
		width: 22px;
		height: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.floor-name-active {
		color: #fff;
		background: rgb(37 116 136 / 42%);
		border-radius: 50%;
		width: 15px;
		height: 15px;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		margin-left: 4px;
	}

	.room-container {
		margin-left: 3px;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.triangle {
		width: 0;
		height: 0;
		border-top: 3px solid transparent;
		border-bottom: 3px solid transparent;
		border-left: 4px solid #fff;
	}

	.triangle-container-1 {
		grid-column: 1 / 3;
		grid-row: 1 / 2;
		display: flex;
		justify-content: center;
		align-items: center;
		transform: rotate(-90deg);
	}

	.triangle-container-2 {
		grid-column: 1 / 3;
		align-self: flex-end;
		display: flex;
		justify-content: center;
		align-items: center;
		transform: rotate(90deg);
	}

	.room-select-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 5px 0;
		padding-right: 5px;
		gap: 5px;
	}

	.room-name-container {
		display: flex;
		align-items: center;
		flex: 1;
		justify-content: start;
		padding: 5px;
		height: 6px;
		gap: 5px;
		background-color: #052122;
		border-radius: 10px;
	}

	.room-name {
		color: #fff;
		font-size: 5px;
		min-width: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.room-name-active {
		background: rgb(37 116 136 / 42%);
		border-radius: 10px;
		color: #fff;
		font-size: 4px;
		min-width: 20px;
		display: flex;
		cursor: pointer;
		align-items: center;
		justify-content: center;
	}

	.arrow {
		color: #fff;
		font-size: 8px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.arrow-disabled {
		color: #666;
		cursor: not-allowed;
	}

	.left-arrow {
		margin-right: 2px;
	}

	.right-arrow {
		margin-left: 2px;
	}

	.rents-container {
		/* padding: 5px; */
		margin-right: 5px;
		display: flex;
		flex-direction: column;
		gap: 5px;
		flex: 1;
		flex-shrink: 0;
		overflow-y: scroll;
		scrollbar-width: none;
		/* Firefox */
		-ms-overflow-style: none;

		/* IE and Edge */
		&::-webkit-scrollbar {
			display: none;
			/* Chrome, Safari and Opera */
		}
	}

	.rent-item {
		width: 100%;
		height: 40px;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		border: 1px solid rgb(37 116 136 / 42%);
		border-radius: 5px;
	}

	.rent-item-img {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		overflow: hidden;
		display: flex;
	}

  .rent-item-img-container {
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 25px; 
    width: 20px;
  }

	.rent-item-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: start;
		height: 30px;
	}

	.rent-item-info-name {
		margin-top: 3px;
		margin-left: 5px;
		font-size: 5px;
		/* font-weight: bold; */
		color: #fff;
		max-width: 80px;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.rent-item-info-pic-btn-container {
		width: 100%;
		display: flex;
		align-items: center;
    margin-left: 5px;
		padding-top: 3px;
		padding-right: 5px;
	}

	.rent-item-info-pic-btn-container-time {
		font-size: 4px;
		padding-right: 5px;
    flex: 1;
	}

	.rent-item-info-pic-btn {
    margin-right: 3px;
		font-size: 5px;
		/* font-weight: bold; */
		color: #fff;
		background-color: rgb(37 116 136 / 42%);
		padding: 1px 2px;
		cursor: pointer;
		border-radius: 3px;
		cursor: pointer;
		padding-top: 2px;
		padding-right: 3px;
		padding-left: 3px;
	}

	.rent-item-info-tooltip {
		font-size: 6px;
		min-height: auto;
		padding: 2px;
	}

	/* 隐藏Image组件本身，只显示预览效果 */
	:deep(.ant-image) {
		display: none;
	}
</style>