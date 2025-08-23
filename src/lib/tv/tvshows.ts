import { TvShowPageData } from "@/types/tvshows/tvshows";
import { getSession, getToken } from "../auth/sessionUtils";
import { getTvShowById } from "../movies/tvshows";
import { getRatingByTvShowId, getReviewsByTvShowId } from "./reviews";
import { SearchResult } from "@/types/search/search";
import { options } from "@/constants/movies";



export async function TvShowSearch(query: string, page?: string):Promise<{results: SearchResult[], total_pages: string}>{
  const url = 'https://api.themoviedb.org/3/search/tv'
  const pageNumber = page || '1';

  const resultsRes = await fetch(url + `?query=${query}&page=${pageNumber}`, options);
  const resultsJson = await resultsRes.json();

  return {
    results: resultsJson.results,
    total_pages: resultsJson.total_pages 
  }
}

export async function getInfoForTvShowPage(showId: string): Promise<TvShowPageData> {
  const [tvShow, rating, reviews, user, token] = await Promise.all([
     getTvShowById(showId),
     getRatingByTvShowId(showId),
     getReviewsByTvShowId(showId),
     getSession(),
     getToken(),
  ]);

  return {
    tvShow,
    rating,
    reviews,
    user,
    token,
  };
}
