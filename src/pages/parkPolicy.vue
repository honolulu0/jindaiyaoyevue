<template>
  <div class="w-full h-full absolute top-0 left-0 z-0">
    <div
      class="w-full h-full absolute top-0 left-0 z-0 bg-[#0A131C] bg-opacity-80"
    ></div>
    <SecondaryTabs :activeIndex="0" />
    <ParkPolicyChart />
    <ProportionOfPolicies />
    <EnterprisesRDRanking />
    <PolicyDetail />
    <PolicyTTL />
    <PolicyList />
  </div>
</template>

<script setup lang="ts">
  import SecondaryTabs from "@/components/secondaryTabs.vue";
  import ParkPolicyChart from "@/components/parkPolicychart.vue";
  import ProportionOfPolicies from "@/components/proportionofPolicies.vue";
  import EnterprisesRDRanking from "@/components/enterprisesRDRanking.vue";
  import PolicyDetail from "@/components/policyDetail.vue";
  import PolicyTTL from "@/components/policyTTL.vue";
  import PolicyList from "@/components/policyList.vue";
</script>

<style scoped></style>
