import type { ModelGenre } from "~/models/general";

export function filterListByIds(ids: number[], genres: ModelGenre[]) {
  if (genres.length) {
    const filter = genres.filter((x) => ids.includes(x.id));

    return filter;
  }
  return [];
}
