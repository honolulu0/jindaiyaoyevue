<template>
  <div class="policy_list">
    <div class="policy_list_content">
      <div class="tab_container">
        <div
          v-for="item in tabList"
          :key="item.key"
          :class="activeTab === item.key ? 'tab_item_active' : 'tab_item'"
          @click="handleTabClick(item.key)"
          style="cursor: pointer"
          :style="{ left: `${(item.key - 1) * 64 + 96}px` }"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="policy_list_content_list">
        <div
          class="policy_list_content_list_item"
          v-for="(item, index) in policyList"
          :key="index"
        >
          <div class="policy_list_content_list_item_title">
            {{ item.title }}
          </div>
          <div class="policy_list_content_list_item_content">
            <div class="policy_list_content_list_item_sender">
              发文机关：{{ item.issuing_authority }}
            </div>
            <div class="policy_list_content_list_item_docNum">
              发文字号：{{ item.document_number }}
            </div>
            <div class="policy_list_content_list_item_time">
              发文时间：{{ item.publish_date }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { getPolicy, type PolicyData } from "@/apis/getPolicy";

  const tabList = ref([
    { label: "省级政策", key: 1 },
    { label: "市级政策", key: 2 },
    { label: "其他政策", key: 3 },
  ]);

  const policyList = ref<PolicyData[]>([]);
  const activeTab = ref(1);

  const loadPolicyData = async () => {
    try {
      const res = await getPolicy();
      switch (activeTab.value) {
        case 1:
          policyList.value = res.province.data;
          break;
        case 2:
          policyList.value = res.city.data;
          break;
        case 3:
          policyList.value = res.other.data;
          break;
      }
    } catch (error) {
      console.error('获取政策列表失败:', error);
    }
  };

  const handleTabClick = async (key: number) => {
    activeTab.value = key;
    await loadPolicyData();
  };

  onMounted(() => {
    loadPolicyData();
  });
</script>

<style scoped>
  .policy_list {
    position: absolute;
    left: 317px;
    top: 159px;
    width: 449px;
    height: 359px;
    background-image: url("@/assets/parkPolicy/accident_tiltle_bg2备份.png");
    background-size: contain;
    background-repeat: no-repeat;
  }
  .policy_list_content {
    position: absolute;
    left: 27px;
    top: 27px;
    width: 395px;
    height: 298px;
    display: flex;
    flex-direction: column;
  }
  .tab_container {
    width: 100%;
    height: 16px;
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

  .policy_list_content_list {
    position: absolute;
    left: 0;
    top: 40px;
    width: 100%;
    height: 248px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 18px;
    scrollbar-width: none;  /* Firefox */
    -ms-overflow-style: none;  /* IE and Edge */
  }

  /* 为 Webkit 浏览器（Chrome、Safari等）添加滚动条隐藏样式 */
  .policy_list_content_list::-webkit-scrollbar {
    display: none;
  }

  .policy_list_content_list_item {
    width: 100%;
    height: 35px;
    border-bottom: 1px solid;
    border-image: linear-gradient(
        to right,
        rgba(132, 248, 251, 0.1) 0%,
        rgba(132, 248, 251, 0.5) 50%,
        rgba(132, 248, 251, 0.1) 100%
      )
      1;
  }

  .policy_list_content_list_item_title {
    height: 9px;
    font-family: SourceHanSansSC-Normal;
    font-weight: 500;
    font-size: 6px;
    color: #84f8fb;
    line-height: 9px;
    letter-spacing: 0px;
    text-align: left;
    font-style: normal;
    opacity: 0.8;
  }

  .policy_list_content_list_item_content {
    flex: 1;
    height: 26px;
    display: flex;
    align-items: end;
    padding-bottom: 7px;
    justify-content: space-between;
    font-family: SourceHanSansSC-Normal;
    font-weight: 500;
    font-size: 6px;
    color: #eaf6ff;
    line-height: 9px;
    letter-spacing: 0px;
    text-align: left;
    font-style: normal;
    opacity: 0.8;
  }
</style>
