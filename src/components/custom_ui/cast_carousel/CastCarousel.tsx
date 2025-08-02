import { MovieCastMember } from "@/types/movies/movies";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import CastCard from "./CastCard";

const CastCarousel = ({ info }: { info: Array<MovieCastMember> }) => {
  return (
    <div className="relative">
      <div className="absolute -left-1 w-[5%] h-full bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute -right-1 w-[5%] h-full bg-gradient-to-l from-black to-transparent z-10" />

      <Carousel opts={{ dragFree: true }}>
        <CarouselContent>
          {info.map((dude: MovieCastMember, index: number) => (
            <CarouselItem
              className="!justify-center !items-center basis-auto "
              key={index}
            >
              <CastCard info={dude} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden xl:flex bg-black cursor-pointer" />
        <CarouselNext className="hidden xl:flex bg-black cursor-pointer" />
      </Carousel>
    </div>
  );
};

export default CastCarousel;
