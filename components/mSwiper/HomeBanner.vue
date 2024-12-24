<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import type { ModelMovie } from "~/models/movies";
import { number1Comma, onlyYear, genreDisplay } from "@/composables/format";

const props = defineProps<{
  items?: ModelMovie[];
}>();
</script>
<template>
  <swiper
    ref="{swiperRef}"
    :centeredSlides="true"
    pagination
    :modules="[Pagination]"
    :breakpoints="{
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    }"
  >
    <swiper-slide v-for="item in items" :key="item.id">
      <div class="flex items-center">
        <div class="img-banner-swiper">
          <img
            width="100%"
            :src="`https://image.tmdb.org/t/p/w440_and_h660_face${item.poster_path}`"
            :alt="item.poster_path"
          />
        </div>
        <div class="content-banner-swiper">
          <MRating
            :rate="number1Comma(item.vote_average)"
            class="font-bold"
            size="sm"
          />
          <span class="title block font-medium text-ellipsi-2">{{
            item.title ? item.title : item.name ? item.name : "Untitled"
          }}</span>
          <div class="my-3 truncate">
            {{
              onlyYear(
                item.release_date ? item.release_date : item.first_air_date
              )
            }}
            <span>{{ genreDisplay(item.genres, true) }}</span>
          </div>
          <p class="text-xs text-ellipsis-5" style="line-height: 1.5">
            {{ item.overview }}
          </p>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>
<style lang="css">
.swiper {
  width: 100%;
  height: 428px;
  margin: 0 auto;
}

.swiper-slide {
  font-size: 18px;
  width: 541.25px !important;
  align-items: start;
  display: flex;
  justify-content: center;
  opacity: 0.3;
  transition: opacity 0.1s;
}

.swiper-slide-active {
  opacity: 1;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.append-buttons {
  text-align: center;
  margin-top: 20px;
}
.swiper-pagination {
  margin-top: 50px;
}
.swiper-pagination-bullet {
  border-radius: 20px;
  transition: width 0.3s;
  background: #ffffff80;
}
.swiper-pagination-bullet-active {
  width: 60px;
  @apply bg-primary;
}
.img-banner-swiper {
  img {
    width: 243px;
    height: 364px;
    object-fit: fill;
  }
}
.content-banner-swiper {
  background-color: black;
  padding: 26px;
  max-width: 302px;
  height: 324px;
}
.content-banner-swiper .title {
  font-size: 28px;
}
</style>
