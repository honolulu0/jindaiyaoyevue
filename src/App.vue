<template>
  <ConfigProvider :locale="locale">
    <Layout>
      <RouterView></RouterView>
    </Layout>
  </ConfigProvider>
</template>

<script setup lang="ts">
  import { ConfigProvider } from "ant-design-vue";
  import zhCN from "ant-design-vue/es/locale/zh_CN";
  import dayjs from "dayjs";
  import Layout from "./layouts/layout.vue";
  import "dayjs/locale/zh-cn";
  dayjs.locale("zh-cn");
  const locale = zhCN;
</script>

<style scoped></style>
