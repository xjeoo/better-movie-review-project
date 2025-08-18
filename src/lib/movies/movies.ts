import { ImageType, Movie, MovieCrewMember, MoviePageData } from "@/types/movies/movies";
import { getSession, getToken } from "../auth/sessionUtils";
import { getRatingByMovieId, getReviewsByMovieId } from "./reviews";
import { videoResult } from "@/types/content";
import { SearchResult } from "@/types/search/search";
import { options } from "@/constants/movies";

const TMDB_READ_ACCESS_KEY = process.env.TMDB_READ_ACCESS_KEY;



export async function getMovieById(movieId: string): Promise<Movie> {
  const videoUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
  const releaseDatesURL = `https://api.themoviedb.org/3/movie/${movieId}/release_dates`
  const infoUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
  const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const recommendationsUrl = `https://api.themoviedb.org/3/movie/${movieId}/recommendations`;
  const imageUrl = `https://api.themoviedb.org/3/movie/${movieId}/images`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_READ_ACCESS_KEY}`,
    },
  };

  const [detailsRes,imageRes, videosRes, castRes, recommendationsRes, releaseDatesRes] = await Promise.all([
    fetch(infoUrl, options),
    fetch(imageUrl, options),
    fetch(videoUrl, options),
    fetch(castUrl, options),
    fetch(recommendationsUrl, options),
    fetch(releaseDatesURL, options),
  ]);
  if (!detailsRes.ok) console.log("Failed fetching movie details");
  if (!videosRes.ok) console.log("Failed fetching movie videos");

  const imagesJson: ImageType = await imageRes.json() || [];
  const backdrops = imagesJson ? imagesJson.backdrops.slice(0,50): [];
  const logos = imagesJson.logos ? imagesJson.logos.slice(0,50): [];
  const posters = imagesJson ? imagesJson.posters.slice(0,50) : [];
  const images = {
    backdrops,
    logos,
    posters,
  }

  const videos = await videosRes.json();
  const officialTrailers = videos.results.filter(
    (video: videoResult) =>
      video.name.toLowerCase().includes("trailer") &&
      video.name.toLowerCase().includes("official")&&
      video.site.toLowerCase().includes("youtube")
  );
  const finalTrailers = officialTrailers.length === 0 ? videos.results.filter(
    (video: videoResult) =>
      video.name.toLowerCase().includes("trailer") &&
      video.site.toLowerCase().includes("youtube") 
  ) : officialTrailers;

  const releaseDates = await releaseDatesRes.json();
  const usCertifications = releaseDates.results.find((r: {iso_3166_1: string, release_dates: Array<{certification: string}>}) => r.iso_3166_1 === "US");
  const cert = usCertifications?.release_dates.find((r: {certification: string}) => r.certification)?.certification;
  let ageRatingValue = cert || "N/A";
  if (!ageRatingValue) {
    const alt = releaseDates.results.find((r: {iso_3166_1: string, release_dates: Array<{certification: string}>}) =>
      r.release_dates.find((r2: {certification: string}) => r2.certification !== "")
    );
    ageRatingValue = alt?.release_dates.find((r: {certification: string}) => r.certification)?.certification || "N/A";
  }


  const cast = await castRes.json();
  const recommendations = await recommendationsRes.json();

  const directors = cast.crew.filter((dude: MovieCrewMember) => dude.job === "Director");

  const finalReccomendations = recommendations.results && recommendations.results.length > 0 ? recommendations.results.slice(0, 10) : []

  const movieInfo = {
    data: await detailsRes.json(),
    images: images,
    video: finalTrailers,
    cast: cast,
    directors: directors,
    recommendations: finalReccomendations,
    ageRating: ageRatingValue
  };

  return movieInfo;
}

export async function MovieSearch(query: string, page?: string):Promise<{results: SearchResult[], total_pages: string}>{
  const url = 'https://api.themoviedb.org/3/search/movie'
  const pageNumber = page || '1';

  const resultsRes = await fetch(url + `?query=${query}&page=${pageNumber}`, options);
  const resultsJson = await resultsRes.json();

  return {
    results: resultsJson.results,
    total_pages: resultsJson.total_pages 
  }
}

export async function getInfoForMoviePage(movieId: string): Promise<MoviePageData> {
  const [movie, rating, user, token, reviews] = await Promise.all([
    getMovieById(movieId),
    getRatingByMovieId(movieId),
    getSession(),
    getToken(),
    getReviewsByMovieId(movieId),
  ]);

  return {
    movie,
    rating,
    user,
    token,
    reviews,
  };
}
