import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { posterPath342 } from "@/constants/movies";
import { TvShowCrewMember } from "@/types/tvshows/tvshows";
import Image from "next/image";
import Link from "next/link";

const CrewCarousel = ({ crew }: { crew: TvShowCrewMember[] }) => {
  return (
    <Carousel className="w-full my-2 mx-auto" opts={{ dragFree: true }}>
      <CarouselContent>
        {crew.map((guy, index) => (
          <CarouselItem key={guy.id + index} className="basis-auto select-none">
            <Link href={`/person/${guy.id}`}>
              <div className="flex items-center overflow-hidden rounded-md border-1 border-gray-400 md:hover:opacity-90 ">
                <div className="relative w-[140px] md:w-[170px] aspect-square">
                  <Image
                    src={
                      guy.profile_path
                        ? posterPath342 + guy.profile_path
                        : "/defaultavatar.png"
                    }
                    alt="profile photo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1 items-center h-full md:w-[200px] px-2 md:px-0">
                  <p>{guy.name}</p>
                  <Separator />
                  {guy.jobs.slice(0, 3).map((job, index) => (
                    <div key={index + guy.id} className="flex w-fit gap-0">
                      <span>{"- "}</span>
                      <span className="whitespace-nowrap">{job.job}</span>
                      <span>{" -"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CrewCarousel;
