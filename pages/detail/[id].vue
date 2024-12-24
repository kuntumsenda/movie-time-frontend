<script lang="ts" setup>
import { useApi } from "@/composables/useApi";
import { refactorListMovieWithGenre } from "@/composables/filter";
import { API_MOVIE_LIST, API_MOVIES } from "@/utils/api";
import type { ModelMovie } from "~/models/movies";
import { useGeneralStore } from "@/stores/general";
import { USDollar, genreDisplay, onlyYear } from "#build/imports";
import type { ModelReview } from "~/models/review";

const route = useRoute();
const { fetchData } = useApi();
const generalStore = useGeneralStore();
const listRecommendation = ref([] as ModelMovie[]);
const detail = ref({} as ModelMovie);
const listReview = ref([] as ModelReview[]);
const reviewPage = ref(1 as number);
const reviewTotalPage = ref(1 as number);

async function getMovieDetail() {
  const data = await fetchData(`${API_MOVIES.detail}${route.params.id}`, {
    language: "en-US",
  });
  detail.value = data;
}

async function getMovieReview() {
  const data = await fetchData(
    `${API_MOVIES.detail}${route.params.id}/reviews`,
    {
      language: "en-US",
    }
  );
  listReview.value =
    data.results?.length > 2 ? data.results.slice(0, 2) : data.results;
  reviewTotalPage.value = data.totalPages;
}

async function getListRecommend() {
  const data = await fetchData(API_MOVIE_LIST.topRated, {
    language: "en-US",
    page: 1,
  });
  const newList = refactorListMovieWithGenre(
    data.results.slice(0, 5),
    generalStore.getMovieGenres
  );
  listRecommendation.value = [...newList];
}

const title = onMounted(() => {
  getMovieDetail();
  getMovieReview();
  getListRecommend();
});

watch(generalStore.getMovieGenres, (val) => {
  const newList = refactorListMovieWithGenre(listRecommendation.value, val);
  listRecommendation.value = [...newList];
});
</script>
<template>
  <div class="relative" :class="classes.pageDetail">
    <div class="relative">
      <img
        :src="`https://image.tmdb.org/t/p/w3840_and_h1200_face${detail.backdrop_path}`"
        :alt="detail.backdrop_path"
        class="w-full h-full absolute object-cover"
        style="z-index: -1"
      />
      <section :class="classes.sectionOverview" class="relative">
        <div class="container absolute" :class="classes.containerPoster">
          <MPhotoPoster elevation :path="detail.poster_path" />
        </div>
        <div class="container">
          <div
            class="font-medium px-8 pb-8 pt-4 text-white"
            :class="classes.containerOverviewSpace"
          >
            <p style="font-size: 18px">
              {{ onlyYear(detail.release_date ?? "") }}
            </p>
            <h2 class="text-3xl font-semibold">{{ detail.title }}</h2>
            <p class="text-md">
              {{ genreDisplay(detail.genres ?? [], false) }}
            </p>
          </div>
        </div>
        <div style="background: #00000080">
          <div :class="classes.containerOverviewSpace">
            <div
              class="container grid grid-cols-6 sm:grid-cols-12 lg:flex items-center py-5 gap-y-5"
            >
              <div
                class="flex items-center gap-3 px-8 sm:col-span-12 col-span-6"
              >
                <div class="text-sm font-medium">
                  <span class="text-white-500 block">USER SCORE</span>
                  <div>{{ detail.vote_count }} Votes</div>
                </div>
                <MRating
                  :rate="detail.vote_average"
                  size="lg"
                  class="font-semibold"
                />
              </div>
              <div class="text-sm font-medium px-8 col-span-6">
                <span class="text-white-500 block">STATUS</span>
                <div>{{ detail.status }}</div>
              </div>
              <div class="text-sm font-medium px-8 col-span-6">
                <span class="text-white-500 block">LANGUAGE</span>
                <div>{{ detail.spoken_languages?.[0].english_name }}</div>
              </div>
              <div class="text-sm font-medium px-8 col-span-6">
                <span class="text-white-500 block">BUDGET</span>
                <div>
                  {{ USDollar.format(detail.budget ?? 0) }}
                </div>
              </div>
              <div class="text-sm font-medium px-8 col-span-6">
                <span class="text-white-500 block">PRODUCTION</span>
                <div>{{ detail.production_companies?.[0].name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white">
          <div class="container">
            <div class="px-8" :class="classes.containerOverviewSpace">
              <div class="pb-11 pt-6 text-sm" style="max-width: 526px">
                <h3 class="font-semibold mb-2 text-red">OVERVIEW</h3>
                <p class="text-blackNormal leading-loose">
                  {{ detail.overview }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <section class="bg-white" :class="classes.sectionReview">
      <div class="container">
        <h3 class="font-semibold text-sm mb-6 text-red">REVIEWS</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-9">
          <MCardReview
            v-for="(rev, index) in listReview"
            :key="index"
            :item="rev"
          />
        </div>
      </div>
    </section>
    <section class="py-12">
      <div class="container">
        <h3 class="font-semibold text-sm mb-9">RECOMMENDATION MOVIES</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5">
          <MCardMovie
            v-for="item in listRecommendation"
            :key="item.id"
            :posterPath="item.poster_path"
            :releaseDate="item.release_date"
            :rate="item.vote_average"
            :title="item.title"
            :genres="item.genres"
          />
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="css" module="classes">
.pageDetail {
  margin-top: -66px;
}
.sectionMovieList {
  position: relative;
}
.sectionMovieList:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 333px;
  background: rgba(255, 255, 255, 0.05);
  z-index: -1;
}
.containerMovieList {
  padding-top: 89px;
}
.movieWrap {
  padding-bottom: 93px;
  max-width: 940px;
}
.btnLoad {
  padding-top: 63px;
}
.sortCard {
  background: linear-gradient(180deg, #0e1723 0%, rgba(30, 35, 42, 0) 100%);
  border-radius: 8px;
  width: 240px;
}
.sectionReview {
  padding: 0 0 58px;
}
.sectionOverview {
  padding-top: 223px;
}
.containerPoster {
  top: 223px;
  left: 50%;
  transform: translateX(-50%);
}
.containerOverviewSpace {
  margin-left: 220px;
}
</style>
