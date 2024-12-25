<script setup lang="ts">
import type { ModelMenu } from "~/models/general";

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    options?: ModelMenu[];
    placeholder?: string;
    hideIconChevron?: boolean;
    variant?: string;
  }>(),
  {
    modelValue: null,
    options: () => [] as ModelMenu[],
    hideIconChevron: false,
    variant: "dark",
  }
);

const isActive = ref(false as boolean);
const mSelect = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (mSelect.value && !mSelect.value.contains(event.target as Node)) {
    isActive.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
const emit = defineEmits(["update:modelValue", "change"]);
function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
function onSelected(e: ModelMenu) {
  emit("update:modelValue", e.value);
  isActive.value = false;
}
</script>
<template>
  <div ref="mSelect" class="relative">
    <MInput
      :model-value="modelValue"
      :placeholder="placeholder"
      readonly
      @input="onInput"
      @click="isActive = !isActive"
      class="m-select cursor-pointer"
    >
      <template #append>
        <div v-if="!hideIconChevron" @click="isActive = !isActive">
          <MIcon
            v-if="!hideIconChevron"
            name="mdi:chevron-down"
            class="-mr-1 size-5 text-gray-400 transition rotate"
            :class="isActive && 'rotate-180'"
            aria-hidden="true"
          />
        </div>
      </template>
    </MInput>
    <MMenu
      :indexActive="
        options.length ? options.findIndex((x) => x.value === modelValue) : null
      "
      :active="isActive"
      :variant="variant"
      :items="options"
      class="m-select-options"
      :class="isActive && 'open z-20'"
      @selected="onSelected"
    />
  </div>
</template>
<style lang="css" scoped>
.m-select {
  z-index: 20;
}
.m-select-options {
  opacity: 0;
  position: absolute;
  top: 36px;
  right: 0;
  transition: opacity 0.2s ease-in-out;
}
.m-select-options.open {
  opacity: 1;
}
</style>
