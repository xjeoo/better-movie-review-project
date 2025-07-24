import { months } from "@/constants/movies";
import { getSession, getToken } from "../auth/sessionUtils";
import { getRatingByMovieId, getReviewsByMovieId } from "./reviews";

const TMDB_READ_ACCESS_KEY = process.env.TMDB_READ_ACCESS_KEY;

export async function getDiscoverMovies() {
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
    const finalMovies = (await movies.json()).results.slice(0, 10); // daca le vreau pe toate 20 returnez doar movies.json()
    return finalMovies; // si dupa sa modific sa fie si .results in
  } catch (error) {
    console.log("Error fetching discover movies", error);
  }
}

export function formatDate(date: string) {
  const newDate = date.split("-");
  const year = newDate[0];
  const monthKey = newDate[1] as keyof typeof months;
  const month = months[monthKey];
  const day = parseInt(newDate[2]);

  return `${day} ${month} ${year}`;
}

type videoResult = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number | string;
  type: string;
  official: true;
  published_at: string | Date;
};

export async function getMovieById(movieId: string) {
  const videoUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
  const infoUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
  const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const recommendationsUrl = `https://api.themoviedb.org/3/movie/${movieId}/recommendations`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_READ_ACCESS_KEY}`,
    },
  };

  const [detailsRes, videosRes, castRes, recommendationsRes] = await Promise.all([
    fetch(infoUrl, options),
    fetch(videoUrl, options),
    fetch(castUrl, options),
    fetch(recommendationsUrl, options),
  ]);
  if (!detailsRes.ok) console.log("Failed fetching movie details");
  if (!videosRes.ok) console.log("Failed fetching movie videos");

  const trailers = (await videosRes.json()).results.filter(
    (video: videoResult) =>
      video.name.toLowerCase().includes("trailer") &&
      video.site.toLowerCase().includes("youtube")
  );

  const cast = await castRes.json();
  const recommendations = await recommendationsRes.json();

  const directors = cast.crew.filter((dude: any) => dude.job === "Director");

  const movieInfo = {
    data: await detailsRes.json(),
    video: trailers,
    cast: cast,
    directors: directors,
    recommendations: recommendations.results.slice(0, 10),
  };

  return movieInfo;
}

export async function getInfoForMoviePage(movieId: string) {
  const [movie, rating, user, token, reviews] = await Promise.all([
    await getMovieById(movieId),
    await getRatingByMovieId(movieId),
    await getSession(),
    await getToken(),
    await getReviewsByMovieId(movieId),
  ]);

  return {
    movie,
    rating,
    user,
    token,
    reviews,
  };
}
