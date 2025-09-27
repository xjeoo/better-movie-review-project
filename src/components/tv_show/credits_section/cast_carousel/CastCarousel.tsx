import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { posterPath342 } from "@/constants/movies";
import { TvShowCastMember } from "@/types/tvshows/tvshows";
import Image from "next/image";
import Link from "next/link";

const CastCarousel = ({ cast }: { cast: TvShowCastMember[] }) => {
  return (
    <Carousel className="w-full my-2 mx-auto" opts={{ dragFree: true }}>
      <CarouselContent>
        {cast.map((guy, index) => (
          <CarouselItem key={guy.id} className="basis-auto select-none">
            <Link href={`/person/${guy.id}`}>
              <div className="flex items-center overflow-hidden rounded-md border-1 border-gray-400 md:hover:opacity-90 ">
                <div className="relative w-[140px] md:w-[170px] aspect-square">
                  <Image
                    src={
                      guy.profile_path
                        ? posterPath342 + guy.profile_path
                        : "/posterplaceholder.svg"
                    }
                    alt={guy.name}
                    loading={index > 6 ? "lazy" : "eager"}
                    fill
                    className="rounded-xs object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1 px-2 md:px-0 items-center h-full md:w-[200px]">
                  <p className="mx-1.5 font-semibold text-center">{guy.name}</p>
                  <Separator orientation="horizontal" />

                  <div className="flex flex-col justify-between h-full gap-4">
                    <div className="flex flex-col items-center mx-1.5 text-[0.9rem] text-center">
                      {guy.roles.slice(0, 3).map((role, index) => (
                        <div key={index + guy.id} className="flex w-fit gap-0">
                          <span>{"- "}</span>
                          <span className="whitespace-nowrap">
                            {role.character}
                          </span>
                          <span>{" -"}</span>
                        </div>
                      ))}
                    </div>
                    <span className="mx-auto mt-auto">
                      {guy.total_episode_count} episodes
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CastCarousel;
