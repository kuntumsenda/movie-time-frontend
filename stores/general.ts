import { defineStore } from "pinia";
import type { ModelGenre } from "~/models/general";

export const useGeneralStore = defineStore("generalStore", {
  state: () => ({
    movieGenres: ((): ModelGenre[] => {
      const storedGenres = sessionStorage.getItem("movieGenres");
      return storedGenres ? JSON.parse(storedGenres) : [];
    })(),
  }),
  getters: {
    getMovieGenres: (state) => toRaw(state.movieGenres),
  },
  actions: {
    setMovieGenres(payload: ModelGenre[]) {
      sessionStorage.setItem("movieGenres", JSON.stringify(payload));
      this.movieGenres = payload;
    },
  },
});
