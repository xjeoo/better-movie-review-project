import { posterPath500 } from "@/constants/movies";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CrewCard = ({ info }: { info: any }) => {
  return (
    <Link
      href={`/crew/${info.id}`}
      className="relative flex flex-col w-[180px] mx-auto border-1 border-neutral-400 rounded-xl select-none"
    >
      <div className="group relative w-full aspect-square">
        <Image
          src={
            info.profile_path
              ? posterPath500 + info.profile_path
              : "/defaultavatar.png"
          }
          alt={info.name}
          fill
          sizes="180px"
          className="object-cover rounded-xl"
        />
        <div className=" absolute opacity-0 group-hover:opacity-15 w-full h-full bg-black transition-opacity"></div>
      </div>

      <div className="absolute text-center bottom-0 flex flex-col justify-center items-center w-full bg-neutral-700/60 rounded-b-xl">
        <span>{info.name}</span>
        <span>-{info.job}-</span>
      </div>
    </Link>
  );
};

export default CrewCard;
