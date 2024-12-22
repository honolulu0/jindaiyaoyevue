<template>
  <div class="w-full h-full absolute top-0 left-0 z-0">
    <div
      class="w-full h-full absolute top-0 left-0 z-0 "
    ></div>
    <SecondaryTabs :activeIndex="2" />
    <div
      class="content_container"
    >
      <div class="tab_container1">
        <div
          v-for="item in tabList"
          :key="item.key"
          :class="activeTab === item.key ? 'tab_item_active' : 'tab_item'"
          @click="handleTabClick(item.key)"
          :style="{ left: `${(item.key - 1) * 64 + 178}px` }"
        >
          {{ item.label }}
        </div>
      </div>
      <div
        class="img"
        :style="{ backgroundImage: `${customEncodeURI(currentPageData.cover_url || currentPageData.cover)}` }"
      ></div>
      <div class="title">{{ currentPageData.title }}</div>
      <div class="content" v-html="currentPageData.content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import SecondaryTabs from "@/components/secondaryTabs.vue";
  import { ref, onMounted } from "vue";
  import { getServices, type ServiceType } from "@/apis/getServices";

  const content = ref<ServiceType[]>([]);
  const servicesByTitle = ref<Record<string, ServiceType[]>>({});

  const tabList = ref<{ label: string; key: number }[]>([]);
  const activeTab = ref(1);

  const loadServices = async () => {
    try {
      const data = await getServices();
      content.value = data;
      
      const groupedData: Record<string, ServiceType[]> = {};
      data.forEach((item: ServiceType) => {
        if (!groupedData[item.title]) {
          groupedData[item.title] = [];
        }
        groupedData[item.title].push(item);
      });
      servicesByTitle.value = groupedData;

      tabList.value = Object.keys(groupedData).map((title, index) => ({
        label: title,
        key: index + 1
      }));

      if (tabList.value.length > 0) {
        handleTabClick(1);
      }
    } catch (error) {
      console.error('加载服务数据失败:', error);
    }
  };

  function customEncodeURI(url: string) {
    return `url("${encodeURI(url)}")`;
  }

  const currentPageData = ref<ServiceType>({} as ServiceType);

  const handleTabClick = (key: number) => {
    activeTab.value = key;
    const title = tabList.value[key - 1]?.label;
    if (title && servicesByTitle.value[title]?.length > 0) {
      currentPageData.value = servicesByTitle.value[title][0];
    }
  };

  onMounted(async () => {
    await loadServices();
  });
</script>

<style scoped>
  .content_container {
    position: absolute;
    left: 165px;
    top: 159px;
    width: 749px;
    height: 359px;
    background-image: url("@/assets/accident_tiltle_bg2备份.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .tab_container1 {
    width: 100%;
    height: 16px;
    position: absolute;
    top: 27px;
  }

  .tab_item {
    position: absolute;
    top: 0;
    width: 75px;
    height: 16px;
    background-image: url("@/assets/parkPolicy/tab2.png");
    background-size: contain;
    background-repeat: no-repeat;
    font-family: SourceHanSansSC-Normal;
    font-weight: 500;
    font-size: 7px;
    color: #ffffff;
    line-height: 11px;
    text-align: left;
    font-style: normal;
    padding-left: 15px;
  }

  .tab_item_active {
    position: absolute;
    top: 0;
    width: 75px;
    height: 16px;
    background-image: url("@/assets/parkPolicy/tab1-选中.png");
    background-size: contain;
    background-repeat: no-repeat;
    font-family: SourceHanSansSC-Normal;
    font-weight: 500;
    padding-left: 15px;
    font-size: 7px;
    color: #84f8fb;
    line-height: 11px;
    text-align: left;
    font-style: normal;
  }

  .img {
    position: absolute;
    top: 72px;
    left: 191px;
    width: 368px;
    height: 179px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .title {
    position: absolute;
    top: 273px;
    width: 100%;
    height: 13px;
    font-family: YouSheBiaoTiHei;
    font-size: 11px;
    color: #e4f3ff;
    line-height: 13px;
    letter-spacing: 1px;
    text-align: center;
    font-style: normal;
  }

  .content {
    position: absolute;
    top: 295px;
    width: calc(100% - 374px);
    height: calc(100% - 295px);
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 7px;
    color: #e4f3ff;
    line-height: 13px;
    margin-left: 187px;
    margin-right: 187px;
    text-indent: 2em;
    overflow: hidden;
  }
</style>
