import type { ModelGenre } from "~/models/general";
import type { ModelMovie } from "~/models/movies";

export function filterListByIds(ids: number[], genres: ModelGenre[]) {
  if (genres.length) {
    const filter = genres.filter((x) => ids.includes(x.id));

    return filter;
  }
  return [];
}

export function refactorListMovieWithGenre(
  listMovie: ModelMovie[],
  genres: ModelGenre[]
) {
  if (listMovie.length && genres.length) {
    return listMovie.map((x) => ({
      ...x,
      genres: filterListByIds(x.genre_ids, genres),
    }));
  }
  return listMovie;
}
