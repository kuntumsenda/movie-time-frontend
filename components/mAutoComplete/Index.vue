<script lang="ts" setup>
import { useDebounce } from "#build/imports";
import type { ModelMenu } from "~/models/general";

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
    items?: ModelMenu[];
    loading?: boolean;
  }>(),
  {
    modelValue: null,
    type: "text",
    block: false,
    disabled: false,
    readonly: false,
    items: () => [],
    loading: false,
  }
);
const emit = defineEmits([
  "update:modelValue",
  "click",
  "focus",
  "blur",
  "search",
  "submit",
]);

const isOpen = ref(false as boolean);
const mAutoComplete = ref<HTMLElement | null>(null);
const searchValue = ref("" as any);
const debouncedSearch = useDebounce((value: string) => {
  emit("search", value);
  if (!isOpen.value) isOpen.value = true;
}, 500);
function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  debouncedSearch(target.value);
}
function onFocus(event: Event) {
  emit("focus", event);
}
function onBlur(event: Event) {
  emit("blur", event);
}
function onClick(event: Event) {
  emit("click", event);
}

function onSelected(e: ModelMenu) {
  emit("update:modelValue", e.value);
  emit("submit", e.value);
  isOpen.value = false;
}

const handleClickOutside = (event: MouseEvent) => {
  if (
    mAutoComplete.value &&
    !mAutoComplete.value.contains(event.target as Node)
  ) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
<template>
  <div ref="mAutoComplete" class="relative">
    <MInput
      :block="block"
      v-model="searchValue"
      :type="type"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @input="onInput"
      @click="onClick"
      @focus="onFocus"
      @blur="onBlur"
    >
      <template #prepend>
        <slot name="prepend" />
      </template>
      <template #append>
        <slot name="append" />
      </template>
    </MInput>
    <MMenu
      variant="dark"
      :active="isOpen"
      :indexActive="
        items.length ? items.findIndex((x) => x.value === modelValue) : null
      "
      :items="items"
      class="m-dropdown-items"
      :class="isOpen && 'open z-20'"
      :loading="loading"
      :emptyText="!searchValue ? 'Enter Something...' : 'Data is Empy'"
      @selected="onSelected"
    />
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
.m-dropdown-items {
  opacity: 0;
  position: absolute;
  top: 36px;
  right: 0;
  transition: opacity 0.2s ease-in-out;
}
.m-dropdown-items.open {
  opacity: 1;
}
</style>
