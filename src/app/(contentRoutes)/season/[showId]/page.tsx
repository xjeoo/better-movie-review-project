"use client";

import EpisodeCard from "@/components/custom_ui/season/EpisodeCard";
import EpisodeModal from "@/components/custom_ui/season/EpisodeModal";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { posterPath500 } from "@/constants/movies";
import {
  getSeasonInfoForTvShow,
  getTvShowInfoForSeasonsPage,
} from "@/lib/tv/tvshows_client";
import { cn } from "@/lib/utils";
import { tvShowSeason } from "@/types/content";
import { Season } from "@/types/tvshows/season";
import { LoaderCircle, Popcorn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SeasonPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const showId = params.showId?.toString();
  const seasonNumber = parseInt(searchParams.get("number")!);
  const [data, setData] = useState<Season | null>(null);
  const [showInfo, setShowInfo] = useState<{
    name: string;
    seasons: Array<tvShowSeason>;
    backdrop_path: string;
  } | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const [drawerClosed, setDrawerClosed] = useState(true);

  const toggleDrawer = () => {
    setDrawerClosed((prev) => !prev);
  };

  useEffect(() => {
    if (!showId || !seasonNumber) return;
    getTvShowInfoForSeasonsPage(showId)
      .then((info) => setShowInfo(info))
      .catch((err) => console.log(err));
    if (seasonNumber) {
      getSeasonInfoForTvShow(showId, seasonNumber)
        .then((data) => {
          setData(data);
        })
        .catch((err) => console.log(err));
    }
  }, [searchParams]);

  // useEffect(() => {
  //   if (!modalVisible) {
  //     setSelectedEpisode(null);
  //     document.body.style.overflow = "auto";
  //   } else {
  //     document.body.style.overflow = "hidden";
  //   }
  // }, [modalVisible]);

  if (!data)
    return (
      <div className="w-screen h-screen flex justify-center mt-[200px]">
        <LoaderCircle className="animate-spin" size={55} />
      </div>
    );

  return (
    // pe tel copiez pagina asta https://arkhamcity.fandom.com/wiki/The_Season_of_Infamy
    <>
      {selectedEpisode && (
        <EpisodeModal
          episode={
            data?.episodes.filter((item) => item.id === selectedEpisode)[0]
          }
          setSelectedEpisode={setSelectedEpisode}
        />
      )}
      <main className="w-full gap-4 md:pr-6 bg-gray-900/70 ">
        <div className="flex flex-col min-h-[350px] md:flex-row gap-4 h-full  ">
          <div className="flex flex-col items-center gap-4 w-auto pt-5 md:pt-7 px-4 md:bg-gray-950/70 py-2 ">
            <Link href={`/tv/${showId}`} className="relative">
              <div className="absolute top-0 left-0 w-full h-full  opacity-0 hover:opacity-15 transition-opacity z-10"></div>

              <Image
                src={
                  data.poster_path
                    ? posterPath500 + data.poster_path
                    : "/posterplaceholder.svg"
                }
                alt="poster"
                width={200}
                height={300}
                loading="eager"
                className="rounded-md w-full max-w-[250px]"
              />
            </Link>

            <div
              className={cn(
                "fixed left-0 bottom-0 md:static  gap-2 w-dvw border-t-1  md:border-0 md:w-fit bg-gray-900 md:bg-transparent z-100 md:translate-y-0 ",
                drawerClosed
                  ? "translate-y-[70%] border-t-blue-500 "
                  : "border-t-0"
              )}
            >
              <div className="flex justify-between w-[90%] mx-auto md:w-auto md:block">
                <h4 className="text-2xl py-1.5">Other seasons</h4>
                <button onClick={toggleDrawer} className="md:hidden">
                  {drawerClosed ? "Open" : "Close"}
                </button>
              </div>
              {showInfo &&
              showInfo.seasons.filter(
                (item) =>
                  item.name.toLowerCase() !== "specials" &&
                  item.name !== data?.name
              ).length! > 1 ? (
                <ScrollArea
                  className={cn(
                    "whitespace-nowrap w-dvw px-4 pb-2 pt-3   md:px-0 md:w-[200px] bg-gray-800 md:bg-transparent md:whitespace-normal md:h-80 md:translate-y-0"
                  )}
                >
                  <div className="relative flex md:flex-col gap-2 z-100 ">
                    {showInfo?.seasons
                      .filter(
                        (item) =>
                          item.name.toLowerCase() !== "specials" &&
                          item.name !== data?.name
                      )
                      .map((season) => (
                        <Link
                          key={season.id}
                          href={`/season/${showId}?number=${season.season_number}`}
                          className="relative flex gap-1.5 items-center text-nowrap w-fit mb-1  text-[1.1em] rounded-xs overflow-hidden"
                        >
                          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-30 transition-opacity z-100 "></div>
                          <div className="relative h-[80px] aspect-3/4">
                            <Image
                              src={
                                season.poster_path
                                  ? posterPath500 + season.poster_path
                                  : "/posterplaceholder.svg"
                              }
                              alt="poster"
                              sizes="10vw"
                              fill
                              className="object-contain rounded-md"
                            />
                          </div>
                          <span className="text-ellipsis w-[90px] overflow-hidden">
                            {season.name}
                          </span>
                        </Link>
                      ))}
                  </div>
                  <ScrollBar orientation="horizontal" className="md:hidden" />
                </ScrollArea>
              ) : (
                <p className="w-fit py-12 pl-5">No other seasons</p>
              )}
            </div>
          </div>

          <div className="flex flex-col pt-6 gap-5 w-full pl-3 pb-10">
            <div>
              <h1 className="text-4xl font-semibold">{data.name}</h1>
              {data.air_date && (
                <span className="text-neutral-300">
                  Aired on: {data.air_date}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-2xl mt-[50px] ">Overview</h2>
              <p>{data.overview ? data.overview : "No overview available"}</p>
            </div>
            <div className="w-full">
              <h2 className="flex items-center text-2xl mb-4">
                <Popcorn className="mr-1" />
                {data.episodes.length} Episodes
              </h2>
              <ScrollArea className="flex h-80 mx-auto md:mx-0 w-fit p-0 sm:p-0.5 rounded-md">
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 w-full">
                  {data.episodes.map((episode) => (
                    <EpisodeCard
                      key={episode.id}
                      episode={episode}
                      setSelectedEpisode={setSelectedEpisode}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SeasonPage;
