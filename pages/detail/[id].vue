<script lang="ts" setup>
import { useApi } from "@/composables/useApi";
import { filterListByIds } from "@/composables/filter";
import { API_DISCOVER } from "@/utils/api";
import type { ModelMovie } from "@/models/movie";
import type { ModelGenre } from "@/models/general";
import { useGeneralStore } from "@/stores/general";

definePageMeta({
  validate: async (route) => {
    const valid = ["movie", "tv"];
    return valid.includes(route.params.nav);
  },
});
const route = useRoute();
const { fetchData } = useApi();
const generalStore = useGeneralStore();

const pageInfo = [
  {
    key: "movie",
    title: "Movies",
  },
  {
    key: "tv",
    title: "TV Shows",
  },
] as { key: string; title: string }[];

const pageTitle = computed(() => {
  return pageInfo.find((x) => x.key === route.params.nav).title;
});

const totalPage = ref(1 as number);
const page = ref(1 as number);
const sortBy = "popularity" as string;
const sortDesc = ref(true as boolean);
const listMovies = ref([] as ModelMovie[]);
const genreList = ref([] as ModelGenre);

function refactorWithGenres(list: ModelMovie[]) {
  if (list.length && generalStore.getMovieGenres.length) {
    return list.map((x) => ({
      ...x,
      genres: filterListByIds(x.genre_ids, generalStore.getMovieGenres),
    }));
  }
  return list;
}

async function getListMovie() {
  const data = await fetchData(API_DISCOVER.movie, {
    include_adult: false,
    include_video: false,
    language: "en-US",
    page: page.value,
    sort_by: sortDesc.value ? `${sortBy}.desc` : `${sortBy}.asc`,
  });
  totalPage.value = data.total_pages;
  const newList = refactorWithGenres(data.results);
  if (page.value === 1) listMovies.value = [...newList];
  else listMovies.value = [...listMovies.value, ...newList];
}

const title = onMounted(() => {
  getListMovie();
  if (route.params.nav === "movie") {
    genreList.value = generalStore.getMovieGenres.map((x) => ({
      ...x,
      selected: false,
    }));
  }
});

watch(sortDesc, () => {
  getListMovie();
});

watch(generalStore.getMovieGenres, () => {
  if (page > 1) return false;
  const newListDiscover = refactorMovieList(listMovies.value);
  listMovies.value = [...newListDiscover];
});

async function loadMoreHandle() {
  if (page.value + 1 >= totalPage.value) return false;
  await page.value++;
  getListMovie();
}
</script>
<template>
  <div style="position: relative">
    <section :class="classes.sectionMovieList">
      <div class="container" :class="classes.containerMovieList">
        <div class="mb-11 flex items-end gap-4 justify-between">
          <MTitle :text="pageTitle" />
        </div>
        <div class="flex gap-7">
          <div :class="classes.sortCard" class="h-fit">
            <div class="font-semibold px-4 py-5">Sort Result By</div>
            <div class="px-4 py-5">
              <MInput placeholder="Popularity" />
            </div>
            <div class="font-semibold px-4 py-5">Genres</div>
            <div class="px-4 py-5">
              <span v-for="gen in genreList" :key="gen.id" class="block">{{
                gen.name
              }}</span>
            </div>
          </div>
          <div :class="classes.movieWrap" class="w-full">
            <div
              class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-5 gap-y-6"
            >
              <MCardMovie
                v-for="item in listMovies"
                :key="item.id"
                :posterPath="item.poster_path"
                :releaseDate="item.release_date"
                :rate="item.vote_average"
                :title="item.title"
                :genres="item.genres"
              />
            </div>
            <div v-if="page + 1 < totalPage" :class="classes.btnLoad">
              <MButton
                label="Load More"
                class="mx-auto"
                @click="loadMoreHandle()"
              />
            </div>
          </div>
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
</style>
