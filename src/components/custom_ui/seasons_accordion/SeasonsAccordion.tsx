import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { tvShowSeason } from "@/types/content";

const SeasonsAccordion = ({ seasons }: { seasons: Array<tvShowSeason> }) => {
  return (
    <Accordion type="single" collapsible className="w-full pr-1 text-3xl">
      {seasons
        .filter((season) => season.name !== "Specials")
        .map((season, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="pr-6 cursor-pointer">
              <span className="text-xl">{season.name}</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col justify-between gap-4 text-[1.2em]">
                <div className="flex flex-col text-[0.9em] italic">
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
                <button className="font-semibold w-fit underline cursor-pointer">
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
