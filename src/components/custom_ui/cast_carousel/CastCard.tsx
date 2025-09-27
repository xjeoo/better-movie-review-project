import { profilePath185 } from "@/constants/movies";
import { MovieCastMember } from "@/types/movies/movies";
import Image from "next/image";
import Link from "next/link";

const CastCard = ({ info }: { info: MovieCastMember }) => {
  return (
    <Link
      href={`/person/${info.id}`}
      className="group relative flex flex-col w-[180px] mx-auto border-1 border-neutral-400 rounded-xl select-none "
    >
      <div className="relative w-full aspect-square">
        <Image
          src={
            info.profile_path
              ? profilePath185 + info.profile_path
              : "/defaultavatar.png"
          }
          alt={info.name}
          fill
          sizes="180px"
          className="object-cover rounded-xl"
        />
        <div className=" absolute opacity-0 group-md:hover:opacity-15 w-full h-full bg-black transition-opacity"></div>
      </div>

      <div className="absolute text-center bottom-0 flex flex-col justify-center items-center w-full bg-neutral-700/60 rounded-b-xl">
        <span>{info.name}</span>
        <div className="flex w-fit gap-0 px-1.5 text-[0.9em]">
          <span>{"- "}</span>
          <span className="whitespace-nowrap">{info.character}</span>
          <span>{" -"}</span>
        </div>
      </div>
    </Link>
  );
};

export default CastCard;
