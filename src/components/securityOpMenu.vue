<template>
  <div class="security_op_menu">
    <TitleComponent titleText="安防操作台" />
    <div class="security_op_menu_selectGroup">
      <div
        :class="`select_item ${
          selectValue === '电子围栏' ? 'item_selected' : 'item_unselected'
        }`"
        @click="handleSelect('电子围栏')"
      >
        电子围栏
      </div>
      <div
        :class="`select_item ${
          selectValue === '入侵报警' ? 'item_selected' : 'item_unselected'
        }`"
        @click="handleSelect('入侵报警')"
      >
        入侵报警
      </div>
    </div>

    <div class="security_op_menu_buttonGroup">
      <div
        class="item_button"
        @click="handleButton('布防')"
      >
        一键<br />布防
      </div>
      <div
        class="item_button"
        @click="handleButton('撤防')"
      >
        一键<br />撤防
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import TitleComponent from "./titleComponent.vue";

  const selectValue = ref<"电子围栏" | "入侵报警">("电子围栏");
  const handleSelect = (value: "电子围栏" | "入侵报警") => {
    selectValue.value = value;
  };
  // 定义 emit
  const emit = defineEmits<{
    (e: "onButtonClick", value: "布防" | "撤防", selectValue: "电子围栏" | "入侵报警"): void;
  }>();

  // 布防、撤防
  const handleButton = (value: "布防" | "撤防") => {
    emit("onButtonClick", value, selectValue.value);
  };
</script>

<style scoped>
  .security_op_menu {
    position: absolute;
    top: 84px;
    right: 20px;
    width: 206px;
    height: 130px;
  }

  .security_op_menu_selectGroup {
    position: absolute;
    top: 28px;
    left: 0;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    padding: 0 10px;
  }

  .security_op_menu_buttonGroup {
    width: 100%;
    position: absolute;
    top: 65px;
    left: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 19px;
  }

  .item_selected {
    color: #fff;
    background-image: url("@/assets/parkFacilities/电子围栏选中状态.png");
  }

  .item_unselected {
    color: #999;
    background-image: url("@/assets/parkFacilities/入侵报警未选中.png");
  }

  .select_item {
    width: 92px;
    max-width: 92px;
    height: 25px;
    max-height: 25px;
    font-family: SourceHanSansSC-Normal;
    background-size: contain;
    background-repeat: no-repeat;
    font-weight: 500;
    font-size: 10px;
    color: #e4f3ff;
    line-height: 13px;
    text-align: right;
    font-style: normal;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .item_button {
    width: 65px;
    height: 65px;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 9px;
    color: #77d5cd;
    line-height: 12px;
    text-align: left;
    font-style: normal;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url("@/assets/parkFacilities/一键布防-未开启.png");
  }

  .item_button:hover {
    background-image: url("@/assets/parkFacilities/一键撤防-开启.png");
  }
</style>
