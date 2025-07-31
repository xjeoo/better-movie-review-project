"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { tvShowSeason } from "@/types/content";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SeasonsAccordion = ({
  seasons,
  showId,
}: {
  seasons: Array<tvShowSeason>;
  showId: string;
}) => {
  const router = useRouter();
  const [seasonNumber, setSeasonNumber] = useState<number | null>(null);

  useEffect(() => {
    if (seasonNumber) router.push(`/season/${showId}?number=${seasonNumber}`);
  }, [seasonNumber]);

  return (
    <Accordion type="single" collapsible className="w-full pr-1 text-3xl ">
      {seasons
        .filter((season) => season.name !== "Specials")
        .map((season, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="pr-6 cursor-pointer">
              <span className="text-xl">{season.name}</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col justify-between gap-4 text-[1.2em]">
                <div className="flex flex-col text-[0.9em] italic text-neutral-300">
                  {season.air_date && <span>Aired on: {season.air_date}</span>}
                  {season.episode_count && (
                    <span>{`${season.episode_count} episodes`}</span>
                  )}
                </div>
                <div>
                  {season.overview ? (
                    <p className="">{season.overview}</p>
                  ) : (
                    <p className="">No overview available</p>
                  )}
                </div>
                <button
                  className="font-semibold w-fit underline cursor-pointer"
                  onClick={() => {
                    setSeasonNumber(parseInt(season.season_number));
                  }}
                >
                  See more details
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
    </Accordion>
  );
};

export default SeasonsAccordion;
