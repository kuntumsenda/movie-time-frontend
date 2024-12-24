<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  label: String,
  outlined: { type: Boolean, default: false },
  variant: { type: String, default: "primary" },
  rounded: { type: Boolean, default: true },
});

const emit = defineEmits(["click"]);
</script>
<template>
  <button
    class="font-bold text-sm flex items-center gap-1"
    :class="[
      classes.mButton,
      variant === 'primary'
        ? 'bg-red'
        : (variant = 'secondary' ? 'bg-black-600' : 'bg-primary'),
      rounded && 'rounded-full',
    ]"
    @click="$emit('click')"
  >
    {{ label }}
    <slot />
  </button>
</template>

<style lang="css" module="classes">
.mButton {
  padding: 6px 16px;
  position: relative;
}
.mButton:hover {
  box-shadow: rgba(244, 226, 222, 0.183) 0 3px 8px;
}
</style>
