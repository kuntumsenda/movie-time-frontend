<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  name: String,
  color: String,
});
</script>

<template>
  <Icon :name="name" :color="color" class="text-2xl" />
</template>
