import { getSession, getToken } from "../auth/sessionUtils";
import { getTvShowById } from "../movies/tvshows";
import { getRatingByTvShowId, getReviewsByTvShowId } from "./reviews";



export async function getInfoForTvShowPage(showId: string) {
  const [tvShow, rating, reviews, user, token] = await Promise.all([
    await getTvShowById(showId),
    await getRatingByTvShowId(showId),
    await getReviewsByTvShowId(showId),
    await getSession(),
    await getToken(),
  ]);

  return {
    tvShow,
    rating,
    reviews,
    user,
    token,
  };
}
