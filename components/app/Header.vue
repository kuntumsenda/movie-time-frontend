<script lang="ts" setup>
import { useApi } from "@/composables/useApi";
import { API_SEARCH } from "#build/imports";
import type { ModelMovie } from "~/models/movies";
import type { ModelGenre, ModelMenu } from "~/models/general";

const router = useRouter();
const { fetchData } = useApi();
const generalStore = useGeneralStore();

const navHeader = ref([
  {
    label: "CATEGORIES",
    icon: "mdi:view-grid",
    path: "/movie",
    items: [
      { label: "ACTION" },
      { label: "ADVENTURE" },
      { label: "ANIMATION" },
      { label: "COMEDY" },
      { label: "CRIME" },
      { label: "DOCUMENTARY" },
      { label: "DRAMA" },
      { label: "FAMILY" },
      { label: "FANTASY" },
      { label: "HISTORY" },
      { label: "HOROR" },
    ] as ModelMenu[],
  },
  {
    label: "MOVIES",
    route: "/movie",
  },
  {
    label: "TV SHOWS",
  },
  {
    label: "LOGIN",
  },
] as ModelMenu[]);

const searchMovie = ref("" as string);
const listSearchQuery = ref([] as any[]);
const loading = ref(false as boolean);

async function searchTrendMovieQuery(e: string) {
  loading.value = true;
  const res = await fetchData(API_SEARCH.movie, {
    include_adult: false,
    language: "en-US",
    page: 1,
    query: e,
  });
  if (res.results.length) {
    listSearchQuery.value = res.results.map((x: ModelMovie) => ({
      label: x.title,
      value: x.id,
    }));
    loading.value = false;
    return;
  }
  listSearchQuery.value = [];
  loading.value = false;
}

function onSubmitSearch(e: number) {
  router.push(`/detail/${e}`);
}

function setCategoryItems(list: ModelGenre[]) {
  if (list?.length) {
    navHeader.value[0].items = list.map((x) => ({
      label: x.name,
      value: x.id,
      route: `${navHeader.value[0].path}?genre=[${x.id}]`,
    }));
  }
}

onMounted(() => {
  setCategoryItems(generalStore.getMovieGenres);
});

watch(
  () => generalStore.getMovieGenres,
  (val) => {
    setCategoryItems(val);
  }
);
function onSelectedMenu(val: ModelMenu) {
  if (val.route) router.push(val.route);
}
</script>
<template>
  <header
    :class="classes.mHeader"
    class="fixed top-0 left-0 w-screen flex items-center bg-bgHeader py-4 md:py-0"
  >
    <div class="container md:flex items-center justify-between gap-4">
      <div class="flex items-center gap-9 w-full">
        <img
          src="@/assets/images/MoovieTime-Logo.svg"
          class="cursor-pointer"
          @click="router.push('/')"
        />
        <div :class="classes.searchInput" class="w-full">
          <MAutoComplete
            v-model="searchMovie"
            block
            placeholder="Find Movie"
            :items="listSearchQuery"
            @search="searchTrendMovieQuery"
            @submit="onSubmitSearch"
          >
            <template #prepend>
              <MIcon name="mdi:movie" color="#494c51" />
            </template>
            <template #append>
              <MIcon name="mdi:search" />
            </template>
          </MAutoComplete>
        </div>
      </div>
      <nav class="text-sm mt-5 md:mt-0" :class="classes.navWrapper">
        <ul class="flex items-center gap-1">
          <div v-for="(nav, index) in navHeader" :key="index">
            <li v-if="nav.route">
              <MButton
                text
                variant="darkTextBody"
                class="m-dropdown-button font-normal"
                :label="nav.label"
                @click="router.push(nav.route)"
              />
            </li>
            <li v-else-if="nav.items">
              <MDropdown
                :items="nav.items"
                hideIconChevron
                @selected="onSelectedMenu"
              >
                <template #label>
                  <MIcon v-if="nav.icon" :name="nav.icon" class="text-xl" />
                  <span class="whitespace-nowrap">{{ nav.label }}</span>
                </template>
              </MDropdown>
            </li>
            <li v-else>
              <MButton
                text
                variant="darkTextBody"
                class="m-dropdown-button font-normal whitespace-nowrap"
                :label="nav.label"
              />
            </li>
          </div>
        </ul>
      </nav>
    </div>
  </header>
</template>
<style lang="css" module="classes">
.mHeader {
  height: 108px;
  z-index: 100;
}
@media screen and (min-width: 768px) {
  .mHeader {
    height: 66px;
  }
}

.searchInput {
  max-width: 571px;
}
@media screen and (max-width: 428px) {
  .navWrapper {
    overflow-x: auto;
  }
}
</style>
