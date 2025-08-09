import { options } from "@/constants/movies";
import { PopularTvShow } from "@/types/home_page/home_page_types";
import { DiscoverMovie } from "@/types/movies/movies";

const TMDB_READ_ACCESS_KEY = process.env.TMDB_READ_ACCESS_KEY;

async function getDiscoverMovies() {
  const url =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_READ_ACCESS_KEY}`,
    },
  };

  try {
    const movies = await fetch(url, options);
    const finalMovies = (await movies.json()).results.slice(0, 10);
    return finalMovies;
  } catch (error) {
    console.log("Error fetching discover movies", error);
    return [];
  }
}

async function getTrendingMovies(): Promise<DiscoverMovie[]> {
  const url = "https://api.themoviedb.org/3/trending/movie/week";
  try {
    const popularMovies = await fetch(url, options);
    const data = await popularMovies.json();
    return data.results.slice(0, 10) || [];
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
}

async function getTrendingTvShows(): Promise<PopularTvShow[]> {
  const url = "https://api.themoviedb.org/3/trending/tv/week";
  try {
    const popularTvShows = await fetch(url, options);
    const data = await popularTvShows.json();
    return data.results.slice(0, 10) || [];
  } catch (error) {
    console.error("Error fetching popular tv shows:", error);
    return [];
  }
}

export async function getInfoForHomePage() {
  const [discover, popularMovies, popularTvShows] = await Promise.all([
    getDiscoverMovies(),
    getTrendingMovies(),
    getTrendingTvShows(),
  ]);

  return {
    discover,
    popularMovies,
    popularTvShows,
  };
}
