<template>
  <div class="w-full h-full absolute top-0 left-0 z-0 park-enterprise-detail">
    <div class="park-enterprise-detail-header">
      {{ enterpriseDetail?.name }}
    </div>
    <div class="park-enterprise-detail-content">
      <div class="label label-1">
        <span class="label-text-content">{{
          dayjs(enterpriseDetail?.years).format("YYYY-MM-DD")
        }}</span>
        <span class="label-text">成立日期</span>
        <img
          class="label-img"
          src="@/assets/new_label.png"
        />
      </div>
      <div class="label label-2">
        <span class="label-text-content">{{
          enterpriseDetail?.companyType
        }}</span>
        <span class="label-text">企业类型</span>
        <img
          class="label-img"
          src="@/assets/new_label.png"
        />
      </div>
      <div class="label label-3">
        <span class="label-text-content"
          >{{ enterpriseDetail?.registeredCapital }}万元</span
        >
        <span class="label-text">注册资本</span>
        <img
          class="label-img"
          src="@/assets/new_label.png"
        />
      </div>
      <div class="label label-4">
        <span class="label-text-content"
          >{{
            new Date().getFullYear() - dayjs(enterpriseDetail?.years).year()
          }}年</span
        >
        <span class="label-text">入驻年限</span>
        <img
          class="label-img"
          src="@/assets/new_label.png"
        />
      </div>
      <div class="label label-5">
        <span class="label-text-content">{{
          dayjs(enterpriseDetail?.years).format("YYYY-MM-DD")
        }}</span>
        <span class="label-text">入驻时间</span>
        <img
          class="label-img"
          src="@/assets/new_label.png"
        />
      </div>
      <div class="label label-6">
        <span class="label-text-content">{{
          scaleMap[enterpriseDetail?.scale as keyof typeof scaleMap]
        }}</span>
        <span class="label-text">企业规模</span>
        <img
          class="label-img"
          src="@/assets/new_label.png"
        />
      </div>
      <div class="label label-7">
        <span class="label-text-content"
          >{{ enterpriseDetail?.texPerYear }}万元</span
        >
        <span class="label-text">年度纳税额</span>
        <img
          class="label-img"
          src="@/assets/new_label.png"
        />
      </div>
      <div class="label label-8">
        <span class="label-text-content"
          >{{ enterpriseDetail?.employeesCount }}人</span
        >
        <span class="label-text">员工数量</span>
        <img
          class="label-img"
          src="@/assets/new_label.png"
        />
      </div>
      <div class="company-img">
        <img :src="enterpriseDetail?.imgUrl" />
      </div>
      <div
        class="shadow-img"
        v-if="enterpriseHonor.length"
      ></div>
      <div
        class="stars"
        v-if="enterpriseHonor.length"
      >
        <img
          class="star-img"
          src="@/assets/new_stars.png"
        />
      </div>
      <div
        class="company-honor"
        v-if="enterpriseHonor.length"
      >
        <transition name="slide-fade">
          <div
            :key="displayEnterpriseHonor"
            class="honor-text"
          >
            {{ displayEnterpriseHonor }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Enterprise, getEnterpriseDetail } from "@/apis/getEnterpriseData";
  import { useRoute } from "vue-router";
  import { onMounted, ref, onUnmounted } from "vue";
  import dayjs from "dayjs";
  const route = useRoute();
  const id = route.query.id as string;
  const enterpriseDetail = ref<Enterprise>();
  const enterpriseHonor = ref<string[]>([]);
  const displayEnterpriseHonor = ref<string>("");
  let timer: NodeJS.Timeout;

  const fetchEnterpriseDetail = async () => {
    const res = await getEnterpriseDetail(id as string);
    enterpriseDetail.value = res;
    if (res.honors) {
      enterpriseHonor.value = res.honors.split("\n");
      displayEnterpriseHonor.value = enterpriseHonor.value[0];
      startHonorRotation();
    }
  };

  const startHonorRotation = () => {
    let currentIndex = 0;
    timer = setInterval(() => {
      currentIndex = (currentIndex + 1) % enterpriseHonor.value.length;
      displayEnterpriseHonor.value = enterpriseHonor.value[currentIndex];
    }, 3000);
  };

  onMounted(async () => {
    await fetchEnterpriseDetail();
  });

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer);
    }
  });

  const scaleMap = {
    SMALL: "小型",
    NORMAL: "中型",
    OTHER: "大型",
  };
</script>

<style scoped>
  .park-enterprise-detail {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url("@/assets/bgNew.png");
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .park-enterprise-detail-header {
    width: 100%;
    height: 41px;
    font-family: YouSheBiaoTiHei;
    font-size: 31px;
    color: #a6e9ff;
    line-height: 41px;
    letter-spacing: 0px;
    text-shadow: 0px 0px 6px rgba(0, 128, 255, 0.6);
    font-style: normal;
    text-align: center;
  }

  .park-enterprise-detail-content {
    width: 811px;
    height: 302px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url("@/assets/new_mid.png");
  }

  .label {
    position: relative;
    width: 261px;
    height: 23px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .label-img {
    width: 32px;
    height: 32px;
  }

  .label-text {
    font-family: SourceHanSansCN-Normal;
    font-weight: bold;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 19px;
    font-style: normal;
  }

  .label-text-content {
    min-width: 146px;
    height: 23px;
    font-family: YouSheBiaoTiHei;
    font-size: 18px;
    color: #a6e9ff;
    line-height: 23px;
    text-shadow: 0px 0px 6px rgba(0, 128, 255, 0.6);
    font-style: normal;
    text-align: center;
  }

  .label-1 {
    top: 45px;
  }

  .label-2 {
    top: calc(45px + 41px);
    left: -20px;
  }

  .label-3 {
    top: calc(45px + 41px + 41px);
    left: -20px;
  }

  .label-4 {
    top: calc(45px + 41px + 41px + 41px);
  }

  .label-5 {
    left: calc(539px);
    top: -45px;
    flex-direction: row-reverse;
  }

  .label-6 {
    left: calc(539px + 20px);
    top: calc(-45px + 41px);
    flex-direction: row-reverse;
  }

  .label-7 {
    left: calc(539px + 20px);
    top: calc(-45px + 41px + 41px);
    flex-direction: row-reverse;
  }

  .label-8 {
    left: calc(539px);
    top: calc(-45px + 41px + 41px + 41px);
    flex-direction: row-reverse;
  }

  .stars {
    position: relative;
    top: -10px;
    left: 359px;
    width: 93px;
    height: 16px;
  }

  .star-img {
    width: 93px;
    height: 16px;
    z-index: 2;
  }

  .company-img {
    position: absolute;
    top: 190px;
    left: 418px;
    width: 239px;
    height: 239px;
    border-radius: 50%;
    overflow: hidden;
  }

  .shadow-img {
    position: absolute;
    top: 190px;
    left: 418px;
    width: 239px;
    height: 239px;
    border-radius: 50%;
    background: linear-gradient(
      180deg,
      rgba(136, 136, 136, 0) 0%,
      rgba(0, 58, 100, 1) 100%
    );
  }

  .company-honor {
    position: absolute;
    left: 418px;
    width: 238px;
    height: 48px;
    overflow: hidden;
    top: 370px;
  }

  .honor-text {
    font-family: YouSheBiaoTiHei;
    font-size: 13px;
    color: #a6e9ff;
    line-height: 16px;
    text-shadow: 0px 0px 6px rgba(0, 128, 255, 0.6);
    text-align: center;
    font-style: normal;
    position: absolute;
    width: 100%;
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 1s ease;
    position: absolute;
    width: 100%;
  }

  .slide-fade-enter-from {
    transform: translateY(100%);
    opacity: 0;
  }

  .slide-fade-leave-to {
    transform: translateY(-100%);
    opacity: 0;
  }
</style>
