<template>
  <div class="park365">
    <div class="title_bg"></div>
    <div class="title">园区“365”优势</div>
    <div
      class="tab_text"
      :style="{
        ...tab.position,
        backgroundImage: tab.isClick ? activeTabImage : defaultTabImage,
      } as StyleValue"
      @click="tab.onClick"
      v-for="tab in tabs"
      :key="tab.name"
    >
      {{ tab.name }}
    </div>
    <div
      class="tab_1_three_advantage"
      v-if="tabs[0].isClick"
    >
      <div class="tab_1_three_advantage_cg"></div>
      <div class="tab_1_three_advantage_tag_bg_purple">空间优质</div>
      <div class="tab_1_three_advantage_tag_bg_blue">区位优越</div>
      <div class="tab_1_three_advantage_tag_bg_green">环境优美</div>
    </div>
    <div
      class="tab_1_three_advantage_text"
      v-if="tabs[0].isClick"
    >
      <div class="tab_1_three_advantage_text_item">
        <div class="tab_1_three_advantage_text_item_label">01.</div>
        <div class="tab_1_three_advantage_text_item_text">
          区位优越：城市门户，产城融合新高地
        </div>
      </div>
      <div class="tab_1_three_advantage_text_area">
        园区择址郑南核心，紧邻文治路、南三环、南四环、中州大道、机场高速等郑州市交通主干道，交通便捷，路网畅通。
      </div>
      <div class="tab_1_three_advantage_text_item">
        <div class="tab_1_three_advantage_text_item_label">02.</div>
        <div class="tab_1_three_advantage_text_item_text">
          空间优质：生产、生活、生态，三生融合
        </div>
      </div>
      <div class="tab_1_three_advantage_text_area">
        外部空间优质，整个区域以“微循环”畅通“大循环”
      </div>
      <div class="tab_1_three_advantage_text_item">
        <div class="tab_1_three_advantage_text_item_label">03.</div>
        <div class="tab_1_three_advantage_text_item_text">
          环境优美：全生态商务环境，勾勒企业美好愿景
        </div>
      </div>
      <div class="tab_1_three_advantage_text_area">
        外揽郑南核心片区城市生态资源，内造宜人的园区环境景观，以绿色办公理念打造活力永续的商务环境，满足新时代企业办公需求，激发员工更多创造力。
      </div>
    </div>
    <div
      class="tab_2_six_harmony"
      v-if="tabs[1].isClick"
    >
      <div class="tab_2_six_harmony_cg"></div>
      <div class="tab_2_six_harmony_tag_bg_purple">
        <span class="tab_2_six_harmony_tag_text">资金汇合</span>
      </div>
      <div class="tab_2_six_harmony_tag_bg_bluelight">
        <span class="tab_2_six_harmony_tag_text">政策应合</span>
      </div>
      <div class="tab_2_six_harmony_tag_bg_green">
        <span class="tab_2_six_harmony_tag_text">人才聚合</span>
      </div>
      <div class="tab_2_six_harmony_tag_bg_red">
        <span class="tab_2_six_harmony_tag_text">科研整合</span>
      </div>
      <div class="tab_2_six_harmony_tag_bg_blue">
        <span class="tab_2_six_harmony_tag_text">院校融合</span>
      </div>
      <div class="tab_2_six_harmony_tag_bg_yellow">
        <span class="tab_2_six_harmony_tag_text">产业聚合</span>
      </div>
    </div>
    <div
      class="tab_2_six_harmony_text"
      v-if="tabs[1].isClick"
    >
      <div class="tab_2_six_harmony_text_item">
        <div class="tab_2_six_harmony_text_item_label">01.</div>
        <div class="tab_2_six_harmony_text_item_text">
          政策应合：政府主导 产城融合高地
        </div>
      </div>
      <div class="tab_2_six_harmony_text_item">
        <div class="tab_2_six_harmony_text_item_label">02.</div>
        <div class="tab_2_six_harmony_text_item_text">
          产业聚合：产业升级 打造中小企业特色集群
        </div>
      </div>
      <div class="tab_2_six_harmony_text_item">
        <div class="tab_2_six_harmony_text_item_label">03.</div>
        <div class="tab_2_six_harmony_text_item_text">
          院校融合：院、产、学、城实现 1+1＋1
        </div>
      </div>
      <div class="tab_2_six_harmony_text_item">
        <div class="tab_2_six_harmony_text_item_label">04.</div>
        <div class="tab_2_six_harmony_text_item_text">
          科研整合：产学研成果转化 为新质生产力注入新动能
        </div>
      </div>
      <div class="tab_2_six_harmony_text_item">
        <div class="tab_2_six_harmony_text_item_label">05.</div>
        <div class="tab_2_six_harmony_text_item_text">
          人才聚合：深化人才引进 落实人才待遇
        </div>
      </div>
      <div class="tab_2_six_harmony_text_item">
        <div class="tab_2_six_harmony_text_item_label">06.</div>
        <div class="tab_2_six_harmony_text_item_text">
          资金汇合：引进金融“活水”灌溉实体经济
        </div>
      </div>
    </div>
    <div
      class="tab_3_five_grain"
      v-if="tabs[2].isClick"
    >
      <div class="tab_3_five_grain_cg"></div>
      <div class="tab_3_five_grain_tag_bg_blue">
        <span class="tab_3_five_grain_tag_text">智谷</span>
      </div>
      <div class="tab_3_five_grain_tag_bg_green">
        <span class="tab_3_five_grain_tag_text">绿谷</span>
      </div>
      <div class="tab_3_five_grain_tag_bg_purple">
        <span class="tab_3_five_grain_tag_text">创谷</span>
      </div>
      <div class="tab_3_five_grain_tag_bg_yellow">
        <span class="tab_3_five_grain_tag_text">乐谷</span>
      </div>
      <div class="tab_3_five_grain_tag_bg_red">
        <span class="tab_3_five_grain_tag_text">光谷</span>
      </div>
    </div>
    <div class="tab_3_five_grain_text" v-if="tabs[2].isClick">
      <div class="tab_3_five_grain_text_item">
        <div class="tab_3_five_grain_text_item_label">01.</div>
        <div class="tab_3_five_grain_text_item_text">
          绿谷：森态办公，郑州版绿色硅谷
        </div>
      </div>
      <div class="tab_3_five_grain_text_item">
        <div class="tab_3_five_grain_text_item_label">02.</div>
        <div class="tab_3_five_grain_text_item_text">
          光谷：独标设计，引阳光入园
        </div>
      </div>
      <div class="tab_3_five_grain_text_item">
        <div class="tab_3_five_grain_text_item_label">03.</div>
        <div class="tab_3_five_grain_text_item_text">
          智谷：云会所，未来办公新场景
        </div>
      </div>
      <div class="tab_3_five_grain_text_item">
        <div class="tab_3_five_grain_text_item_label">04.</div>
        <div class="tab_3_five_grain_text_item_text">
          创谷：科创互动空间，无边界产城生活场景
        </div>
      </div>
      <div class="tab_3_five_grain_text_item">
        <div class="tab_3_five_grain_text_item_label">05.</div>
        <div class="tab_3_five_grain_text_item_text">
          乐谷：为企业赋能，24H高活力园区
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive, StyleValue } from "vue";

  const baseUrl = import.meta.url.substring(
    0,
    import.meta.url.lastIndexOf("/")
  );

  const activeTabImage = computed(() => {
    return `url(${encodeURI(`${baseUrl}/../assets/tab1_selected.png`)})`;
  });

  const defaultTabImage = computed(() => {
    return `url(${encodeURI(`${baseUrl}/../assets/tab2_unselected.png`)})`;
  });

  const setClick = (index: number) => {
    tabs.forEach((tab) => {
      tab.isClick = false;
    });
    tabs[index].isClick = true;
  };

  const tabs = reactive([
    {
      name: "三优",
      isClick: true,
      onClick: () => {
        setClick(0);
      },
      position: {
        position: "absolute",
        top: "100px",
        right: "154px",
        zIndex: 1000,
      },
    },
    {
      name: "六合",
      isClick: false,
      onClick: () => {
        setClick(1);
      },
      position: {
        position: "absolute",
        top: "100px",
        right: "91px",
        zIndex: 1000,
      },
    },
    {
      name: "五谷",
      isClick: false,
      onClick: () => {
        setClick(2);
      },
      position: {
        position: "absolute",
        top: "100px",
        right: "27px",
        zIndex: 1000,
      },
    },
  ]);
</script>

<style scoped>
  .title_bg {
    background-image: url("@/assets/title_bg.png");
    background-size: cover;
    position: absolute;
    right: 26px;
    top: 80px;
    width: 206px;
    height: 14px;
    z-index: 1000;
  }

  .title {
    position: absolute;
    top: 73px;
    right: 127px;
    width: 90px;
    height: 13px;
    font-family: YouSheBiaoTiHei;
    font-size: 10px;
    color: #a5d8fc;
    line-height: 13px;
    text-align: left;
    font-style: normal;
    z-index: 1000;
  }

  .park365 {
    position: absolute;
    top: 0;
    right: 0;
    width: 377px;
    height: 579px;
    z-index: 1000;
  }

  .tab_text {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 13px;
    height: 9px;
    font-family: YouSheBiaoTiHei;
    font-size: 7px;
    color: #afb3b6;
    line-height: 9px;
    text-align: left;
    font-style: normal;
    width: 66px;
    height: 16px;
    background-size: cover;
  }

  .tab_1_three_advantage {
    position: absolute;
    z-index: 1000;
    top: 128px;
    right: 44px;
    width: 162px;
    height: 132px;
  }

  .tab_2_six_harmony {
    position: absolute;
    z-index: 1000;
    top: 128px;
    right: 44px;
    width: 162px;
    height: 132px;
  }

  .tab_3_five_grain {
    position: absolute;
    z-index: 1000;
    top: 128px;
    right: 44px;
    width: 162px;
    height: 132px;
  }

  .tab_1_three_advantage_cg {
    position: absolute;
    z-index: 1000;
    top: 30px;
    right: 21px;
    background-image: url("@/assets/tab1_three_advantage_cg.png");
    width: 118px;
    height: 103px;
    background-size: cover;
  }

  .tab_2_six_harmony_cg {
    position: absolute;
    z-index: 1000;
    top: 29px;
    left: 38px;
    background-image: url("@/assets/tab2_six_harmony_cg.png");
    width: 93px;
    height: 99px;
    background-size: contain;
  }

  .tab_3_five_grain_cg {
    position: absolute;
    z-index: 1000;
    top: 35px;
    left: 33px;
    background-image: url("@/assets/tab3_five_grain_cg.png");
    width: 109px;
    height: 89px;
    background-size: contain;
  }

  .tab_2_six_harmony_tag_text {
    width: 15px;
    height: 19px;
    font-family: YouSheBiaoTiHei;
    font-size: 8px;
    color: #ffffff;
    line-height: 10px;
    text-align: left;
    font-style: normal;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab_2_six_harmony_tag_bg_bluelight {
    position: absolute;
    z-index: 1000;
    top: 0px;
    left: 34px;
    width: 29px;
    height: 29px;
    background-image: url("@/assets/tab2_tag_bg_bluelight.png");
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab_2_six_harmony_tag_bg_green {
    position: absolute;
    z-index: 1000;
    top: 39px;
    right: 0;
    width: 29px;
    height: 29px;
    background-image: url("@/assets/tab2_tag_bg_green.png");
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab_2_six_harmony_tag_bg_purple {
    position: absolute;
    z-index: 1000;
    top: 88px;
    left: 7px;
    width: 29px;
    height: 29px;
    background-image: url("@/assets/tab2_tag_bg_purple.png");
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab_2_six_harmony_tag_bg_red {
    position: absolute;
    z-index: 1000;
    top: 0px;
    left: 111px;
    width: 29px;
    height: 29px;
    background-image: url("@/assets/tab2_tag_bg_red.png");
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab_2_six_harmony_tag_bg_blue {
    position: absolute;
    z-index: 1000;
    top: 89px;
    right: 0px;
    width: 29px;
    height: 29px;
    background-image: url("@/assets/tab2_tag_bg_blue.png");
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab_2_six_harmony_tag_bg_yellow {
    position: absolute;
    z-index: 1000;
    top: 39px;
    left: 0px;
    width: 29px;
    height: 29px;
    background-image: url("@/assets/tab2_tag_bg_yellow.png");
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab_1_three_advantage_tag_bg_purple {
    position: absolute;
    z-index: 1000;
    top: 35px;
    left: 0;
    width: 49px;
    height: 16px;
    background-image: url("@/assets/tag_bg_purple.png");
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: YouSheBiaoTiHei;
    font-size: 9px;
    color: #ffffff;
    line-height: 12px;
    text-align: left;
    font-style: normal;
  }

  .tab_1_three_advantage_tag_bg_blue {
    position: absolute;
    z-index: 1000;
    top: 0;
    left: 57px;
    width: 49px;
    height: 16px;
    background-size: cover;
    background-image: url("@/assets/tag_bg_blue.png");
    font-family: YouSheBiaoTiHei;
    font-size: 9px;
    color: #ffffff;
    line-height: 12px;
    text-align: left;
    font-style: normal;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab_1_three_advantage_tag_bg_green {
    position: absolute;
    z-index: 1000;
    top: 27px;
    left: 113px;
    background-image: url("@/assets/tag_bg_green.png");
    width: 49px;
    height: 16px;
    background-size: cover;
    font-family: YouSheBiaoTiHei;
    font-size: 9px;
    color: #ffffff;
    line-height: 12px;
    text-align: left;
    font-style: normal;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab_1_three_advantage_text {
    position: absolute;
    z-index: 1000;
    top: 268px;
    right: 22px;
    width: 201px;
    height: 119px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .tab_2_six_harmony_text {
    position: absolute;
    z-index: 1000;
    top: 268px;
    right: 22px;
    width: 201px;
    height: 119px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .tab_1_three_advantage_text_item {
    width: 201px;
    height: 119px;
    display: flex;
    align-items: center;
    gap: 9px;
    /* background-size: cover; */
  }

  .tab_2_six_harmony_text_item {
    width: 201px;
    height: 119px;
    display: flex;
    align-items: center;
    gap: 9px;
  }

  .tab_1_three_advantage_text_item_label {
    width: 13px;
    height: 12px;
    font-family: YouSheBiaoTiHei;
    font-size: 9px;
    color: #00f8f4;
    line-height: 12px;
    text-align: left;
    font-style: normal;
  }

  .tab_2_six_harmony_text_item_label {
    width: 13px;
    height: 12px;
    font-family: YouSheBiaoTiHei;
    font-size: 9px;
    color: #00f8f4;
    line-height: 12px;
    text-align: left;
    font-style: normal;
  }

  .tab_1_three_advantage_text_area {
    width: 183px;
    height: 26px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 6px;
    color: #e4f3ff;
    line-height: 13px;
    margin-left: 20px;
    text-align: left;
    font-style: normal;
    opacity: 0.8;
  }

  .tab_1_three_advantage_text_item_text {
    background-image: url("@/assets/tab_text_bg.png");
    background-size: contain;
    width: 201px;
    height: 21px;
    display: flex;
    align-items: center;
    justify-content: start;
    font-family: YouSheBiaoTiHei;
    font-size: 7px;
    color: #ffffff;
    line-height: 9px;
    text-align: left;
    font-style: normal;
    text-indent: 20px;
  }

  .tab_2_six_harmony_text_item_text {
    background-image: url("@/assets/tab_text_bg.png");
    background-size: contain;
    width: 201px;
    height: 21px;
    display: flex;
    align-items: center;
    justify-content: start;
    font-family: YouSheBiaoTiHei;
    font-size: 7px;
    color: #ffffff;
    line-height: 9px;
    text-align: left;
    font-style: normal;
    text-indent: 20px;
  }

  .tab_3_five_grain_tag_text {
    width: 15px;
    height: 19px;
    font-family: YouSheBiaoTiHei;
    font-size: 8px;
    color: #ffffff;
    line-height: 10px;
    text-align: left;
    font-style: normal;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab_3_five_grain_tag_bg_blue {
    position: absolute;
    z-index: 1000;
    top: 0;
    left: 73px;
    width: 29px;
    height: 29px;
    background-image: url("@/assets/tab2_tag_bg_blue.png");
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab_3_five_grain_tag_bg_green {
    position: absolute;
    z-index: 1000;
    top: 39px;
    left: 10px;
    width: 29px;
    height: 29px;
    background-image: url("@/assets/tab2_tag_bg_green.png");
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab_3_five_grain_tag_bg_purple {
    position: absolute;
    z-index: 1000;
    top: 109px;
    left: 20px;
    width: 29px;
    height: 29px;
    background-image: url("@/assets/tab2_tag_bg_purple.png");
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab_3_five_grain_tag_bg_yellow {
    position: absolute;
    z-index: 1000;
    top: 109px;
    right: 10px;
    width: 29px;
    height: 29px;
    background-image: url("@/assets/tab2_tag_bg_yellow.png");
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab_3_five_grain_tag_bg_red {
    position: absolute;
    z-index: 1000;
    top: 39px;
    right: 0px;
    width: 29px;
    height: 29px;
    background-image: url("@/assets/tab2_tag_bg_red.png");
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab_3_five_grain_text {
    position: absolute;
    z-index: 1000;
    top: 278px;
    right: 22px;
    width: 201px;
    height: 119px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .tab_3_five_grain_text_item {
    width: 201px;
    height: 119px;
    display: flex;
    align-items: center;
    gap: 9px;
  }

  .tab_3_five_grain_text_item_label {
    width: 13px;
    height: 12px;
    font-family: YouSheBiaoTiHei;
    font-size: 9px;
    color: #00f8f4;
    line-height: 12px;
    text-align: left;
    font-style: normal;
  }

  .tab_3_five_grain_text_item_text {
    background-image: url("@/assets/tab_text_bg.png");
    background-size: contain;
    width: 201px;
    height: 21px;
    display: flex;
    align-items: center;
    justify-content: start;
    font-family: YouSheBiaoTiHei;
    font-size: 7px;
    color: #ffffff;
    line-height: 9px;
    text-align: left;
    font-style: normal;
    text-indent: 20px;
  }
</style>
