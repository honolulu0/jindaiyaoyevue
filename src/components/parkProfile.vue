<template>
  <div class="park_profile">
    <div class="title_bg"></div>
    <div class="title">园区概况</div>
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
      label: "园区名称：",
      content: "建中·金岱生物医药产业园",
      position: { top: 0, left: 0 },
    },
    {
      key: 2,
      label: "建成年份：",
      content: "2024年",
      position: { top: "13px", left: "0px" },
    },
    {
      key: 3,
      label: "园区位置：",
      content: "河南省郑州市金水区",
      position: { top: "13px", left: "105px" },
    },
    {
      key: 4,
      label: "总建筑面积：",
      content: "6.97万平方米",
      position: { top: "27px", left: "0px" },
    },
    {
      key: 5,
      label: "楼栋数量：",
      content: "20栋",
      position: { top: "27px", left: "105px" },
    },
    {
      key: 6,
      label: "租金区间：",
      content: "12元/m²/天 ~ 20元/m²/天",
      position: { top: "40px", left: "0px" },
      width: "105px",
    },
    {
      key: 7,
      label: "售价区间：",
      content: "36,666元/m² ~ 63,220元/m²",
      position: { top: "54px", left: "0px" },
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
    width: 40px;
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
    top: 77px;
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
