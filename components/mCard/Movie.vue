<script lang="ts" setup>
import { defineProps } from "vue";
import { number1Comma, onlyYear, genreDisplay } from "@/composables/format";
import type { ModelGenre } from "~/models/general";

const props = defineProps({
  id: Number,
  posterPath: String,
  title: String,
  releaseDate: String,
  rate: Number,
  genres: { type: Array, default: [] },
});

const router = useRouter();

const rateDisplay = computed(() => {
  return number1Comma(props.rate ?? 0);
});
</script>
<template>
  <div :class="classes.cardMovie" class="card-movie">
    <span :class="classes.badgeMovieRate" class="font-bold">{{
      rateDisplay
    }}</span>
    <div :class="classes.imgMovieWrapper">
      <div
        :class="classes.infoHover"
        class="w-full h-full absolute top-0 left-0 p-3 flex items-center justify-center text-center info-hover"
      >
        <div>
          <MRating :rate="rate ?? 0" class="justify-center" />
          <span class="block my-6">{{
            genreDisplay(genres as ModelGenre[], false)
          }}</span>
          <MButton
            label="View"
            class="mx-auto"
            @click="router.push(`/detail/${id}`)"
          />
        </div>
      </div>
      <img
        width="100%"
        :src="`https://image.tmdb.org/t/p/w440_and_h660_face${posterPath}`"
        :alt="posterPath"
        :class="classes.imgMovie"
      />
    </div>
    <p class="block font-semibold mb-1 truncate" style="line-height: 1.22">
      {{ title }}
    </p>
    <small class="text-gray-light text-sm">{{
      onlyYear(releaseDate ?? "")
    }}</small>
  </div>
</template>
<style lang="css" module="classes">
.cardMovie {
  max-width: 220px;
  position: relative;
  cursor: pointer;
}
.imgMovieWrapper {
  height: 330px;
  margin-bottom: 13px;
  position: relative;
}
.imgMovie {
  object-fit: cover;
  width: 100%;
  height: 330px;
}
.badgeMovieRate {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  background: rgba(30, 35, 43, 0.8);
  padding: 5px 11px;
  font-size: 18px;
}
</style>
<style scoped>
.info-hover {
  opacity: 0;
  transition: opacity 0.3s;
  background-color: #2e2e2e;
}
.card-movie:hover .info-hover {
  opacity: 1;
}
</style>
