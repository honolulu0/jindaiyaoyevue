<template>
  <div
    class="house-person-info"
    v-if="currentBuilding"
  >
    <div class="house-person-info-title">
      <span>{{ currentBuilding.buildingName }}</span>
      <div class="close">×</div>
    </div>
    <div class="stats">
      <div class="stat-item">住户 {{ currentBuilding.stats.room }}</div>
      <div class="stat-item">人口 {{ currentBuilding.stats.persons }}</div>
      <div class="stat-item">
        党员 {{ currentBuilding.stats.isPartyMember }}
      </div>
      <div class="stat-item">
        高龄老人 {{ currentBuilding.stats.isHighAge }}
      </div>
    </div>
    <div class="floor-selector">
      <div class="floors">
        <div
          class="floor-nav prev"
          @click="prevFloors"
          :class="{ disabled: !showPrevFloorButton }"
        >
          <span>↑</span>
        </div>
        <div
          v-for="floor in visibleFloors"
          :key="floor.floorName"
          :class="{ active: currentFloor === floor.floorName }"
          @click="changeFloor(floor.floorName)"
        >
          {{ floor.floorName }}
        </div>
        <div
          class="floor-nav next"
          @click="nextFloors"
          :class="{ disabled: !showNextFloorButton }"
        >
          <span>↓</span>
        </div>
      </div>
      <div class="room-numbers-container">
        <div class="room-numbers">
          <div
            class="room-nav prev"
            @click="prevRooms"
            :class="{ disabled: !showPrevButton }"
          >
            <span>←</span>
          </div>
          <div
            v-for="room in visibleRooms"
            :key="room.roomName"
            :class="{ active: currentRoom === room.roomName }"
            class="room"
            @click="changeRoom(room.roomName)"
          >
            {{ room.roomName }}
          </div>
          <div
            class="room-nav next"
            @click="nextRooms"
            :class="{ disabled: !showNextButton }"
          >
            <span>→</span>
          </div>
        </div>
        <div class="person-list">
          <div
            class="person-item"
            v-for="person in persons"
            :key="person.id"
          >
            <div class="avatar"></div>
            <div class="info">
              <span class="name">{{ person.name }}</span>
              <span class="gender">{{ person.sex }}</span>
              <span class="age">年龄{{ person.age }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from "vue";
  import { getHousePersonInfo } from "@/apis/getHousePersonInfo";
  import type {
    Building,
    HousePersonInfoNoRelation,
  } from "@/apis/getHousePersonInfo";

  const currentBuilding = ref<Building | null>(null);
  const currentFloor = ref<string>("");
  const currentRoom = ref<string>("");
  const persons = ref<
    (HousePersonInfoNoRelation & { housePicture: { imgUrl: string } | null })[]
  >([]);

  // 添加新的响应式变量
  const currentRoomIndex = ref(0);
  const roomsPerPage = 3;

  // 添加新的变量和计算属性
  const floorsPerPage = 5;

  // 添加props定义
  const props = defineProps<{
    buildingName: string;
  }>();

  // 计算可见房间
  const visibleRooms = computed(() => {
    const floor = currentBuilding.value?.floors.find(
      (f) => f.floorName === currentFloor.value
    );
    if (!floor) return [];

    // 找到当前选中房间的索引
    const currentIndex = floor.rooms.findIndex(
      (r) => r.roomName === currentRoom.value
    );

    // 计算应该显示的起始索引，保持当前选中房间在中间
    const startIndex = Math.max(0, currentIndex - 1);
    const endIndex = Math.min(floor.rooms.length, startIndex + roomsPerPage);

    // 如果是最后几个房间，需要调整起始位置
    if (endIndex === floor.rooms.length) {
      return floor.rooms.slice(Math.max(0, endIndex - roomsPerPage));
    }

    return floor.rooms.slice(startIndex, endIndex);
  });

  // 计算是否显示导航按钮
  const showPrevButton = computed(() => {
    const floor = currentBuilding.value?.floors.find(
      (f) => f.floorName === currentFloor.value
    );
    if (!floor) return false;
    const currentIndex = floor.rooms.findIndex(
      (r) => r.roomName === currentRoom.value
    );
    return currentIndex > 0;
  });

  const showNextButton = computed(() => {
    const floor = currentBuilding.value?.floors.find(
      (f) => f.floorName === currentFloor.value
    );
    if (!floor) return false;
    const currentIndex = floor.rooms.findIndex(
      (r) => r.roomName === currentRoom.value
    );
    return currentIndex < floor.rooms.length - 1;
  });

  // 计算可见楼层
  const visibleFloors = computed(() => {
    if (!currentBuilding.value) return [];

    const floors = currentBuilding.value.floors;
    const currentIndex = floors.findIndex(
      (f) => f.floorName === currentFloor.value
    );

    // 计算应该显示的起始索引，保持当前选中楼层在中间
    const startIndex = Math.max(
      0,
      currentIndex - Math.floor(floorsPerPage / 2)
    );
    const endIndex = Math.min(floors.length, startIndex + floorsPerPage);

    // 如果是最后几层，需要调整起始位置
    if (endIndex === floors.length) {
      return floors.slice(Math.max(0, endIndex - floorsPerPage));
    }

    return floors.slice(startIndex, endIndex);
  });

  // 计算是否显示楼层导航按钮
  const showPrevFloorButton = computed(() => {
    if (!currentBuilding.value) return false;
    const currentIndex = currentBuilding.value.floors.findIndex(
      (f) => f.floorName === currentFloor.value
    );
    return currentIndex > 0;
  });

  const showNextFloorButton = computed(() => {
    if (!currentBuilding.value) return false;
    const currentIndex = currentBuilding.value.floors.findIndex(
      (f) => f.floorName === currentFloor.value
    );
    return currentIndex < currentBuilding.value.floors.length - 1;
  });

  // 修改导航方法
  const prevRooms = () => {
    const floor = currentBuilding.value?.floors.find(
      (f) => f.floorName === currentFloor.value
    );
    if (!floor) return;

    const currentIndex = floor.rooms.findIndex(
      (r) => r.roomName === currentRoom.value
    );
    if (currentIndex > 0) {
      const prevRoom = floor.rooms[currentIndex - 1];
      changeRoom(prevRoom.roomName);
    }
  };

  const nextRooms = () => {
    const floor = currentBuilding.value?.floors.find(
      (f) => f.floorName === currentFloor.value
    );
    if (!floor) return;

    const currentIndex = floor.rooms.findIndex(
      (r) => r.roomName === currentRoom.value
    );
    if (currentIndex < floor.rooms.length - 1) {
      const nextRoom = floor.rooms[currentIndex + 1];
      changeRoom(nextRoom.roomName);
    }
  };

  // 添加楼层导航方法
  const prevFloors = () => {
    if (!currentBuilding.value) return;
    const currentIndex = currentBuilding.value.floors.findIndex(
      (f) => f.floorName === currentFloor.value
    );
    if (currentIndex > 0) {
      const prevFloor = currentBuilding.value.floors[currentIndex - 1];
      changeFloor(prevFloor.floorName);
    }
  };

  const nextFloors = () => {
    if (!currentBuilding.value) return;
    const currentIndex = currentBuilding.value.floors.findIndex(
      (f) => f.floorName === currentFloor.value
    );
    if (currentIndex < currentBuilding.value.floors.length - 1) {
      const nextFloor = currentBuilding.value.floors[currentIndex + 1];
      changeFloor(nextFloor.floorName);
    }
  };

  onMounted(async () => {
    try {
      // 使用props中的buildingId
      const response = await getHousePersonInfo(props.buildingName);

      currentBuilding.value = response.data;

      // 如果找到楼栋，设置默认显示第一层第一个房间
      if (currentBuilding.value && currentBuilding.value.floors.length > 0) {
        const firstFloor = currentBuilding.value.floors[0];
        currentFloor.value = firstFloor.floorName;

        if (firstFloor.rooms.length > 0) {
          currentRoom.value = firstFloor.rooms[0].roomName;
          persons.value = firstFloor.rooms[0].persons;
        }
      }
    } catch (error) {
      console.error("获取房屋人员信息失败:", error);
    }
  });

  // 切换楼层
  const changeFloor = (floorName: string) => {
    currentFloor.value = floorName;
    currentRoomIndex.value = 0; // 重置房间索引
    const floor = currentBuilding.value?.floors.find(
      (f) => f.floorName === floorName
    );
    if (floor && floor.rooms.length > 0) {
      currentRoom.value = floor.rooms[0].roomName;
      persons.value = floor.rooms[0].persons;
    }
  };

  // 切换房间
  const changeRoom = (roomName: string) => {
    currentRoom.value = roomName;
    const floor = currentBuilding.value?.floors.find(
      (f) => f.floorName === currentFloor.value
    );
    const room = floor?.rooms.find((r) => r.roomName === roomName);
    if (room) {
      persons.value = room.persons;
    }
  };
</script>

<style scoped>
  .house-person-info {
    position: absolute;
    z-index: 1000;
    top: 50px;
    left: 50px;
    width: 300px;
    background-color: #333;
    color: white;
    border-radius: 8px;
    overflow: hidden;
    user-select: none;
  }

  .house-person-info-title {
    padding: 15px;
    font-size: 18px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .close {
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
    font-size: 20px;
  }

  .stats {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .floor-selector {
    display: flex;
    padding: 0;
  }

  .floors {
    width: max-content;
    background: rgba(0, 0, 0, 0.2);
    /* padding: 10px 0; */
    position: relative; /* 添加相对定位 */
  }

  .floors div.active {
    color: #3399cc; /* 使用与房间号相同的高亮颜色 */
    background: rgba(255, 255, 255, 0.1);
  }

  .floors div {
    width: 50px;
    height: 50px;
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .floor-nav {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    cursor: pointer;
    transition: all 0.3s;
  }

  .floor-nav.disabled {
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;
  }

  .floor-nav:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .room-numbers-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }

  .room-numbers {
    position: relative;
    padding: 10px 40px; /* 增加左右内边距为导航按钮留出空间 */
    height: 50px;
    display: flex;
    justify-content: center; /* 居中显示房间号 */
    align-items: center;
    overflow: hidden;
  }

  .room-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .room-nav.disabled {
    opacity: 0.3;
    cursor: not-allowed;
    pointer-events: none;
  }

  .room-nav.prev {
    left: 5px;
  }

  .room-nav.next {
    right: 5px;
  }

  .room {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    margin-right: 10px;
    padding: 5px 10px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .room.active {
    color: #3399cc;
  }

  .person-list {
    padding: 10px;
    max-height: 200px;
    overflow-y: auto;
  }

  .person-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    margin-bottom: 8px;
  }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #3399cc;
  }

  .info {
    display: flex;
    gap: 15px;
    align-items: center;
    font-size: 14px;
  }

  .stat-item {
    font-size: 14px;
  }
</style>
