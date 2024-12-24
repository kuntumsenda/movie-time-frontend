<script lang="ts" setup>
const props = defineProps({
  path: { type: String, default: "" },
});
</script>
<template>
  <div class="rounded-full bg-gray-600" :style="`width: 48px; height: 48px;`">
    <img
      v-if="path"
      :src="`https://media.themoviedb.org/t/p/w128_and_h128_face${path}`"
      :alt="path"
      class="w-full h-full rounded-full"
    />
  </div>
</template>
