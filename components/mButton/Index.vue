<script lang="ts" setup>
const props = defineProps({
  label: String,
  outlined: { type: Boolean, default: false },
  variant: { type: String, default: "primary" },
  rounded: { type: Boolean, default: true },
  text: { type: Boolean, default: false },
});

const emit = defineEmits(["click"]);
function onClick(e: Event) {
  e.preventDefault();
  emit("click", e);
}
</script>
<template>
  <button
    class="font-bold text-sm flex items-center gap-1"
    :class="[
      classes.mButton,
      variant === 'primary'
        ? 'bg-red'
        : variant === 'secondary'
        ? 'bg-black-600'
        : 'bg-primary',
      rounded && 'rounded-full',
      text && `text`,
      outlined && 'outline',
      variant,
    ]"
    @click="onClick"
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

<style lang="css" scoped>
.text {
  background: transparent;
}
.text.primary {
  @apply text-red;
}
</style>
