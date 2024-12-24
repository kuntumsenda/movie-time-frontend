import type { ModelGenre } from "~/models/general";

export function number1Comma(val: number) {
  return val.toFixed(1);
}

export function onlyYear(val: string) {
  if (val) {
    const split = val.split("-");
    return split[0];
  }
  return "";
}

export function genreDisplay(genres: ModelGenre[], isOne: boolean) {
  if (genres.length) {
    const list = isOne ? genres.slice(0, 1) : genres;
    return list.map((x) => x.name).join(", ");
  }
  return "";
}
