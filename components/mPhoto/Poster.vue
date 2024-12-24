<script lang="ts" setup>
const props = defineProps({
  path: { type: String, default: "2cxhvwyEwRlysAmRH4iodkvo0z5.jpg" },
  elevation: { type: Boolean, default: false },
});
</script>
<template>
  <div
    :class="classes.photoWrap"
    :style="
      elevation && 'filter: drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.25));'
    "
  >
    <img
      :src="`https://media.themoviedb.org/t/p/w440_and_h660_face/${path}`"
      :alt="path"
      class="w-full h-full"
    />
  </div>
</template>
<style lang="css" module="classes">
.photoWrap {
  width: 220px;
  height: 330px;
}
</style>
