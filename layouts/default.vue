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
function handleScroll(e?: any) {
  const header = document.querySelector("#header");
  if (window.scrollY > 50) header?.classList.add("bg-darkBgPrimary");
  else header?.classList.remove("bg-darkBgPrimary");
}
onMounted(() => {
  if (!generalStore.getMovieGenres?.length) getMovieGenres();
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<template>
  <div>
    <AppHeader id="header" />
    <main :class="classes.mainContainer">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
<style lang="css" module="classes">
.mainContainer {
  margin-top: 108px;
  min-height: calc(100vh - 268px);
}
@media screen and (min-width: 768px) {
  .mainContainer {
    margin-top: 66px;
  }
}
</style>
