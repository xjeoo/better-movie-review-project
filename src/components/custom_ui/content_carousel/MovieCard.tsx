import { posterPath342 } from "@/constants/movies";
import { cn } from "@/lib/utils";
import { DiscoverMovie } from "@/types/movies/movies";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MovieCard = ({ movie }: { movie: DiscoverMovie }) => {
  return (
    <Link href={`/movie/${movie.id}`} className="">
      <div className="relative w-[150px] sm:w-[220px] aspect-2/3 select-none rounded-md overflow-hidden md:hover:opacity-90">
        <div
          className={cn(
            "hidden absolute bottom-0 w-full text-center text-xl bg-gray-600 opacity-60",
            !movie.poster_path && "block z-10"
          )}
        >
          {movie.title}
        </div>
        <Image
          src={
            movie.poster_path
              ? posterPath342 + movie.poster_path
              : "/posterplaceholder.svg"
          }
          alt={movie.title}
          sizes="15vw"
          fill
          className={cn(!movie.poster_path && "object-cover")}
        />
      </div>
    </Link>
  );
};

export default MovieCard;
