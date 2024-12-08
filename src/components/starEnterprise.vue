<template>
  <div class="star_enterprise">
    <div class="title_bg"></div>
    <div class="title">明星企业</div>
    <div class="logo_set"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
  .star_enterprise {
    width: 377px;
    height: 579px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 800;
  }

  .title {
    font-size: 16px;
    color: #84f8fb;
    font-family: YouSheBiaoTiHei;
    font-style: normal;
    line-height: 24px;
    position: absolute;
  }

  .title_bg {
    width: 201px;
    height: 12px;
    background-size: cover;
    background-image: url("@/assets/title_bg.png");
    position: absolute;
    z-index: 1000;
    bottom: 122px;
    right: 26px;
  }

  .title {
    position: absolute;
    z-index: 1000;
    bottom: 129px;
    right: 169px;
    width: 45px;
    height: 13px;
    font-family: YouSheBiaoTiHei;
    font-size: 10px;
    color: #a5d8fc;
    line-height: 13px;
    text-align: left;
    font-style: normal;
  }

  .logo_set {
    position: absolute;
    z-index: 1000;
    bottom: 13px;
    right: 33px;
    background-image: url("@/assets/logo_set.png");
    background-size: cover;
    width: 176px;
    height: 109px;
  }
</style>
