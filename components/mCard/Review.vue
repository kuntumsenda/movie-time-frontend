<script setup lang="ts">
import type { ModelReview } from "~/models/review";

const props = defineProps<{
  item: ModelReview;
}>();
</script>

<template>
  <div class="bg-gray-200 rounded-xl py-5 px-6 text-blackNormal">
    <div class="flex justify-between gap-4">
      <div class="flex gap-4">
        <MAvatar size="48px" :path="item.author_details.avatar_path" />
        <div>
          <span class="block text-sm font-bold">{{ item.author }}</span>
          <span class="block text-xs text-gray-500">December 18, 2020</span>
        </div>
      </div>
      <MRating
        :rate="item.author_details.rating"
        class="bg-gray-300 py-1 px-4 rounded-md"
        variant="review"
      />
    </div>
    <div style="font-size: 13px" class="leading-normal mt-6">
      <span v-html="item.content" class="text-ellipsis-7"></span>
      <MButton
        text
        label="read the rest"
        class="font-medium"
        style="margin-left: -16px"
      />
    </div>
  </div>
</template>
