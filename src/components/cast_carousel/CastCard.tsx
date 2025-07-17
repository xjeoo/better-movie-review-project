import { posterPath500 } from "@/constants/movies";
import Image from "next/image";
import Link from "next/link";

const CastCard = ({ info }: { info: any }) => {
  return (
    <Link
      href={`/actor/${info.id}`}
      className="relative flex flex-col w-[180px] mx-auto border-1 border-neutral-400 rounded-xl select-none "
    >
      <div className="relative w-full aspect-square">
        <Image
          src={
            info.profile_path
              ? posterPath500 + info.profile_path
              : "/defaultavatar.png"
          }
          alt={info.name}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      <div className="absolute text-center bottom-0 flex flex-col justify-center items-center w-full bg-neutral-700/60 rounded-b-xl">
        <span>{info.name}</span>
        <span>-{info.character}-</span>
      </div>
    </Link>
  );
};

export default CastCard;
