import { posterPath154, profilePath185 } from "@/constants/movies";
import { SearchResult } from "@/types/search/search";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SearchItem = ({ item }: { item: SearchResult }) => {
  const type = item.media_type;

  if (type === "movie") {
    return (
      <Link
        href={`/${item.media_type}/${item.id}`}
        className="relative flex justify-between px-2 mb-2 border-1 border-neutral-600 rounded-md py-1"
      >
        <div className="absolute w-full h-full bg-black opacity-0 hover:opacity-10 z-10" />
        <div className="flex items-center gap-2">
          <Image
            src={
              item.poster_path
                ? posterPath154 + item.poster_path
                : "/posterplaceholder.svg"
            }
            alt="poster"
            width={50}
            height={75}
            className="rounded-md"
          />
          <div className="flex flex-col items-start w-full">
            <span className="text-center">{item.title}</span>
            <span className="text-center text-neutral-300">Movie</span>
          </div>
        </div>
      </Link>
    );
  }

  if (type === "tv") {
    return (
      <Link
        href={`/${item.media_type}/${item.id}`}
        className="relative flex justify-between px-2 mb-2 border-1 border-neutral-600 rounded-md py-1"
      >
        <div className="absolute w-full h-full bg-black opacity-0 hover:opacity-10 z-10" />

        <div className="flex items-center gap-2">
          <Image
            src={
              item.poster_path
                ? posterPath154 + item.poster_path
                : "/posterplaceholder.svg"
            }
            alt="poster"
            width={50}
            height={75}
            className="rounded-md"
          />
          <div className="flex flex-col items-start w-full ">
            <span className="text-center">{item.name}</span>
            <span className="text-center text-neutral-300">TV Show</span>
          </div>
        </div>
      </Link>
    );
  }

  if (type === "person") {
    return (
      <Link
        href={`/${item.media_type}/${item.id}`}
        className="relative flex justify-between px-2 mb-2 border-1 border-neutral-600 rounded-md py-1"
      >
        <div className="absolute w-full h-full bg-black opacity-0 hover:opacity-10 z-10" />
        <div className="flex items-center gap-2">
          <Image
            src={
              item.profile_path
                ? profilePath185 + item.profile_path
                : "/defaultavatar.png"
            }
            alt="poster"
            width={50}
            height={70}
            className="rounded-xs"
          />
          <div className="flex flex-col w-full ">
            <span className="text-center">{item.name}</span>
            <span className="flex items-start text-neutral-300">
              {item.known_for_department}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return null;
};

export default SearchItem;
