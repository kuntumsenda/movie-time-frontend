<script lang="ts" setup>
import type { ModelMenu } from "~/models/general";

const props = withDefaults(
  defineProps<{
    items: ModelMenu[];
    widthMenu?: string;
    label?: string;
    hideIconChevron?: boolean;
  }>(),
  {
    items: () => [] as ModelMenu[],
    label: "",
    hideIconChevron: false,
  }
);
const isOpen = ref(false as boolean);
const mDropdown = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (mDropdown.value && !mDropdown.value.contains(event.target as Node)) {
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
  <div ref="mDropdown" class="relative inline-block text-left m-dropdown">
    <div>
      <MButton
        text
        variant="darkTextBody"
        class="m-dropdown-button font-normal"
        @click="isOpen = !isOpen"
      >
        <slot name="label" />
        {{ label }}
        <div v-if="!hideIconChevron" @click="isOpen = !isOpen">
          <MIcon
            name="mdi:chevron-down"
            class="-mr-1 size-5 text-gray-400 transition rotate"
            :class="isOpen && 'rotate-180'"
            aria-hidden="true"
          />
        </div>
      </MButton>
    </div>
    <MMenu
      :active="isOpen"
      :items="items"
      :width="widthMenu"
      class="m-dropdown-items"
      :class="isOpen && 'open z-20'"
    />
  </div>
</template>
<style lang="css" scoped>
.m-dropdown-button {
  z-index: 20;
}
.m-dropdown-button:hover .m-dropdown-items {
  opacity: 1;
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
