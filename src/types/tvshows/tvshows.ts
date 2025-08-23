import { ReviewType, userInfo } from "../entites";
import { videoResult, tvShowSeason } from "../content";
import { ImageType, Rating } from "../movies/movies";
import { PopularTvShow } from "../home_page/home_page_types";

export interface TvShowCastMember {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
}

export interface TvShowCrewMember {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}
export interface TvShowData {
  id: string;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  last_air_date: string;
  episode_run_time: number[];
  number_of_episodes: number;
  number_of_seasons: number;
  vote_average: number;
  genres: Array<{ 
    id: string; 
    name: string 
  }>;
  status: string;
  seasons: tvShowSeason[];
  created_by: Array<{
    id: number;
    name: string;
    profile_path: string | null;
    credit_id: string;
    gender: number;
  }>;
  networks: Array<{
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }>;
  production_companies: Array<{
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }>;
  in_production: boolean;
  languages: string[];
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    air_date: string;
    episode_number: number;
    season_number: number;
    still_path: string | null;
  } | null;
  next_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    air_date: string;
    episode_number: number;
    season_number: number;
    still_path: string | null;
  } | null;
  type: string;
  tagline: string;
  origin_country: string[];
}

export interface TvShow {
  data: TvShowData;
  images: ImageType;
  video: videoResult[];
  cast: {
    cast: TvShowCastMember[];
    crew: TvShowCrewMember[];
  };
  recommendations: TvShowData[];
  ageRating: string;
}

export interface TvShowPageData {
  tvShow: TvShow;
  rating: Rating;
  user: userInfo | null;
  token: string | null;
  reviews: ReviewType[];
}

export interface TvShowsPageDefaultData{
  on_the_air: PopularTvShow[], 
  popular:  PopularTvShow[], 
  top_rated:PopularTvShow[],
}