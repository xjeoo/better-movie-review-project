export interface PersonData {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
  credits: {
    cast: {
      adult: boolean;
      backdrop_path: string | null;
      genre_ids: number[];
      id: number;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string | null;
      release_date: string;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
      character: string;
      credit_id: string;
      order: number;
    }[];
    crew: {
      adult: boolean;
      backdrop_path: string | null;
      genre_ids: number[];
      id: number;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string | null;
      release_date: string;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
      credit_id: string;
      department: string;
      job: string;
    }[];
  };
}

export interface CombinedCredit {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  character?: string;
  credit_id: string;
  order?: number;
  media_type: "movie" | "tv";
  department?: string;
  job?: string;
}

export interface CombinedCredits {
  cast: CombinedCredit[];
  crew: CombinedCredit[];
}