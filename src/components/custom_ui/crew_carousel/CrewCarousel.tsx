// import Autoplay from "embla-carousel-autoplay";
import { MovieCrewMember } from "@/types/movies/movies";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import CrewCard from "./CrewCard";

const CrewCarousel = ({ info }: { info: Array<MovieCrewMember> }) => {
  return (
    <div className="relative">
      <div className="absolute -left-1 w-[5%] h-full bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute -right-1 w-[5%] h-full bg-gradient-to-l from-black to-transparent z-10" />
      <Carousel opts={{ dragFree: true }}>
        <CarouselContent>
          {info.map((dude: MovieCrewMember, index: number) => (
            <CarouselItem
              className="!justify-center !items-center basis-auto  "
              key={index}
            >
              <CrewCard info={dude} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden xl:flex bg-black cursor-pointer z-20" />
        <CarouselNext className="hidden xl:flex bg-black cursor-pointer z-20" />
      </Carousel>
    </div>
  );
};

export default CrewCarousel;
