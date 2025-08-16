import { posterPath342 } from "@/constants/movies";
import { PopularTvShow } from "@/types/home_page/home_page_types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TvShowCard = ({ tvshow }: { tvshow: PopularTvShow }) => {
  return (
    <Link href={`/tv/${tvshow.id}`} className="">
      <div className="relative w-[150px] sm:w-[220px] aspect-2/3 select-none rounded-md overflow-hidden md:hover:opacity-90">
        <Image
          src={
            tvshow.poster_path
              ? posterPath342 + tvshow.poster_path
              : "/posterplaceholder.svg"
          }
          alt={tvshow.name}
          sizes="15vw"
          fill
          className="object-fit"
        />
      </div>
    </Link>
  );
};

export default TvShowCard;
