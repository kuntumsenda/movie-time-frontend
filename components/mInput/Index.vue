<script lang="ts" setup>
import { defineProps } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    type?: string;
    id?: string;
    name?: string;
    block?: boolean;
    variant?: string;
    placeholder?: string;
    inputClass?: string;
    disabled?: boolean;
    readonly?: boolean;
  }>(),
  {
    modelValue: null,
    type: "text",
    block: false,
    disabled: false,
    readonly: false,
  }
);
const emit = defineEmits(["update:modelValue", "click", "focus", "blur"]);
const isFocus = ref(false as boolean);
function onInput(event: Event) {
  isFocus.value = true;
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
function onFocus(event: Event) {
  isFocus.value = true;
  emit("focus", event);
}
function onBlur(event: Event) {
  isFocus.value = false;
  emit("blur", event);
}
function onClick(event: Event) {
  isFocus.value = !isFocus.value;
  emit("click", event);
}
</script>
<template>
  <div
    class="m-input--wrapper bg-white dark:bg-darkBgInput"
    :class="[
      block && 'w-full',
      isFocus && 'shadow-sm shadow-primary transition-all',
    ]"
  >
    <slot name="prepend" />
    <input
      :value="modelValue"
      :type="type"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      class="block min-w-0 grow text-base text-gray-900 placeholder:text-gray-400 w-full"
      :class="[inputClass]"
      :disabled="disabled"
      :readonly="readonly"
      @click="onClick"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <slot name="append" />
  </div>
</template>

<style lang="css" scoped>
.m-input--wrapper {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 0 10px;
  min-height: 36px;
  border-radius: 4px;
}
.cursor-pointer input {
  cursor: pointer;
}
</style>
