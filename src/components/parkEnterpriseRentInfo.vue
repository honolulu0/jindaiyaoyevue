<template>
  <div class="park-enterprise-rent-info">
    <div class="building-name-container">
      <div style="padding-left: 5px">{{ buildingInfo.buildingName }}</div>
      <div
        style="
          font-size: 10px;
          width: 10px;
          height: 10px;
          padding-right: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #127375;
          font-weight: 300;
        "
      >
        x
      </div>
    </div>
    <div class="building-info-container">
      <div class="floor-container">
        <div
          class="triangle-container-1"
          @click="prevFloor"
        >
          <div class="triangle"></div>
        </div>
        <div class="floor-name"></div>
        <div class="floor-name"></div>
        <div
          v-for="floor in floors"
          @click="selectFloor(floor.floorName)"
          :key="floor.floorName"
          :class="{ 'floor-name-active': selectedFloor === floor.floorName }"
          class="floor-name"
        >
          {{ floor.floorName }}
        </div>
        <div class="floor-name"></div>
        <div class="floor-name"></div>
        <div
          class="triangle-container-2"
          @click="nextFloor"
        >
          <div class="triangle"></div>
        </div>
      </div>
      <div class="room-container">
        <div class="room-select-container">
          <div
            class="arrow left-arrow"
            :class="{ 'arrow-disabled': !hasPrevRoom }"
            @click="hasPrevRoom && prevRoom()"
          >
            ◀
          </div>
          <div class="room-name-container">
            <div
              v-for="room in visibleRooms"
              @click="selectRoom(room.roomName)"
              :key="room.roomName"
              :class="{
                'room-name-active': selectedRoomName === room.roomName,
              }"
              class="room-name"
            >
              {{ room.roomName }}
            </div>
          </div>
          <div
            class="arrow right-arrow"
            :class="{ 'arrow-disabled': !hasNextRoom }"
            @click="hasNextRoom && nextRoom()"
          >
            ▶
          </div>
        </div>
        <div class="rents-container">
          <div
            v-for="item in rentItems"
            :key="item.id"
            class="rent-item"
          >
            <div class="rent-item-img">
              <img
                :src="item.parkEnterprise.imgUrl"
                style="width: 20px; height: 20px"
                alt=""
              />
            </div>
            <a-tooltip placement="right">
              <template #title>
                <div class="rent-item-info-tooltip">
                  <div>租赁开始时间：{{ dayjs(item.rentStartAt).format("YYYY-MM-DD") }}</div>
                  <div>租赁结束时间：{{ dayjs(item.rentEndAt).format("YYYY-MM-DD") }}</div>
                </div>
              </template>
              <div class="rent-item-info">
                <div class="rent-item-info-name">
                  {{ item.parkEnterprise.name }}
                </div>
                <div class="rent-item-info-pic-btn-container">
                  <div class="rent-item-info-pic-btn" @click.stop="showImage(item.imgUrl)">详情</div>
                </div>
              </div>
            </a-tooltip>
          </div>
        </div>
      </div>
    </div>
    <a-image
      :width="0"
      :height="0"
      :preview="{
        visible: previewVisible,
        onVisibleChange: handlePreviewVisible,
      }"
      :src="currentImageUrl"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from "vue";
  import dayjs from "dayjs";
  import { getParkEnterpriseRentInfo } from "@/apis/getParkEnterpriseRentInfo";
  import { Tooltip as ATooltip, Image as AImage } from "ant-design-vue";

  const props = defineProps<{
    buildingName: string;
  }>();
  const buildingInfo = ref<any>({});
  const selectedRoomName = ref("1000");
  const selectedFloor = ref("1F");
  const floors = ref<any[]>([]);
  const floorRooms = ref<any[]>([]);
  const currentRoomPage = ref(0);
  const roomsPerPage = 3;
  const rentItems = ref<any[]>([]);
  const visibleRooms = computed(() => {
    const startIndex = currentRoomPage.value * roomsPerPage;
    return floorRooms.value.slice(startIndex, startIndex + roomsPerPage);
  });

  const hasNextRoom = computed(() => {
    const currentRoomIndex = visibleRooms.value.findIndex(
      (room) => room.roomName === selectedRoomName.value
    );
    return (
      currentRoomIndex < visibleRooms.value.length - 1 ||
      (currentRoomPage.value + 1) * roomsPerPage < floorRooms.value.length
    );
  });

  const hasPrevRoom = computed(() => {
    const currentRoomIndex = visibleRooms.value.findIndex(
      (room) => room.roomName === selectedRoomName.value
    );
    return currentRoomIndex > 0 || currentRoomPage.value > 0;
  });

  const previewVisible = ref(false);
  const currentImageUrl = ref('');

  onMounted(async () => {
    const res = await getParkEnterpriseRentInfo(props.buildingName);
    buildingInfo.value = res.data;
    floors.value = buildingInfo.value.floors.sort((a: any, b: any) =>
      a.floorName.localeCompare(b.floorName)
    );
    if (floors.value.length > 0) {
      selectFloor(floors.value[0].floorName);
    }
    console.log(buildingInfo.value);
  });
  const selectFloor = (floorName: string) => {
    selectedFloor.value = floorName;
    floorRooms.value = buildingInfo.value.floors
      .find((floor: any) => floor.floorName === floorName)
      .rooms.sort((a: any, b: any) =>
        a.roomName.localeCompare(b.roomName, undefined, { numeric: true })
      );
    currentRoomPage.value = 0;
    if (floorRooms.value.length > 0) {
      const firstRoom = floorRooms.value[0];
      selectedRoomName.value = firstRoom.roomName;
      rentItems.value = firstRoom.rents || [];
    }
  };
  const nextFloor = () => {
    const currentFloorIndex = floors.value.findIndex(
      (floor) => floor.floorName === selectedFloor.value
    );
    if (currentFloorIndex < floors.value.length - 1) {
      const nextFloorName = floors.value[currentFloorIndex + 1].floorName;
      selectFloor(nextFloorName);
    }
  };
  const prevFloor = () => {
    const currentFloorIndex = floors.value.findIndex(
      (floor) => floor.floorName === selectedFloor.value
    );
    if (currentFloorIndex > 0) {
      const prevFloorName = floors.value[currentFloorIndex - 1].floorName;
      selectFloor(prevFloorName);
    }
  };
  const selectRoom = (roomName: string) => {
    selectedRoomName.value = roomName;
    const currentFloor = buildingInfo.value.floors.find(
      (floor: any) => floor.floorName === selectedFloor.value
    );
    const currentRoom = currentFloor.rooms.find(
      (room: any) => room.roomName === roomName
    );
    rentItems.value = currentRoom.rents || [];
  };
  const nextRoom = () => {
    const currentRoomIndex = visibleRooms.value.findIndex(
      (room) => room.roomName === selectedRoomName.value
    );

    if (currentRoomIndex < visibleRooms.value.length - 1) {
      const nextRoomName = visibleRooms.value[currentRoomIndex + 1].roomName;
      selectRoom(nextRoomName);
    } else if (
      (currentRoomPage.value + 1) * roomsPerPage <
      floorRooms.value.length
    ) {
      currentRoomPage.value++;
      const nextRoomName = visibleRooms.value[0].roomName;
      selectRoom(nextRoomName);
    }
  };
  const prevRoom = () => {
    const currentRoomIndex = visibleRooms.value.findIndex(
      (room) => room.roomName === selectedRoomName.value
    );

    if (currentRoomIndex > 0) {
      const prevRoomName = visibleRooms.value[currentRoomIndex - 1].roomName;
      selectRoom(prevRoomName);
    } else if (currentRoomPage.value > 0) {
      currentRoomPage.value--;
      const prevRoomName = visibleRooms.value[visibleRooms.value.length - 1].roomName;
      selectRoom(prevRoomName);
    }
  };
  const showImage = (imgUrl: string) => {
    currentImageUrl.value = imgUrl;
    previewVisible.value = true;
  };
  const handlePreviewVisible = (visible: boolean) => {
    previewVisible.value = visible;
  };
</script>

<style scoped>
  .park-enterprise-rent-info {
    position: absolute;
    z-index: 100;
    top: 100px;
    left: 100px;
    width: 150px;
    height: 200px;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }
  .building-name-container {
    font-size: 6px;
    font-weight: bold;
    color: #fff;
    display: flex;
    justify-content: space-between; /* 左右间距，中间留白 */
    align-items: center;
    height: 16px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid #127375;
  }
  .building-info-container {
    margin-top: 3px;
    border-radius: 5px;
    font-size: 6px;
    flex: 1;
    font-weight: bold;
    color: #fff;
    display: flex;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid #127375;
  }
  .floor-container {
    padding: 5px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    align-items: center;
    gap: 2px;
    position: relative;
    border: 1px solid #127375;
    border-top: none;
    border-left: none;
    border-bottom: none;
  }
  .floor-name {
    color: #fff;
    font-size: 4px;
    width: 12px;
    height: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .floor-name-active {
    color: #fff;
    background: rgba(18, 115, 117, 0.8);
    border-radius: 50%;
    width: 12px;
    height: 12px;
    justify-content: center;
    align-items: center;
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
  }

  .room-name-active {
    background: #127375;
    border-radius: 10px;
    color: #fff;
    font-size: 4px;
    min-width: 20px;
    display: flex;
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
    padding: 5px;
    margin-right: 5px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    flex: 1;
    flex-shrink: 0;
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari and Opera */
    }
  }

  .rent-item {
    width: 100%;
    min-height: 30px;
    max-height: 30px;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    border: 1px solid #127375;
    border-radius: 5px;
  }

  .rent-item-img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    margin-left: 5px;
  }

  .rent-item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: start;
    height: 30px;
  }

  .rent-item-info-name {
    margin-top: 5px;
    margin-left: 5px;
    font-size: 6px;
    font-weight: bold;
    color: #fff;
    max-width: 50px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .rent-item-info-pic-btn-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
    padding-top: 3px;
    padding-right: 5px;
  }

  .rent-item-info-pic-btn {
    font-size: 5px;
    font-weight: bold;
    color: #fff;
    background-color: #127375;
    padding: 1px 2px;
    cursor: pointer;
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
