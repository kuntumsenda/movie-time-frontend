<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  text: String,
  size: { type: String, default: "24px" },
  fontWeight: { type: String, default: "semibold" },
});
</script>
<template>
  <div>
    <span
      class="bg-primary block mb-3"
      style="width: 112px; height: 6px"
    ></span>
    <h2 :style="`font-size: ${size}`" :class="[`font-${fontWeight}`]">
      {{ text }}
    </h2>
  </div>
</template>
