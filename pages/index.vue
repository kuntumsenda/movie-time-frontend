<script lang="ts" setup>
import { useApi } from "@/composables/useApi";
import { refactorListMovieWithGenre } from "@/composables/filter";
import { API_DISCOVER, API_TRENDING } from "@/utils/api";
import type { ModelMovie } from "~/models/movies";
import { useGeneralStore } from "@/stores/general";

const { fetchData } = useApi();
const generalStore = useGeneralStore();

const page = ref(1 as number);
const sortBy = "popularity" as string;
const sortDesc = ref(true as boolean);
const listBanner = ref([] as ModelMovie[]);
const listDiscvoverMovie = ref([] as ModelMovie[]);

async function getListMovie() {
  const data = await fetchData(API_DISCOVER.movie, {
    include_adult: false,
    include_video: false,
    language: "en-US",
    page: page.value,
    sort_by: sortDesc.value ? `${sortBy}.desc` : `${sortBy}.asc`,
  });
  const newList = refactorListMovieWithGenre({
    listMovie: data.results,
    genres: generalStore.getMovieGenres,
  });
  listDiscvoverMovie.value = [...newList];
  getListBanner();
}

async function getListBanner() {
  const data = await fetchData(API_TRENDING.all, {
    language: "en-US",
  });
  const newList = refactorListMovieWithGenre({
    listMovie: data.results.slice(0, 5),
    genres: generalStore.getMovieGenres,
  });
  listBanner.value = [...newList];
}

onMounted(() => {
  getListMovie();
});

watch(sortDesc, () => {
  getListMovie();
});

watch(generalStore.getMovieGenres, (val) => {
  const newListBanner = refactorListMovieWithGenre({
    listMovie: listBanner.value,
    genres: val,
  });
  listBanner.value = [...newListBanner];
  const newListDiscover = refactorListMovieWithGenre({
    listMovie: listDiscvoverMovie.value,
    genres: val,
  });
  listDiscvoverMovie.value = [...newListDiscover];
});
</script>
<template>
  <div style="position: relative">
    <section :class="classes.sectionBanner">
      <MSwiperHomeBanner :items="listBanner" />
    </section>
    <section :class="classes.sectionMovieList">
      <div class="container" :class="classes.containerMovieList">
        <div class="mb-11 flex items-end gap-4 justify-between">
          <MTitle text="Discover Movies" />
          <div class="flex gap-5">
            <MButton @click="sortDesc = !sortDesc">
              <span>Popularity</span>
              <div class="relative" style="width: 18px">
                <MIcon
                  name="mdi:chevron-up"
                  size="18px"
                  class="absolute left-0"
                  style="top: -6px"
                  :style="`opacity: ${!sortDesc ? '1' : '.3'}`"
                />
                <br />
                <MIcon
                  name="mdi:chevron-down"
                  size="18px"
                  class="absolute left-0"
                  style="bottom: -6px"
                  :style="`opacity: ${sortDesc ? '1' : '.3'}`"
                />
              </div>
            </MButton>
            <MButton variant="secondary" label="Release Date" />
          </div>
        </div>
        <div
          class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5"
          :class="classes.gridMovie"
        >
          <MCardMovie
            v-for="item in listDiscvoverMovie"
            :key="item.id"
            :id="item.id"
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
.sectionBanner {
  padding-top: 56px;
}
.gridMovie {
  row-gap: 37px;
  column-gap: 25px;
  padding-bottom: 115px;
}
</style>
