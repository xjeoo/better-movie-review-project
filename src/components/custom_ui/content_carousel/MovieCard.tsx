import { posterPath342 } from "@/constants/movies";
import { DiscoverMovie } from "@/types/movies/movies";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MovieCard = ({ movie }: { movie: DiscoverMovie }) => {
  return (
    <Link href={`/movie/${movie.id}`} className="">
      <div className="relative w-[200px] sm:w-[250px] aspect-2/3 select-none rounded-md overflow-hidden md:hover:opacity-90">
        <Image
          src={
            movie.poster_path
              ? posterPath342 + movie.poster_path
              : "/posterplaceholder.svg"
          }
          alt={movie.title}
          sizes="15vw"
          fill
          className="object-fit"
        />
      </div>
    </Link>
  );
};

export default MovieCard;
