import React from "react";
import { Card, CardContent } from "../../ui/card";
import Image from "next/image";
import Link from "next/link";
import genres from "@/constants/genres";
import GenrePill from "../GenrePill";
import { backDropPath1080 } from "@/constants/movies";

const CarouselCard = ({
  movie,
  index,
  maxLength = 20,
}: {
  movie: any;
  index: number;
  maxLength: number;
}) => {
  return (
    <Card className="!p-0 items-center bg-dark-transparent border-0">
      <CardContent className="flex w-full h-fit justify-center items-center !px-0  ">
        <div className="relative w-full h-[900px] sm:h-[1080px] items-center justify-center overflow-hidden select-none">
          <Image
            src={backDropPath1080 + movie.backdrop_path}
            alt={movie.title}
            fill
            loading={index === 0 ? "eager" : "lazy"}
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute bg-gradient-to-r from-gray-900 to-transparent h-full w-full "></div>
          <div className="sm:hidden flex absolute bg-gradient-to-l from-gray-900 to-transparent h-full w-full "></div>
          <div className="absolute bg-gradient-to-t from-black to-transparent h-full w-full "></div>
          <div className="z-20 absolute left-[5%] bottom-[35%]">
            <div className="flex flex-col max-w-full sm:max-w-[55vw] gap-4 ">
              <h2 className="text-3xl sm:text-6xl font-semibold text-white text-pretty">
                {movie.title}
              </h2>
              <span className="text-neutral-200 text-[1.15em]">
                {movie.release_date.split("-")[0]}
              </span>
              <div className="flex flex-wrap basis-[100%]  gap-3">
                {movie.genre_ids.map((genre: number, index: number) => (
                  <GenrePill key={index} text={genres.get(genre)} />
                ))}
              </div>

              <p className="hidden sm:flex text-[1.1em] max-w-[80%] sm:ellipsis text-neutral-300 ">
                {movie.overview}
              </p>
              <Link
                href={`/movie/${movie.id}`}
                className="py-1.5 px-5 w-fit text-2xl bg-blue-primary-darker text-white rounded-md mt-6 hover:bg-blue-primary-darker-100"
              >
                View
              </Link>
            </div>
          </div>
          {/* <Progress
            value={Math.ceil(100 * ((index + 1) / maxLength))}
            className="absolute bottom-[20%] lg:w-[30%] left-1/2 -translate-x-1/2 "
          /> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default CarouselCard;
