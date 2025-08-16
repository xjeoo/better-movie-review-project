import { posterPath500 } from "@/constants/movies";
import { MovieData } from "@/types/movies/movies";
import { TvShowData } from "@/types/tvshows/tvshows";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RecommendationCard = ({
  info,
  type,
}: {
  info: TvShowData | MovieData;
  type: string;
}) => {
  return (
    <Link href={`/${type === "movie" ? "movie" : "tv"}/${info.id}`}>
      <div className="relative w-[170px] md:w-[240px] aspect-2/3 md:hover:opacity-90 rounded-xl overflow-hidden select-none">
        <Image
          src={posterPath500 + info.poster_path}
          //@ts-expect-error - name varies according to type
          alt={info.title || info.name}
          fill
          sizes="(max-width: 640px) 25vw, (max-width: 1200px) 20vw, 33vw"
          loading="lazy"
        />
      </div>
    </Link>
  );
};

export default RecommendationCard;
