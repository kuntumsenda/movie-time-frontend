<script lang="ts" setup>
import type { ModelMenu } from "~/models/general";

const props = withDefaults(
  defineProps<{
    indexActive?: any;
    active?: boolean;
    items?: ModelMenu[];
    width?: string;
    variant?: string;
    loading?: boolean;
    emptyText?: string;
    maxHeight?: string;
  }>(),
  {
    indexActive: null,
    active: false,
    items: () => [] as ModelMenu[],
    variant: "light",
    loading: false,
    emptyText: "Data is Empty",
    maxHeight: "300px",
  }
);

const emit = defineEmits(["selected"]);

function onSelected(e: ModelMenu) {
  emit("selected", e);
}
</script>
<template>
  <div
    class="rounded-sm text-sm font-semibold w-full overflow-y-auto"
    style="box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5)"
    :style="`width: ${width}; maxHeight: ${maxHeight}`"
    :class="
      variant === 'light'
        ? 'bg-white text-darkBgPrimary font-semibold'
        : 'bg-black-800 text-white'
    "
  >
    <div
      v-if="loading"
      class="text-center px-2 py-10 font-normal"
      :class="[variant === 'light' ? 'text-gray-600' : 'text-gray-300']"
    >
      Loading...
      <slot name="loading" />
    </div>
    <ul v-else-if="items.length">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="px-4 py-2 hover:bg-gray-300"
        :class="[
          active && 'cursor-pointer',
          indexActive === index && 'bg-gray-300',
        ]"
        @click="onSelected(item)"
        @keydown.enter="onSelected(item)"
      >
        <MIcon v-if="item.icon" :name="item.icon" />
        <span>{{ item.label }}</span>
      </li>
    </ul>
    <div
      v-else
      class="text-center px-2 py-10 text-gray-600 font-normal"
      :class="[variant === 'light' ? 'text-gray-600' : 'text-gray-300']"
    >
      {{ emptyText }}
    </div>
  </div>
</template>
