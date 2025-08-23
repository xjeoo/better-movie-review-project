import { options } from "@/constants/movies";
import { TvShowsPageDefaultData } from "@/types/tvshows/tvshows";



export async function getDefaultTvShows():Promise<TvShowsPageDefaultData>{
  const onTheAirUrl = 'https://api.themoviedb.org/3/tv/on_the_air';
  const popularUrl = 'https://api.themoviedb.org/3/tv/popular';
  const topRatedUrl = 'https://api.themoviedb.org/3/tv/top_rated';

  const [ onTheAirRes, popularRes, topRatedRes] = await Promise.all([
    fetch(onTheAirUrl, options),
    fetch(popularUrl, options),
    fetch(topRatedUrl, options),
  ]);
  const on_the_air = await onTheAirRes.json();
  const popular = await popularRes.json();
  const topRated = await topRatedRes.json();

  return {
    on_the_air: on_the_air.results,
    popular: popular.results,
    top_rated: topRated.results,
  }

}