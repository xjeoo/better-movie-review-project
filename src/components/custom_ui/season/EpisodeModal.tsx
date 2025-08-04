import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { posterPath500 } from "@/constants/movies";
import { Episode } from "@/types/tvshows/season";
import { Calendar, Clapperboard, Clock, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const EpisodeModal = ({
  episode,
  setSelectedEpisode,
}: {
  episode: Episode;
  setSelectedEpisode: (state: number | null) => void;
}) => {
  console.log(episode);
  return (
    <>
      <div
        className="fixed w-screen h-screen -mt-3 bg-black/50 z-500"
        onClick={() => setSelectedEpisode(null)}
      />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[80%]  pt-6 pb-3 mt-[80px] md:mt-[150px] mx-auto border-1 bg-black/80 backdrop-blur-xs border-neutral-500 rounded-md z-1000">
        <button
          className="absolute top-1 right-3 cursor-pointer"
          onClick={() => setSelectedEpisode(null)}
        >
          <X size={16} />
        </button>
        <div className="flex h-full">
          <div className="flex flex-col h-full min-h-[300px] justify-between flex-3/5 pl-4 pr-2 pb-5">
            <div className="mb-6">
              <h3 className="text-3xl font-semibold text-center">
                {episode.name}
              </h3>
              <div className="flex justify-center gap-2">
                <span className="flex gap-1 items-center">
                  <Calendar />
                  {episode.air_date}
                </span>
                <span className="flex gap-1 items-center">
                  <Clock />
                  {episode.runtime}m
                </span>
              </div>
            </div>
            <div>
              <h4 className="text-2xl">Description</h4>
              <p>
                {episode.overview
                  ? episode.overview
                  : "No description available"}
              </p>
            </div>
            {episode.crew.length > 0 && (
              <div className="flex flex-col gap-2 mt-2">
                <h4 className="text-2xl">
                  <span className="flex gap-1 items-center">
                    <Clapperboard />
                    Crew
                  </span>
                </h4>
                <ScrollArea className="h-[130px] w-full">
                  <div className="flex gap-2 flex-wrap basis-full">
                    {episode.crew.map((guy, index) => (
                      <Link
                        key={index}
                        href={`/person/${guy.id}`}
                        className="flex gap-2 items-center border-1 border-neutral-500 h-fit rounded-md pr-2"
                      >
                        <div className="relative h-[70px] w-[70px] ">
                          <Image
                            src={
                              guy.profile_path
                                ? posterPath500 + guy.profile_path
                                : "/posterplaceholder.svg"
                            }
                            alt={guy.name}
                            sizes="15vw"
                            fill
                            className="object-cover rounded-md "
                          />
                        </div>
                        <div>
                          <span className="text-center font-semibold">
                            {guy.name}
                          </span>
                          <Separator orientation="horizontal" />
                          <span className="text-center">{guy.job}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
          {episode.still_path && (
            <div className="hidden md:inline-block relative w-full flex-2/5">
              <div className="absolute h-full w-1/3 bg-gradient-to-r from-black to-transparent z-20 -ml-1" />
              <div className="absolute h-1/6 w-full bg-gradient-to-b from-black to-transparent z-20 -mt-1" />
              <div className="absolute h-1/6 w-full bottom-0 bg-gradient-to-t from-black to-transparent z-20 -mb-1" />
              <div className="absolute h-full w-1/6 right-0 bottom-0 bg-gradient-to-l from-black to-transparent z-20 " />

              <Image
                src={posterPath500 + episode.still_path}
                alt="backdrop"
                sizes="50vw"
                fill
                className="object-cover h-full"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EpisodeModal;
