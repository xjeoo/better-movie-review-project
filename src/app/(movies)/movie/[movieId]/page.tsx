import CastCarousel from "@/components/cast_carousel/CastCarousel";
import CrewCarousel from "@/components/custom_ui/crew_carousel/CrewCarousel";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { backDropPath1080, backDropPath720 } from "@/constants/movies";
import { formatDate, getMovieById } from "@/lib/movies/movies";
import { Calendar, Clapperboard, Clock, Star, Video } from "lucide-react";
import Image from "next/image";
import React from "react";

const MoviePage = async ({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) => {
  const { movieId } = await params;
  const youtubeUrl = "https://www.youtube.com/embed/";
  const starColor = "#5f9beb";

  const movie = await getMovieById(movieId);

  console.log(movie);

  return (
    <div className="flex flex-col w-full h-full pb-20 bg-black">
      <div className="relative">
        <div className="absolute h-[10%] w-full bg-gradient-to-b from-black/90 to-transparent"></div>
        <div className="absolute h-full w-full flex justify-center items-center ">
          <Image
            src={backDropPath1080 + movie.data.backdrop_path}
            alt="backdrop"
            fill
            loading="eager"
            className="relative object-cover blur-xs"
          />
          <div className="absolute -top-5 h-[25%] w-full bg-gradient-to-b from-black to-transparent"></div>
          <div className="absolute -bottom-5 h-[25%] w-full bg-gradient-to-t from-black to-transparent"></div>
        </div>

        <main className="relative md:border-x-1 border-x-neutral-500 backdrop-blur-md px-2 md:px-0 w-full md:w-[80%] lg:w-[70%] bg-black/70 md:bg-black/80 pt-15 pb-10 z-10 mx-auto text-shadow-2xs text-shadow-black ">
          <div className="flex flex-col items-center lg:flex-row gap-10 md:gap-5 px-2 md:px-6">
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
                <span className="flex gap-1.5 items-center">
                  <Clock />
                  {movie.data.runtime}m
                </span>
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
              <div className="flex gap-1.5 mt-4 items-center text-xl">
                {/*------ASTA O SA O SEPAR INTR-O COMPONENTA------- */}
                <span className="flex text-xl">
                  {Array.from({ length: 5 }).map((star, index) => (
                    <Star key={index} fill={starColor} color={starColor} />
                  ))}
                </span>{" "}
                5.0/5.0
              </div>
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
                        </span>
                      ))}
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className="w-full md:w-[80%] lg:w-[55%]  flex justify-center items-center">
              <iframe
                src={youtubeUrl + movie.video[0].key}
                className="w-full aspect-video rounded-md border-1 border-neutral-500"
              ></iframe>
            </div>
          </div>
        </main>
      </div>
      <div className="relative md:border-x-1 border-x-neutral-500 px-2 md:px-6 w-full md:w-[80%] lg:w-[70%] pt-15 z-10 mx-auto text-shadow-2xs text-shadow-black md:rounded-b-md">
        <div className="flex flex-col gap-15">
          <div>
            <h3 className="flex gap-2 items-center text-2xl md:text-4xl text-white mb-10">
              <Clapperboard className="size-8" />
              <span>Cast</span>
            </h3>
            <div className="w-[90%] mx-auto flex flex-col">
              <CastCarousel info={movie.cast.cast.slice(0, 50)} />
            </div>
          </div>
          <div>
            <h3 className="flex gap-2 text-2xl md:text-4xl text-white mb-10">
              <Video className="size-8" />

              <p>Crew</p>
            </h3>
            <div className="w-[90%] mx-auto flex flex-col">
              <CrewCarousel info={movie.cast.crew.slice(0, 50)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
