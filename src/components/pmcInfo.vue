<template>
  <div class="park_profile">
    <div class="title_bg"></div>
    <div class="title">物业公司介绍</div>
    <div class="park_img"></div>
    <div class="text_container">
      <div
        class="absolute h-8"
        v-for="item in textList"
        :key="item.key"
        :style="item.position"
      >
        <span class="text_label">{{ item.label }}</span>
        <span
          class="text_content"
          :style="{ width: item.width ?? 'max-content' }"
          >{{ item.content }}</span
        >
      </div>
      <p class="text_area">
        这里是文案描述，这里是文案描述，这里是文这里是文案描述，这里是文案描述，这里是文
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  const textList = [
    {
      key: 1,
      label: "物业公司：",
      content: "郑州金岱圆方物业管理有限公司",
      position: { top: 0, left: 0 },
    },
    {
      key: 2,
      label: "成立年份：",
      content: "2018年",
      position: { top: "13px", left: "0px" },
    },
    {
      key: 3,
      label: "员工人数：",
      content: "220人",
      position: { top: "13px", left: "105px" },
    },
    {
      key: 4,
      label: "管理费用：",
      content: "2,666元/m² ~ 3,220元/m",
      position: { top: "27px", left: "0px" },
      width: "105px",
    },
  ];
</script>

<style scoped>
  .title_bg {
    background-image: url("@/assets/title_bg.png");
    background-size: cover;
    position: absolute;
    left: 0;
    top: 6px;
    width: 206px;
    height: 14px;
  }

  .park_profile {
    position: absolute;
    top: 64px;
    left: 20px;
    width: 210px;
    height: 217px;
  }

  .title {
    position: absolute;
    top: 0px;
    left: 22px;
    width: max-content;
    height: 13px;
    font-family: YouSheBiaoTiHei;
    font-size: 10px;
    color: #a5d8fc;
    line-height: 13px;
    text-align: left;
    font-style: normal;
  }

  .park_img {
    background-image: url("@/assets/park_img.png");
    background-size: cover;
    width: 205px;
    height: 88px;
    position: absolute;
    left: 0;
    top: 29px;
  }

  .text_container {
    width: 210px;
    height: 93px;
    position: absolute;
    left: 0;
    top: 113px;
  }

  .text_label {
    width: 13px;
    height: 13px;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 6px;
    color: #e4f3ff;
    line-height: 13px;
    text-align: left;
    font-style: normal;
  }

  .text_content {
    width: max-content;
    height: 13px;
    font-family: YouSheBiaoTiHei;
    font-size: 8px;
    color: #d9f1fd;
    line-height: 13px;
    text-align: left;
    font-style: normal;
  }

  .text_area {
    position: absolute;
    top: 50px;
    left: 0;
    width: 205px;
    height: 26px;
    font-family: SourceHanSansSC-Normal;
    font-weight: 600;
    font-size: 6px;
    color: #e4f3ff;
    line-height: 13px;
    text-align: left;
    font-style: normal;
    text-indent: 12px;
  }


</style>
