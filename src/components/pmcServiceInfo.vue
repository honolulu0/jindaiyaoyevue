<template>
  <div class="pmc-service-info">
    <title-component title-text="服务信息" />
    <div class="service-info-list">
      <div
        class="service-info-item"
        v-for="item in serviceInfoList"
        :key="item.index"
        :style="{ backgroundImage: item.img }"
      >
        <div class="text-item">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import titleComponent from "./titleComponent.vue";
  import { getServices, type ServiceType } from '@/apis/getServices'

  const serviceInfoList = ref<any[]>([])

  const getServiceData = async () => {
    try {
      const res = await getServices()
      serviceInfoList.value = res.map(item => ({
        img: `url("${encodeURI(item.cover_url)}")`,
        name: item.title
      }))
    } catch (error) {
      console.error('获取服务列表失败:', error)
    }
  }

  onMounted(() => {
    getServiceData()
  })
</script>

<style scoped>
  .pmc-service-info {
    position: absolute;
    bottom: 24px;
    right: 20px;
    width: 206px;
    height: 262px;
  }

  .service-info-list {
    width: 206px;
    margin-top: 7px;
    height: calc(262px - 30px - 7px);
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 0 6px;
    margin-left: 10px;
  }

  .service-info-item {
    width: 90px;
    height: 67px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .text-item {
    font-size: 12px;
    color: #ffffff;
    height: 13px;
    font-family: "SourceHanSansSC-Normal";
    font-weight: 600;
    font-size: 6px;
    color: #ffffff;
    line-height: 13px;
    text-align: left;
    font-style: normal;
  }
</style>
