<template>
  <div class="w-full h-full absolute top-0 left-0 z-0">
    <PMCInfo />
    <WaiterInfo />
    <PMCEmployeesInfo />
    <RepairEventList @rowClick="handleRowClick" />
    <PMCServiceInfo />
  </div>
  <Transition name="fade">
    <div
      class="model_container"
      v-if="showModel"
    >
      <Transition name="slide-fade">
        <div class="model" v-if="showModel">
          <div class="model_title">报修事件详情</div>
          <div class="close_btn" @click="closeModel">关闭</div>
          <div class="model_content">
            <div class="model_content_item">
              <div class="model_content_item_title">标题</div>
              <div class="model_content_item_value">
                <p>{{ modelData.title ? modelData.title : "无" }}</p>
              </div>
            </div>
            <div class="model_content_item">
              <div class="model_content_item_title">类型</div>
              <div class="model_content_item_value">
                <p>{{ modelData.type ? modelData.type : "无" }}</p>
              </div>
            </div>
            <div class="model_content_item">
              <div class="model_content_item_title">事件日期</div>
              <div class="model_content_item_value">
                <p>{{ modelData.time ? modelData.time : "无" }}</p>
              </div>
            </div>
            <div class="model_content_item">
              <div class="model_content_item_title">所在园区</div>
              <div class="model_content_item_value">
                <p>{{ modelData.parkName ? modelData.parkName : "无" }}</p>
              </div>
            </div>
            <div class="model_content_item">
              <div class="model_content_item_title">楼栋房间</div>
              <div class="model_content_item_value">
                <p>{{ modelData.address ? modelData.address : "无" }}</p>
              </div>
            </div>
            <div class="model_content_item">
              <div class="model_content_item_title">所属企业</div>
              <div class="model_content_item_value">
                <p>{{ modelData.enterpriseName ? modelData.enterpriseName : "无" }}</p>
              </div>
            </div>
            <div class="model_content_item">
              <div class="model_content_item_title">事件描述</div>
              <div class="model_content_item_value">
                <p>{{ modelData.eventDescription ? modelData.eventDescription : "无" }}</p>
              </div>
            </div>
            <div class="model_content_item">
              <div class="model_content_item_title">联系姓名</div>
              <div class="model_content_item_value">
                <p>{{ modelData.contactName ? modelData.contactName : "无" }}</p>
              </div>
            </div>
            <div class="model_content_item">
              <div class="model_content_item_title">联系方式</div>
              <div class="model_content_item_value">
                <p>{{ modelData.contactPhone ? modelData.contactPhone : "无" }}</p>
              </div>
            </div>
            <div class="model_content_item">
              <div class="model_content_item_title">其他备注</div>
              <div class="model_content_item_value">
                <p>{{ modelData.otherDescription ? modelData.otherDescription : "无" }}</p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import PMCInfo from "@/components/pmcInfo.vue";
  import WaiterInfo from "@/components/waiterInfo.vue";
  import PMCEmployeesInfo from "@/components/pmcEmployeesInfo.vue";
  import RepairEventList from "@/components/repairEventList.vue";
  import PMCServiceInfo from "@/components/pmcServiceInfo.vue";
  import { ref } from "vue";

  const showModel = ref(false);

  const handleRowClick = (rowData: any) => {
    showModel.value = true;
    modelData.value = {
      title: rowData.title || '无',
      type: rowData.category_name || '无',
      time: rowData.create_datetime || '无',
      parkName: rowData.park_name || '无',
      address: rowData.building_room || '无',
      enterpriseName: rowData.company_name || '无',
      eventDescription: rowData.description || '无',
      contactName: rowData.contact_name || '无',
      contactPhone: rowData.contact_phone || '无',
      otherDescription: rowData.feedback || '无'
    };
  };

  const modelData = ref({});

  const closeModel = () => {
    showModel.value = false;
  };
</script>

<style scoped>
  .model_container {
    width: 1080px;
    height: 579px;
    position: absolute;
    z-index: 100;
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
    width: 474px;
    height: 175px;
    border: 1px solid #2b9daa;
    border-radius: 10px;
    overflow: hidden;
  }

  .model_content_item {
    display: grid;
    grid-template-columns: 1fr 5fr;
    align-items: center;
    height: 17.3px;
    font-family: SourceHanSansCS-Normal;
    font-weight: 500;
    font-size: 9px;
    color: #71f3ff;
    line-height: 18px;
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
    padding-left: 20px;
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
</style>
