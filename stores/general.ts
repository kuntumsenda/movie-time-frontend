import { defineStore } from "pinia";
import type { ModelGenre } from "~/models/general";

export const useGeneralStore = defineStore("generalStore", {
  state: () => ({
    movieGenres: JSON.parse(
      sessionStorage.getItem("movieGenres") || "[]"
    ) as ModelGenre[],
  }),
  getters: {
    getMovieGenres: (state) => state.movieGenres,
  },
  actions: {
    setMovieGenres(payload: ModelGenre[]) {
      sessionStorage.setItem("movieGenres", JSON.stringify(payload));
    },
  },
});
