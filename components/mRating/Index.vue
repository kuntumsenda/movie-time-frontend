<script lang="ts" setup>
import { defineProps } from "vue";
import { number1Comma } from "#build/imports";

const props = defineProps({
  rate: [Number, String],
  size: { type: String, default: "md" },
  variant: { type: String, default: "normal" },
});
</script>
<template>
  <div
    class="flex gap-2 m-rating"
    :class="[size, variant === 'review' ? 'review' : 'items-center']"
  >
    <img src="@/assets/icons/ic-star.svg" alt="ic_star" />
    <span>{{ number1Comma(rate) }}</span>
  </div>
</template>
<style lang="css" scoped>
.m-rating.lg {
  font-size: 36px;
}
.m-rating.md {
  font-size: 24px;
}
.m-rating.sm {
  font-size: 18px;
}
.m-rating.lg img {
  width: 32px;
}
.m-rating.md img {
  width: 32px;
}
.m-rating.sm img {
  width: 16px;
}
.review img {
  width: 17px !important;
}
.review {
  font-size: 36px !important;
  font-weight: 600;
}
</style>
