<script lang="ts" setup>
import { useApi } from "@/composables/useApi";
import { API_DISCOVER } from "@/utils/api";
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useGeneralStore } from "@/stores/general";
import type { ModelMovie, ModelParamMovie } from "~/models/movies";
import type { ModelGenre, ModelMenu } from "@/models/general";
import { refactorListMovieWithGenre } from "#build/imports";

definePageMeta({
  validate: async (route) => {
    const valid = ["movie", "tv"];
    const nav = Array.isArray(route.params.nav)
      ? route.params.nav[0]
      : route.params.nav;
    return valid.includes(nav);
  },
});

const route = useRoute();
const router = useRouter();
const { fetchData } = useApi();
const generalStore = useGeneralStore();

const pageInfo = [
  { key: "movie", title: "Movies" },
  { key: "tv", title: "TV Shows" },
] as { key: string; title: string }[];

const pageTitle = computed(() => {
  return pageInfo.find((x) => x.key === route.params.nav)?.title ?? "Unknown";
});

const totalPage = ref(1);
const page = ref(1);
const sortDesc = ref(true);
const listMovies = ref<ModelMovie[]>([]);
const genreList = ref<ModelGenre[]>([]);
const loading = ref(false as boolean);

function setListDiscover(list: ModelMovie[], genres: ModelGenre[]) {
  const newList = refactorListMovieWithGenre(list, genres);

  if (page.value === 1) {
    listMovies.value = [...newList];
  } else {
    listMovies.value = [...listMovies.value, ...newList];
  }
}

async function getListMovie() {
  if (loading.value) return false;
  loading.value = true;
  let params = {
    include_adult: false,
    include_video: false,
    language: "en-US",
    page: page.value,
    sort_by: sortBy.value,
  } as ModelParamMovie;
  if (route.query.genre) {
    const genres = JSON.parse(route.query.genre as string);
    if (Array.isArray(genres)) {
      params["with_genres"] = genres.join("|");
    }
  }
  const data = await fetchData(API_DISCOVER.movie, params);

  totalPage.value = data.total_pages;
  setListDiscover(data.results, generalStore.getMovieGenres);
  loading.value = false;
}

onMounted(() => {
  getListMovie();
  // const genreSelected = route.query.genre
  //   ? JSON.parse(route.query.genre as string)
  //   : [];
  setSelectedGenres();
  // if (route.params.nav === "movie") {
  //   genreList.value = generalStore.getMovieGenres.map((x) => ({
  //     ...x,
  //     selected: genreSelected.length ? genreSelected.includes(x.id) : false,
  //   }));
  // }
});

function setSelectedGenres() {
  const genreSelected = route.query.genre
    ? JSON.parse(route.query.genre as string)
    : [];
  if (route.params.nav === "movie") {
    genreList.value = generalStore.getMovieGenres.map((x) => ({
      ...x,
      selected: genreSelected.length ? genreSelected.includes(x.id) : false,
    }));
  }
}

watch(sortDesc, () => {
  getListMovie();
});

watch(
  () => generalStore.getMovieGenres,
  (val) => {
    if (page.value > 1) return;
    setListDiscover(listMovies.value, val);
  }
);

async function loadMoreHandle() {
  if (page.value + 1 >= totalPage.value) return;
  page.value++;
  await getListMovie();
}

function changeGenreHandle() {
  const query = genreList.value.filter((x) => x.selected)?.map((y) => y.id);
  router.push({ name: "nav", query: { genre: JSON.stringify(query) } });
}

watch(
  () => route.query.genre,
  () => {
    page.value = 1;
    setTimeout(() => {
      getListMovie();
      setSelectedGenres();
    }, 300);
  }
);

const sortOptions = [
  {
    label: "Popularity Ascending",
    value: "popularity.asc",
  },
  {
    label: "Popularity Descending",
    value: "popularity.desc",
  },
  {
    label: "Release Date Ascending",
    value: "release_date.asc",
  },
  {
    label: "Release Date Ascending",
    value: "release_date.asc",
  },
  {
    label: "Rating Ascending",
    value: "rating.asc",
  },
  {
    label: "Rating Ascending",
    value: "rating.asc",
  },
] as ModelMenu[];

const sortBy = computed({
  get() {
    return route.query.sortBy || "";
  },
  set(newVal) {
    page.value = 1;
    router.push({
      name: "nav",
      query: { ...route.query, sortBy: newVal },
    });
    getListMovie();
  },
});
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
              <MSelect
                v-model="sortBy"
                placeholder="Popularity"
                variant="dark"
                :options="sortOptions"
              />
            </div>
            <div class="font-semibold px-4 py-5">Genres</div>
            <div class="px-4 py-5 flex flex-col gap-3">
              <MCheckbox
                v-for="(gen, index) in genreList"
                v-model="gen.selected"
                :key="gen.id"
                :labelLeft="gen.name"
                isLabelLeft
                style="margin: -4px"
                @change="changeGenreHandle"
              />
            </div>
          </div>
          <div :class="classes.movieWrap" class="w-full">
            <div
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-6"
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
