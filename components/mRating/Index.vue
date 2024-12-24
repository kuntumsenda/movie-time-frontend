<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  rate: Number,
  size: { type: String, default: "md" },
});
</script>
<template>
  <div class="flex items-center gap-2 m-rating" :class="[size]">
    <img src="@/assets/icons/ic-star.svg" alt="ic_star" />
    <span class="text-xl">{{ rate }}</span>
  </div>
</template>
<style lang="css" scoped>
.m-rating.md {
  font-size: 24px;
}
.m-rating.sm {
  font-size: 18px;
}
.m-rating.md img {
  width: 32px;
}
.m-rating.sm img {
  width: 16px;
}
</style>
