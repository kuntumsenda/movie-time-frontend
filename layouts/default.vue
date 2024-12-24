<script setup lang="ts">
import { useApi } from "@/composables/useApi";
import { API_GENRES } from "@/utils/api";
import { useGeneralStore } from "@/stores/general";

const { fetchData } = useApi();
const generalStore = useGeneralStore();

async function getMovieGenres() {
  const data = await fetchData(API_GENRES.movie, {
    language: "en-US",
  });
  generalStore.setMovieGenres(data.genres);
}

onMounted(() => {
  if (!generalStore.getMovieGenres.length) getMovieGenres();
});
</script>
<template>
  <div>
    <AppHeader />
    <main :class="classes.mainContainer">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
<style lang="css" module="classes">
.mainContainer {
  margin-top: 66px;
  min-height: calc(100vh - 226px);
}
</style>
