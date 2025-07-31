import { posterPath500 } from "@/constants/movies";
import { Episode } from "@/types/tvshows/season";
import Image from "next/image";

const EpisodeCard = ({
  episode,
  setSelectedEpisode,
}: {
  episode: Episode;
  setSelectedEpisode?: (episode: any) => void;
}) => {
  return (
    <button
      className="relative flex flex-col border-1 border-white rounded-md overflow-hidden p-0.5 cursor-pointer"
      onClick={() => {
        setSelectedEpisode && setSelectedEpisode(episode.id);
      }}
    >
      <div className="relative aspect-video w-[130px]">
        <Image
          src={
            episode.still_path
              ? posterPath500 + episode.still_path
              : "/posterplaceholder.svg"
          }
          alt={`episode ${episode.episode_number}`}
          sizes="20vw"
          priority
          fill
          className="rounded-xs object-cover"
        />
      </div>
      <p className="w-[130px] text-nowrap text-ellipsis overflow-hidden">
        {episode.episode_number}-{episode.name}
      </p>
      <div className="absolute w-full h-full flex justify-center items-center bg-black opacity-0 hover:opacity-30 transition-opacity">
        <div className="flex flex-col">
          {/* <span>{episode.episode_number}</span> */}
        </div>
      </div>
    </button>
  );
};

export default EpisodeCard;
