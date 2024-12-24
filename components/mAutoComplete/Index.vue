<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  value: { type: [String, Number] },
  type: { type: String, default: "text" },
  id: String,
  name: String,
  block: { type: Boolean, default: false },
  variant: { type: String, default: "standart" },
  placeholder: String,
  inputClass: String,
});
</script>
<template>
  <div
    class="m-input--wrapper bg-white dark:bg-darkBgInput"
    :class="[block && 'w-full']"
  >
    <slot name="prepend" />
    <input
      :value="value"
      :type="type"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      class="block min-w-0 grow text-base text-gray-900 placeholder:text-gray-400 w-full"
      :class="[inputClass]"
    />
    <slot name="append" />
  </div>
</template>

<style lang="css">
.m-input--wrapper {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 0 10px;
  min-height: 36px;
  border-radius: 4px;
}
</style>
