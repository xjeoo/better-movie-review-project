import { posterPath500 } from "@/constants/movies";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RecommendationCard = ({ info, type }: { info: any; type: string }) => {
  return (
    <Link
      href={`/${type === "movie" ? "movie" : "tv"}/${info.id}`}
      className="group relative flex flex-col rounded-xl overflow-hidden select-none"
    >
      <Image
        src={posterPath500 + info.poster_path}
        alt={info.title || info.name}
        width={250}
        height={375}
        loading="lazy"
      />
      <div className=" absolute opacity-0 group-hover:opacity-15 w-full h-full bg-black transition-opacity"></div>
    </Link>
  );
};

export default RecommendationCard;
