import { TvShowPageData } from "@/types/tvshows/tvshows";
import { getSession, getToken } from "../auth/sessionUtils";
import { getTvShowById } from "../movies/tvshows";
import { getRatingByTvShowId, getReviewsByTvShowId } from "./reviews";

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
