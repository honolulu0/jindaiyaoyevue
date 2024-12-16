<template>
  <div class="policy_list">
    <div class="policy_list_content">
      <div class="tab_container">
        <div
          v-for="item in tabList"
          :key="item.key"
          :class="activeTab === item.key ? 'tab_item_active' : 'tab_item'"
          @click="handleTabClick(item.key)"
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
              发文机关：{{ item.sender }}
            </div>
            <div class="policy_list_content_list_item_docNum">
              发文字号：{{ item.docNum }}
            </div>
            <div class="policy_list_content_list_item_time">
              发文时间：{{ item.time }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const tabList = ref([
    { label: "省级政策", key: 1 },
    { label: "市级政策", key: 2 },
    { label: "其他政策", key: 3 },
  ]);

  const policyList = ref([
    {
      title: "河南省人民政府办公厅关于印发促进全省低空经济高质量发展实施方案(2024-2027年)的通知",
      sender: "政策发布者",
      time: "2024年1月1日",
      docNum: "豫政办〔2024)33号",
    },
    {
      title: "河南省人民政府办公厅关于印发促进全省低空经济高质量发展实施方案(2024-2027年)的通知",
      sender: "政策发布者",
      time: "2024年1月1日",
      docNum: "豫政办〔2024)33号",
    },
    {
      title: "河南省人民政府办公厅关于印发促进全省低空经济高质量发展实施方案(2024-2027年)的通知",
      sender: "政策发布者",
      time: "2024年1月1日",
      docNum: "豫政办〔2024)33号",
    },
    {
      title: "河南省人民政府办公厅关于印发促进全省低空经济高质量发展实施方案(2024-2027年)的通知",
      sender: "政策发布者",
      time: "2024年1月1日",
      docNum: "豫政办〔2024)33号",
    },
    {
      title: "河南省人民政府办公厅关于印发促进全省低空经济高质量发展实施方案(2024-2027年)的通知", 
      sender: "政策发布者",
      time: "2024年1月1日",
      docNum: "豫政办〔2024)33号",
    },
  ]);

  const activeTab = ref(1);

  const handleTabClick = (key: number) => {
    activeTab.value = key;
  };
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
