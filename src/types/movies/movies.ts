import { ReviewType, userInfo } from "../entites";
import { videoResult } from "../content";

// ...existing code...

export interface ImageType{
  
  backdrops: Array<{
    aspect_ratio: number;
    height: number;
    iso_639_1: string | null;
    file_path: string;
    vote_average: number;
    vote_count: number;
      width: number;
 }>;
  logos: Array<{
    aspect_ratio: number;
   height: number;
    iso_639_1: string | null;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
 }>;
   posters: Array<{
     aspect_ratio: number;
     height: number;
    iso_639_1: string | null;
    file_path: string;
     vote_average: number;
     vote_count: number;
     width: number;
  }>;
};


export interface DiscoverMovie {
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
}

export interface MovieCastMember {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
}

export interface MovieCrewMember {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

export interface MovieData {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime: number;
  vote_average: number;
  genres: Array<{ id: number; name: string }>;
  budget: number;
  revenue: number;
  status: string;
}

export interface Movie {
  data: MovieData;
  images: ImageType,
  video: videoResult[];
  cast: {
    cast: MovieCastMember[];
    crew: MovieCrewMember[];
  };
  directors: MovieCrewMember[];
  recommendations: MovieData[];
  ageRating: string;
}

export interface Rating {
  averageRating: number;
  count: number;
}

export interface MoviesPageDefaultData{
  popular: DiscoverMovie[], 
  top_rated: DiscoverMovie[], 
  upcoming: DiscoverMovie[]
}

export interface MoviePageData {
  movie: Movie;
  rating: Rating;
  user: userInfo | null;
  token: string | null;
  reviews: ReviewType[];
}