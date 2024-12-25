import type { ModelGenre } from "./general";

export type ModelMovie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genres: ModelGenre[];
  status: string;
  spoken_languages: ModelSpokenLang[];
  production_companies: ModelProductionCompany[];
  budget: number;
  first_air_date: string;
  name: string;
};

export type ModelSpokenLang = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type ModelProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type ModelParamMovie = {
  include_adult: boolean;
  include_video: boolean;
  language: string;
  page: number;
  sort_by: string;
  [key: string]: any; // Allow additional properties
};
