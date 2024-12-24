<template>
  <div class="car_enter_record">
    <title-component title-text="车辆进出记录" />
    <div
      class="car_enter_record_list"
      v-for="item in list"
    >
      <div class="car-image">
        <Image
          :src="item.img"
          style="width: 100%; height: 100%"
        />
      </div>
      <div class="car_enter_record_info">
        <div class="car_enter_record_info_item">{{ item.carNumber }}</div>
        <div class="car_enter_record_info_item">{{ item.type }}场</div>
        <div class="car_enter_record_info_item">{{ item.time }}</div>
        <div class="car_enter_record_info_item">
          <div class="position_icon" style="margin-right: 3px; margin-top: 3px"></div>
          {{ item.position }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from "vue";
  import titleComponent from "./titleComponent.vue";
  import { Image } from 'ant-design-vue'
  import { getCarInOutRecords, type CarInOutRecordVO } from '@/apis/parking'

  const list = ref<CarInOutRecordVO[]>([])
  let timer: ReturnType<typeof setInterval> | null = null

  const fetchCarRecords = async () => {
    try {
      const records = await getCarInOutRecords()
      list.value = records.slice(0, 3)
    } catch (error) {
      console.error('获取车辆记录失败:', error)
    }
  }

  onMounted(() => {
    fetchCarRecords()
    timer = setInterval(fetchCarRecords, 10000)
  })

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  })
</script>

<style scoped>
  .car_enter_record {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 207px;
    height: 179px;
  }

  .car_enter_record_list {
    width: 100%;
    height: 43px;
    margin-top: 7px;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 3px;
  }

  .car_enter_record_info {
    height: 43px;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-content: space-around;
    align-items: center;
    background-image: url("@/assets/parkFacilities/车辆进出文案背景.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }

  .car_enter_record_info_item {
    width: max-content;
    height: 13px;
    font-family: "SourceHanSansSC-Normal";
    font-weight: 600;
    font-size: 6px;
    color: #ffffff;
    line-height: 13px;
    text-align: left;
    font-style: normal;
  }

  .position_icon {
    width: 10px;
    height: 10px;
    background-image: url("@/assets/parkFacilities/icon_address.png");
    background-size: 100% 100%;
  }

  .car_enter_record_info_item:nth-child(1) {
    justify-self: start;
    margin-left: 10px;
  }

  .car_enter_record_info_item:nth-child(2) {
    justify-self: end;
    margin-right: 10px;
  }

  .car_enter_record_info_item:nth-child(3) {
    justify-self: start;
    margin-left: 10px;
  }

  .car_enter_record_info_item:nth-child(4) {
    justify-self: end;
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  .car-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-image: url("@/assets/car.jpg");
    background-size: 100% 100%;
    overflow: hidden;
    margin-top: 2px;
  }
</style>
