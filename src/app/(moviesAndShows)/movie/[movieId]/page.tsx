import CastCarousel from "@/components/custom_ui/cast_carousel/CastCarousel";
import CrewCarousel from "@/components/custom_ui/crew_carousel/CrewCarousel";
import SimilarCarousel from "@/components/custom_ui/similar_carousel/RecommendationCarousel";
import WatchlistButton from "@/components/watchlist/WatchlistButton";
import CreateReview from "@/components/reviews/CreateReview";
import ReviewSection from "@/components/reviews/ReviewSection";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { backDropPath720, starColor } from "@/constants/movies";
import { formatDate, getInfoForMoviePage } from "@/lib/movies/movies";
import {
  Calendar,
  Clapperboard,
  Clock,
  Star,
  StarHalf,
  Video,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { existsInWatchlist } from "@/lib/user/watchlist";

const MoviePage = async ({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) => {
  const { movieId } = await params;
  const youtubeUrl = "https://www.youtube.com/embed/";

  const { movie, rating, user, token, reviews } = await getInfoForMoviePage(
    movieId
  );

  const addedToWatchList = await existsInWatchlist(
    movieId,
    user?.userId.toString(),
    "movie"
  );

  return (
    <div className="flex flex-col w-full h-full pb-20 bg-black">
      <div className="relative">
        <div className="absolute h-[10%] w-full bg-gradient-to-b from-black/90 to-transparent"></div>
        <div className="absolute h-full w-full flex justify-center items-center ">
          <Image
            src={backDropPath720 + movie.data.backdrop_path}
            alt="backdrop"
            fill
            sizes="100vw"
            loading="eager"
            priority={true}
            className="relative object-cover blur-xs"
          />
          <div className="absolute -top-5 h-[25%] w-full bg-gradient-to-b from-black to-transparent"></div>
          <div className="absolute -bottom-5 h-[25%] w-full bg-gradient-to-t from-black to-transparent"></div>
        </div>

        <main className="relative xl:border-x-1 border-x-neutral-500 backdrop-blur-md px-2 md:px-0 w-full xl:w-[70%] bg-black/70 md:bg-black/80 pt-15 -mt-1 pb-10 z-10 mx-auto text-shadow-2xs text-shadow-black ">
          <div className="flex flex-col items-center lg:flex-row gap-10 md:gap-5 px-2 md:px-2 xl:px-6">
            <div className="flex flex-col gap-2 items-center md:items-start w-full md:w-[80%] lg:w-[55%] text-neutral-200">
              <div>
                <h2 className="text-4xl text-white md:text-5xl font-semibold text-center mb-2">
                  {movie.data.title}
                </h2>
              </div>
              <div className="flex gap-3">
                <span className="flex gap-1.5 items-center">
                  <Calendar className="flex " />{" "}
                  {formatDate(movie.data.release_date)}
                </span>
                {movie.data.runtime > 0 && (
                  <span className="flex gap-1.5 items-center">
                    <Clock />
                    {movie.data.runtime}m
                  </span>
                )}
              </div>
              <div className="flex flex-wrap justify-center md:justify-start w-full md:w-[75%] gap-1 ">
                {movie.data.genres.map(
                  (genre: { id: number; name: string }, index: number) => (
                    <Badge
                      key={index}
                      variant={"outline"}
                      className="text-[0.9em] text-white h-fit"
                    >
                      {genre.name}
                    </Badge>
                  )
                )}
              </div>
              {rating.averageRating ? (
                <div className="flex gap-1.5 mt-4 items-center text-xl">
                  {/*------ASTA O SA O SEPAR INTR-O COMPONENTA------- */}
                  <span className="flex text-xl">
                    {Array.from({ length: parseInt(rating.averageRating) }).map(
                      //map for full stars
                      (_, index) => (
                        <Star key={index} fill={starColor} color={starColor} />
                      )
                    )}
                    {Array.from({
                      // map for decimal part with half star
                      length:
                        parseFloat(rating.averageRating) -
                          parseInt(rating.averageRating) >
                        0.25
                          ? 1
                          : 0,
                    }).map((_, index) => (
                      <span className="relative" key={index}>
                        <Star
                          color={starColor}
                          className="absolute top-0 left-0"
                        />
                        <StarHalf
                          fill={starColor}
                          color={starColor}
                          className="absolute top-0 left-0 "
                        />
                      </span>
                    ))}
                    {Array.from({
                      // map for remaining empty stars
                      length: 5 - Math.floor(rating.averageRating),
                    }).map((_, index) => (
                      <Star key={index} color={starColor} />
                    ))}
                  </span>
                  {/*" old star color: #b6c1d4" */}
                  {parseFloat(rating.averageRating).toFixed(1) || "none"}/5
                </div>
              ) : (
                <span className="text-xl">-Not rated yet-</span>
              )}
              <WatchlistButton
                token={token}
                contentId={movieId}
                userId={user?.userId.toString()}
                type="movie"
                isAdded={addedToWatchList}
              />
              <div>
                <h3 className="text-xl md:text-2xl w-full text-white mt-10">
                  Overview
                </h3>
                <p className="text-[1.05em]">{movie.data.overview}</p>
              </div>
              {movie.directors.length > 0 && (
                <>
                  <Separator className="bg-neutral-400 my-5" />
                  <div className="flex items-baseline flex-wrap gap-2 w-full">
                    <h3 className="w-fit text-xl md:text-2xl text-white">
                      Director:
                    </h3>
                    <span className="flex items-center">
                      {movie.directors.map((director: any, index: number) => (
                        <span key={index} className="text-xl">
                          {director.name}
                          {movie.directors.length > 1 &&
                            movie.directors[index + 1] &&
                            ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className="w-full md:w-[80%] lg:w-[55%]  flex justify-center items-center">
              <iframe
                src={youtubeUrl + movie.video[0]?.key}
                className="w-full aspect-video rounded-md border-1 border-neutral-500"
              ></iframe>
            </div>
          </div>
        </main>
      </div>
      <div className="relative xl:border-x-1 border-x-neutral-500 px-2 md:px-6 w-full xl:w-[70%] pt-15 z-10 mx-auto text-shadow-2xs text-shadow-black md:rounded-b-md">
        <div className="flex flex-col gap-15">
          <div>
            <h3 className="flex gap-2 items-center text-2xl md:text-4xl text-white mb-10">
              <Clapperboard className="size-8" />
              <span>Cast</span>
            </h3>
            <div className="w-[90%] mx-auto flex flex-col">
              <CastCarousel info={movie.cast.cast.slice(0, 20)} />
            </div>
          </div>
          <div>
            <h3 className="flex gap-2 text-2xl md:text-4xl text-white items-center mb-10">
              <Video className="size-8" />

              <p>Crew</p>
            </h3>
            <div className="w-[90%] mx-auto flex flex-col">
              <CrewCarousel info={movie.cast.crew.slice(0, 20)} />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <h3 className="flex gap-2 items-center text-2xl md:text-4xl text-white mb-10">
              You might also like:
            </h3>
            <div className="mx-auto w-[90%]">
              <SimilarCarousel info={movie.recommendations} />
            </div>
          </div>

          <Separator className="bg-neutral-300 my-10" />
          <div className="w-full">
            <CreateReview movieId={movie.data.id} user={user} />
          </div>
          <ReviewSection
            movieId={movie.data.id}
            reviews={reviews}
            token={token}
            user={user}
          />
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
