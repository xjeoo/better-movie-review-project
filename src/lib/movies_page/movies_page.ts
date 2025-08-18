import { options } from "@/constants/movies";
import { MoviesPageDefaultData } from "@/types/movies/movies";



export async function getDefaultMovies():Promise<MoviesPageDefaultData>{
  const popularUrl = 'https://api.themoviedb.org/3/movie/popular';
  const topRatedUrl = 'https://api.themoviedb.org/3/movie/top_rated';
  const upcomingUrl = 'https://api.themoviedb.org/3/movie/upcoming';

  const [ popularRes, topRatedRes, upcomingRes] = await Promise.all([
    fetch(popularUrl, options),
    fetch(topRatedUrl, options),
    fetch(upcomingUrl, options),
  ]);
  const popular = await popularRes.json();
  const top_rated = await topRatedRes.json();
  const upcoming = await upcomingRes.json();

  return {
    popular: popular.results,
    top_rated: top_rated.results,
    upcoming: upcoming.results,
  }

}